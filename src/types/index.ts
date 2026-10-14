export type CandidateCategory = "UR" | "OBC-NCL" | "SC" | "ST" | "EWS";
export type Gender = "Male" | "Female" | "Transgender";
export type EducationLevel = "10th" | "12th" | "Diploma" | "Graduate" | "Post Graduate" | "Engineering";

export interface EducationRecord {
  level: EducationLevel;
  degreeName: string;
  boardOrUniversity: string;
  institutionName: string;
  passingYear: number;
  rollNumber: string;
  percentageOrCgpa: string;
  marksObtained?: string;
  maxMarks?: string;
}

export interface StoredDocument {
  id: string;
  category: "identity" | "education" | "application" | "reservation";
  name: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: "verified" | "uploaded" | "pending" | "expiring";
  specRequirement: string;
  dataUrl?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string; // YYYY-MM-DD
  gender: Gender;
  aadhaarNumber: string; // formatted or masked
  mobile: string;
  email: string;
  maritalStatus: "Single" | "Married" | "Other";
  nationality: string;
  religion: string;
  category: CandidateCategory;
  categoryCertificateNo?: string;
  categoryIssueDate?: string;
  isPwD: boolean;
  pwDDetails?: string;
  isExServiceman: boolean;
  domicileState: string;
  domicileCertificateNo?: string;
  permanentAddress: {
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  correspondenceAddress: {
    sameAsPermanent: boolean;
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  education: EducationRecord[];
  documents: StoredDocument[];
  profileCompletionPercentage: number;
}

export interface JobVacancy {
  category: CandidateCategory;
  count: number;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  agency: "SSC" | "RRB" | "IBPS" | "UPSC" | "State PSC" | "Police" | "Defence" | "Other";
  notificationNumber: string;
  notificationDate: string;
  lastDate: string;
  examDateText: string;
  totalVacancies: number;
  vacanciesBreakdown: JobVacancy[];
  qualificationRequired: EducationLevel;
  qualificationDiscipline: string;
  minPercentageRequired?: number;
  minAge: number;
  maxAge: number;
  ageCutoffDate: string;
  location: string;
  payScale: string;
  applicationFee: {
    general: number;
    reserved: number;
    women: number;
  };
  selectionStages: string[];
  requiredDocsList: string[];
  description: string;
  isClosingSoon?: boolean;
  isSampleData: boolean;
}

export interface EligibilityCheckItem {
  criterion: string;
  met: boolean | "warning";
  candidateValue: string;
  requiredValue: string;
  note?: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  status: "eligible" | "attention_required" | "not_eligible";
  checks: EligibilityCheckItem[];
  remarks: string;
}

export interface ApplicationDraft {
  id: string;
  trackingNumber: string; // e.g. GA-2026-001245
  jobId: string;
  jobTitle: string;
  department: string;
  agency: string;
  candidateName: string;
  category: CandidateCategory;
  appliedDate: string;
  status: "draft" | "prepared" | "confirmed" | "submitted" | "scrutiny_passed";
  applicationFee: number;
  platformServiceFee: number; // 40
  totalPaid: number;
  paymentStatus: "unpaid" | "paid";
  paymentId?: string;
  paymentMethod?: string;
  attachedDocuments: {
    documentId: string;
    name: string;
    specStatus: "compliant" | "needs_attention";
  }[];
  formSnapshot: {
    personal: Partial<UserProfile>;
    education: EducationRecord[];
    categoryClaimed: string;
    declarationSigned: boolean;
  };
}

export interface PortalNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "job" | "application" | "system";
  read: boolean;
  link?: string;
}
