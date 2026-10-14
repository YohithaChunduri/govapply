import React, { useState } from "react";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  ShieldCheck,
  CheckCircle2,
  FileText,
  User,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { CandidateCategory, Gender } from "../types";

interface OnboardingPageProps {
  onNavigate: (path: string) => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onNavigate }) => {
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);

  // Step 1: Personal
  const [fullName, setFullName] = useState(user?.fullName || "Rajesh Kumar Sharma");
  const [fatherName, setFatherName] = useState(user?.fatherName || "Mahesh Chandra Sharma");
  const [motherName, setMotherName] = useState(user?.motherName || "Sunita Sharma");
  const [dob, setDob] = useState(user?.dob || "2001-08-14");
  const [gender, setGender] = useState<Gender>(user?.gender || "Male");
  const [aadhaarNumber, setAadhaarNumber] = useState(user?.aadhaarNumber || "•••• •••• 4819");
  const [stateName, setStateName] = useState(user?.permanentAddress.state || "Delhi");
  const [pincode, setPincode] = useState(user?.permanentAddress.pincode || "110085");

  // Step 2: Education
  const [degName, setDegName] = useState(user?.education[2]?.degreeName || "B.Tech - Information Technology");
  const [university, setUniversity] = useState(user?.education[2]?.boardOrUniversity || "GGSIPU Delhi");
  const [passingYear, setPassingYear] = useState(user?.education[2]?.passingYear || 2023);
  const [percentage, setPercentage] = useState(user?.education[2]?.percentageOrCgpa || "79.8%");

  // Step 3: Category
  const [category, setCategory] = useState<CandidateCategory>(user?.category || "OBC-NCL");
  const [certificateNo, setCertificateNo] = useState(user?.categoryCertificateNo || "OBC/DL/2024/9871");
  const [domicileState, setDomicileState] = useState(user?.domicileState || "Delhi (NCT)");

  // Completion calculation
  const completion = step === 1 ? 40 : step === 2 ? 60 : step === 3 ? 75 : step === 4 ? 85 : 95;

  const handleNext = () => {
    if (step === 1) {
      updateProfile({
        fullName,
        fatherName,
        motherName,
        dob,
        gender,
        aadhaarNumber,
        permanentAddress: {
          ...user?.permanentAddress,
          street: user?.permanentAddress.street || "H.No. 44, Sector 11, Rohini",
          city: user?.permanentAddress.city || "New Delhi",
          district: user?.permanentAddress.district || "North West Delhi",
          state: stateName,
          pincode,
        },
      });
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      updateProfile({
        category,
        categoryCertificateNo: certificateNo,
        domicileState,
      });
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    } else {
      onNavigate("/dashboard");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 text-left">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-md p-5 mb-6 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Initial Account Setup
            </span>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Build Your Government Job Dossier
            </h1>
            <p className="text-xs text-slate-600">
              Step {step} of 5 — Fill your information once. GovApply auto-checks eligibility for every exam.
            </p>
          </div>

          <div className="sm:text-right shrink-0">
            <span className="text-xs font-semibold text-slate-700">Dossier Completion:</span>
            <span className="text-base font-bold text-emerald-700 ml-1.5">{completion}%</span>
            <div className="w-36 bg-slate-200 rounded-full h-2 mt-1">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-5 gap-1 pt-2 border-t border-slate-100 text-center text-xs">
          {["Personal", "Education", "Category", "Documents", "Review"].map((label, idx) => (
            <div
              key={label}
              className={`py-1 rounded font-medium ${
                step === idx + 1
                  ? "bg-[#0B2546] text-white font-bold"
                  : step > idx + 1
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-400 bg-slate-50"
              }`}
            >
              <span className="text-[11px]">{idx + 1}. {label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Step Form Card */}
      <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs space-y-6">
        {/* STEP 1: PERSONAL DETAILS */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900">Step 1 — Personal & Identity Particulars</h2>
              <p className="text-xs text-slate-500">
                Enter names exactly as printed on your Class 10th Board Certificate to avoid exam center mismatch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Candidate Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <Input
                label="Father's Full Name"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                required
              />
              <Input
                label="Mother's Full Name"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                required
              />
              <Input
                label="Date of Birth (DOB)"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              <Select
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Transgender", label: "Transgender" },
                ]}
                required
              />
              <Input
                label="Aadhaar Number (12 Digits)"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                helperText="Stored with privacy masking"
                required
              />
              <Input
                label="Permanent State / UT"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                required
              />
              <Input
                label="Postal PIN Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 2: EDUCATION DETAILS */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900">Step 2 — Educational Qualifications</h2>
              <p className="text-xs text-slate-500">
                GovApply checks your degree and marks against minimum qualification cutoffs across SSC, UPSC and Banking notifications.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
              <span className="font-bold text-slate-800">Pre-Verified Secondary Records:</span>
              <p className="text-slate-600">
                • Class X: CBSE Board (2017) — 88.4% (Roll: 6189204)
              </p>
              <p className="text-slate-600">
                • Class XII: CBSE Board Non-Medical (2019) — 86.2% (Roll: 6891042)
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Highest Qualifying Degree (Graduation / Diploma)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Degree Title & Discipline"
                  value={degName}
                  onChange={(e) => setDegName(e.target.value)}
                  placeholder="e.g. Bachelor of Technology (IT)"
                  required
                />
                <Input
                  label="University / Recognized Board"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. University of Delhi"
                  required
                />
                <Input
                  label="Passing Year"
                  type="number"
                  value={passingYear.toString()}
                  onChange={(e) => setPassingYear(Number(e.target.value))}
                  required
                />
                <Input
                  label="Final Percentage or CGPA"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="e.g. 79.8%"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CATEGORY & ELIGIBILITY */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900">Step 3 — Category, Reservation & Domicile</h2>
              <p className="text-xs text-slate-500">
                Used to determine applicable age relaxations, fee concessions, and quota vacancy eligibility.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Candidate Social Category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CandidateCategory)}
                options={[
                  { value: "UR", label: "Unreserved (General)" },
                  { value: "OBC-NCL", label: "OBC Non-Creamy Layer (+3y Age Relaxation)" },
                  { value: "SC", label: "Scheduled Caste (+5y Age Relaxation, Fee Exempted)" },
                  { value: "ST", label: "Scheduled Tribe (+5y Age Relaxation, Fee Exempted)" },
                  { value: "EWS", label: "Economically Weaker Section" },
                ]}
                required
              />

              <Input
                label="Domicile State / Territory"
                value={domicileState}
                onChange={(e) => setDomicileState(e.target.value)}
                helperText="Required for State PSC & regional police reservation"
                required
              />

              {category !== "UR" && (
                <>
                  <Input
                    label="Caste / EWS Certificate Number"
                    value={certificateNo}
                    onChange={(e) => setCertificateNo(e.target.value)}
                    placeholder="e.g. OBC/DL/2024/9871"
                    required
                  />
                  <Input
                    label="Certificate Date of Issue"
                    type="date"
                    defaultValue="2024-05-15"
                    helperText="Central format issued by Tehsildar / DM"
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: UPLOAD DOCUMENTS */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900">Step 4 — Upload Core Document Files</h2>
              <p className="text-xs text-slate-500">
                Upload once to your secure vault. GovApply automatically reformats and attaches them when you prepare an application.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 border border-emerald-300 bg-emerald-50/50 rounded flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Passport Photograph</p>
                  <p className="text-[11px] text-slate-500">38 KB • 3.5cm x 4.5cm • Verified</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </div>

              <div className="p-3 border border-emerald-300 bg-emerald-50/50 rounded flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Digital Signature</p>
                  <p className="text-[11px] text-slate-500">14 KB • Black Ink • Verified</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </div>

              <div className="p-3 border border-emerald-300 bg-emerald-50/50 rounded flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Class X DOB Certificate</p>
                  <p className="text-[11px] text-slate-500">680 KB PDF • Verified</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </div>

              <div className="p-3 border border-emerald-300 bg-emerald-50/50 rounded flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Graduation Degree</p>
                  <p className="text-[11px] text-slate-500">1.1 MB PDF • Verified</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded text-xs text-blue-900">
              <p className="font-semibold">✓ Ready for Evaluation</p>
              <p className="text-[11px] text-slate-600">
                Sample documents are already configured and validated for your demo account. You can add or replace documents anytime from the Document Vault.
              </p>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW PROFILE */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900">Step 5 — Review Profile Summary</h2>
              <p className="text-xs text-slate-500">
                Your dossier is now established. You can now discover matching jobs and auto-fill applications.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Candidate:</span>
                <span className="font-bold text-slate-900">{fullName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Date of Birth & Age:</span>
                <span className="font-medium text-slate-900">{dob} (24y 7m)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Education:</span>
                <span className="font-medium text-slate-900">{degName} ({percentage})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Category Claimed:</span>
                <span className="font-bold text-slate-900">{category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Vault Documents:</span>
                <span className="font-semibold text-emerald-700">4 / 4 Core Documents Ready</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Profile Setup Completed!</strong> You are eligible for 6+ open public recruitment notifications.
              </span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          {step > 1 ? (
            <Button
              variant="secondary"
              size="md"
              type="button"
              onClick={() => setStep(step - 1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous Step
            </Button>
          ) : (
            <div />
          )}

          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={handleNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {step === 5 ? "Go to Candidate Dashboard" : "Save & Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};
