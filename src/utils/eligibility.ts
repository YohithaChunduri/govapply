import { Job, UserProfile, EligibilityResult, EligibilityCheckItem } from "../types";

export function calculateAge(dobString: string, cutoffDateString: string): { years: number; months: number } {
  const dob = new Date(dobString);
  let cutoff: Date;
  if (cutoffDateString.includes("-") && cutoffDateString.split("-")[0].length === 2) {
    const parts = cutoffDateString.split("-");
    cutoff = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  } else {
    cutoff = new Date(cutoffDateString);
  }

  if (isNaN(cutoff.getTime())) {
    cutoff = new Date("2026-08-01");
  }

  let years = cutoff.getFullYear() - dob.getFullYear();
  let months = cutoff.getMonth() - dob.getMonth();
  if (cutoff.getDate() < dob.getDate()) {
    months--;
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months };
}

export function checkJobEligibility(user: UserProfile | null, job: Job): EligibilityResult {
  if (!user) {
    return {
      isEligible: false,
      status: "attention_required",
      checks: [
        {
          criterion: "Candidate Profile",
          met: "warning",
          candidateValue: "Not Signed In",
          requiredValue: "Active Profile Required",
          note: "Please sign in to run automatic eligibility assessment.",
        },
      ],
      remarks: "Sign in to verify your eligibility against this notification.",
    };
  }

  const checks: EligibilityCheckItem[] = [];

  // 1. Education Check
  const educationHierarchy: Record<string, number> = {
    "10th": 1,
    "12th": 2,
    "Diploma": 2,
    "Graduate": 3,
    "Engineering": 3,
    "Post Graduate": 4,
  };

  const highestCandidateLevel = user.education.reduce((max, edu) => {
    const rank = educationHierarchy[edu.level] || 1;
    return rank > max ? rank : max;
  }, 0);

  const requiredRank = educationHierarchy[job.qualificationRequired] || 2;
  const eduMet = highestCandidateLevel >= requiredRank;

  const candidateDegree = user.education.find((e) => (educationHierarchy[e.level] || 0) >= requiredRank);

  checks.push({
    criterion: "Educational Qualification",
    met: eduMet,
    candidateValue: candidateDegree ? `${candidateDegree.level} (${candidateDegree.degreeName})` : "Undergraduate",
    requiredValue: `${job.qualificationRequired} (${job.qualificationDiscipline})`,
    note: eduMet ? "Candidate meets minimum required academic criteria." : "Higher educational qualification required.",
  });

  // 2. Age Check
  const { years: candidateAgeYears, months: candidateAgeMonths } = calculateAge(user.dob, job.ageCutoffDate);
  let ageRelaxation = 0;
  if (user.category === "OBC-NCL") ageRelaxation = 3;
  if (user.category === "SC" || user.category === "ST") ageRelaxation = 5;
  if (user.isPwD) ageRelaxation += 10;

  const effectiveMaxAge = job.maxAge + ageRelaxation;
  const ageMet = candidateAgeYears >= job.minAge && candidateAgeYears <= effectiveMaxAge;

  checks.push({
    criterion: "Age Limit & Relaxation",
    met: ageMet,
    candidateValue: `${candidateAgeYears} Years ${candidateAgeMonths} Months`,
    requiredValue: `${job.minAge} to ${job.maxAge} Years (${effectiveMaxAge} Years with ${user.category} relaxation of +${ageRelaxation}y)`,
    note: ageMet
      ? `Within permissible age limit as of cutoff date ${job.ageCutoffDate}.`
      : candidateAgeYears > effectiveMaxAge
      ? `Exceeds upper age limit even after ${user.category} relaxation.`
      : `Below minimum age limit of ${job.minAge} years.`,
  });

  // 3. Document Readiness Check
  const hasPhoto = user.documents.some((d) => d.id === "doc-photo" && d.status === "verified");
  const hasSignature = user.documents.some((d) => d.id === "doc-signature" && d.status === "verified");
  const has10th = user.documents.some((d) => d.id === "doc-10th" && d.status === "verified");
  const hasDegree = user.documents.some((d) => d.id === "doc-degree" && d.status === "verified");

  const coreDocsCount = [hasPhoto, hasSignature, has10th, hasDegree].filter(Boolean).length;
  const docsMet = coreDocsCount >= 3;

  checks.push({
    criterion: "Mandatory Application Documents",
    met: docsMet,
    candidateValue: `${coreDocsCount} / 4 Core Documents Verified`,
    requiredValue: "Photograph, Signature, Class X (DOB), Qualifying Degree",
    note: docsMet ? "All essential application files are uploaded and formatted." : "Missing required document files in vault.",
  });

  // 4. Category & Domicile Check
  const hasCategoryCert = user.documents.find((d) => d.category === "reservation");
  let categoryStatus: boolean | "warning" = true;
  let categoryNote = `Eligible under ${user.category} reservation quota.`;

  if (user.category !== "UR") {
    if (!hasCategoryCert) {
      categoryStatus = "warning";
      categoryNote = `Certificate for ${user.category} is missing in document vault.`;
    } else if (hasCategoryCert.status === "expiring") {
      categoryStatus = "warning";
      categoryNote = "Certificate issued in previous financial year. Renewal advised for upcoming verification.";
    }
  }

  checks.push({
    criterion: "Category & Reservation Certificate",
    met: categoryStatus,
    candidateValue: user.category + (user.categoryCertificateNo ? ` (Cert: ${user.categoryCertificateNo})` : ""),
    requiredValue: user.category === "UR" ? "Unreserved (No Certificate Required)" : `Valid ${user.category} Certificate`,
    note: categoryNote,
  });

  const isEligible = eduMet && ageMet && docsMet;
  const hasWarning = checks.some((c) => c.met === "warning");

  let status: "eligible" | "attention_required" | "not_eligible" = "eligible";
  if (!isEligible) {
    status = "not_eligible";
  } else if (hasWarning) {
    status = "attention_required";
  }

  let remarks = "You meet all mandatory educational, age, and document eligibility parameters.";
  if (status === "attention_required") {
    remarks = "You meet essential criteria, but please review warning items before submitting your application.";
  } else if (status === "not_eligible") {
    remarks = "You do not meet one or more mandatory eligibility conditions for this notification.";
  }

  return {
    isEligible,
    status,
    checks,
    remarks,
  };
}
