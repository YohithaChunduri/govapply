import React, { useState } from "react";
import { useJobs } from "../context/JobsContext";
import { useAuth } from "../context/AuthContext";
import { useApplications } from "../context/ApplicationContext";
import { ApplicationStepper } from "../components/application/ApplicationStepper";
import { FormReviewTable } from "../components/application/FormReviewTable";
import { PaymentModal } from "../components/application/PaymentModal";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { ArrowLeft, ArrowRight, Save, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { CandidateCategory, Gender } from "../types";

interface ApplicationBuilderPageProps {
  jobId: string;
  onNavigate: (path: string) => void;
}

export const ApplicationBuilderPage: React.FC<ApplicationBuilderPageProps> = ({
  jobId,
  onNavigate,
}) => {
  const { getJobById } = useJobs();
  const { user, updateProfile } = useAuth();
  const { createDraftForJob, confirmAndSubmitApplication } = useApplications();

  const job = getJobById(jobId);

  // Stepper State (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);
  const [saveDraftToast, setSaveDraftToast] = useState(false);

  // Pre-filled & Editable Form State (Step 1)
  const [fullName, setFullName] = useState(user?.fullName || "Rajesh Kumar Sharma");
  const [fatherName, setFatherName] = useState(user?.fatherName || "Mahesh Chandra Sharma");
  const [motherName, setMotherName] = useState(user?.motherName || "Sunita Sharma");
  const [dob, setDob] = useState(user?.dob || "2001-08-14");
  const [gender, setGender] = useState<Gender>(user?.gender || "Male");
  const [mobile, setMobile] = useState(user?.mobile || "+91 98765 43210");
  const [email, setEmail] = useState(user?.email || "rajesh.sharma@example.com");

  // Step 2: Education
  const [degTitle, setDegTitle] = useState(user?.education[2]?.degreeName || "B.Tech Information Technology");
  const [university, setUniversity] = useState(user?.education[2]?.boardOrUniversity || "GGSIPU Delhi");
  const [passingYear, setPassingYear] = useState(user?.education[2]?.passingYear || 2023);
  const [rollNumber, setRollNumber] = useState(user?.education[2]?.rollNumber || "04914803119");
  const [percentage, setPercentage] = useState(user?.education[2]?.percentageOrCgpa || "79.8%");

  // Step 3: Category
  const [category, setCategory] = useState<CandidateCategory>(user?.category || "OBC-NCL");
  const [certNo, setCertNo] = useState(user?.categoryCertificateNo || "OBC/DL/2024/9871");
  const [domicile, setDomicile] = useState(user?.domicileState || "Delhi (NCT)");

  // Step 5: Declaration & Payment Modal
  const [declarationSigned, setDeclarationSigned] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeDraft, setActiveDraft] = useState(() => (job ? createDraftForJob(job) : null));

  if (!job || !user) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Please Sign In to Prepare Application</h2>
        <p className="text-xs text-slate-500">
          GovApply automatically compiles your application draft using your stored credentials.
        </p>
        <Button variant="primary" size="sm" onClick={() => onNavigate("/login")}>
          Go to Sign In
        </Button>
      </div>
    );
  }

  const handleSaveDraft = () => {
    // Persist edits to user profile
    updateProfile({
      fullName,
      fatherName,
      motherName,
      dob,
      gender,
      mobile,
      email,
      category,
      categoryCertificateNo: certNo,
      domicileState: domicile,
    });
    setSaveDraftToast(true);
    setTimeout(() => setSaveDraftToast(false), 3000);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      updateProfile({ fullName, fatherName, motherName, dob, gender, mobile, email });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      updateProfile({ category, categoryCertificateNo: certNo, domicileState: domicile });
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep === 5) {
      if (!declarationSigned) {
        alert("Please confirm the statutory applicant declaration checkbox before proceeding to payment.");
        return;
      }
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = (paymentMethod: string) => {
    if (activeDraft) {
      confirmAndSubmitApplication(activeDraft.id, paymentMethod);
      setShowPaymentModal(false);
      onNavigate(`/applications/${activeDraft.id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 text-left space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <button
            type="button"
            onClick={() => onNavigate(`/jobs/${job.id}`)}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Notification Details
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Prepare Application Draft: {job.title}
          </h1>
          <p className="text-xs text-slate-600 font-mono">
            Assisted Draft Reference: {activeDraft?.trackingNumber} • {job.department}
          </p>
        </div>

        {/* Save Draft Trigger */}
        <div className="flex items-center gap-2">
          {saveDraftToast && (
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Draft Saved
            </span>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSaveDraft}
            leftIcon={<Save className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Save Draft
          </Button>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <ApplicationStepper currentStep={currentStep} onStepClick={(s) => setCurrentStep(s)} />

      {/* STEP CONTENT CONTAINER */}
      <div className="space-y-6">
        {/* STEP 1: PERSONAL PARTICULARS */}
        {currentStep === 1 && (
          <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 1 — Candidate Particulars</h2>
                <p className="text-xs text-slate-500">
                  Pre-filled from your stored dossier. You can edit any field if needed.
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                ✓ Auto-Filled from Dossier
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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
                label="Date of Birth"
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
                label="Aadhaar ID (Masked)"
                value={user.aadhaarNumber}
                disabled
                helperText="Government identity proof verified"
              />
              <Input
                label="Mobile Contact (+91)"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <Input
                label="Email Contact"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 2: EDUCATIONAL QUALIFICATIONS */}
        {currentStep === 2 && (
          <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 2 — Educational Qualifications</h2>
                <p className="text-xs text-slate-500">
                  Pre-filled and matched against this exam's minimum academic criterion:{" "}
                  <strong className="text-slate-800">{job.qualificationRequired}</strong>.
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                ✓ Eligibility Met
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <Input
                label="Qualifying Degree / Exam Title"
                value={degTitle}
                onChange={(e) => setDegTitle(e.target.value)}
                required
              />
              <Input
                label="Board / University"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
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
                label="Roll Number / Enrollment No"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
              <Input
                label="Aggregate Percentage / CGPA"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                required
              />
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1">
              <p className="font-semibold text-slate-800">Secondary Education Verification (Class X & XII):</p>
              <p className="text-slate-600">
                • Class X: CBSE (2017) — 88.4% (DOB verification confirmed)
              </p>
              <p className="text-slate-600">
                • Class XII: CBSE Non-Medical (2019) — 86.2%
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: CATEGORY & RESERVATION */}
        {currentStep === 3 && (
          <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 3 — Category, Quota & Age Relaxation</h2>
                <p className="text-xs text-slate-500">
                  Calculates statutory reservation quota and admissible age relaxations.
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                {category} Relaxation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <Select
                label="Applied Category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CandidateCategory)}
                options={[
                  { value: "UR", label: "UR (Unreserved / General)" },
                  { value: "OBC-NCL", label: "OBC-NCL (+3y Age Relaxation Claimed)" },
                  { value: "SC", label: "SC (+5y Age Relaxation, Fee Exempted)" },
                  { value: "ST", label: "ST (+5y Age Relaxation, Fee Exempted)" },
                  { value: "EWS", label: "EWS (Economically Weaker Section)" },
                ]}
                required
              />

              <Input
                label="Domicile State / Territory"
                value={domicile}
                onChange={(e) => setDomicile(e.target.value)}
                required
              />

              {category !== "UR" && (
                <>
                  <Input
                    label="Certificate Number"
                    value={certNo}
                    onChange={(e) => setCertNo(e.target.value)}
                    required
                  />
                  <Input
                    label="Issuing Authority & Date"
                    defaultValue="Tehsildar, Delhi (15-05-2024)"
                    required
                  />
                </>
              )}
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-800" />
              <span>
                <strong>Category Certificate Notice:</strong> Your certificate was issued in May 2024. For document verification, please present your valid central non-creamy layer affidavit.
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: AUTOMATIC DOCUMENT SELECTION */}
        {currentStep === 4 && (
          <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 4 — Auto-Selected Vault Documents</h2>
                <p className="text-xs text-slate-500">
                  GovApply automatically selected and verified required documents matching this official notification.
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                ✓ 5 / 5 Documents Attached
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">1. Passport Photograph</p>
                  <p className="text-slate-500 text-[11px]">
                    passport_photo_official.jpg • 38 KB JPEG • Spec Compliant (20-50 KB, 3.5x4.5cm)
                  </p>
                </div>
                <span className="text-emerald-700 font-bold">✓ Attached</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">2. Digital Specimen Signature</p>
                  <p className="text-slate-500 text-[11px]">
                    rajesh_signature.jpg • 14 KB JPEG • Spec Compliant (10-20 KB, Black ink)
                  </p>
                </div>
                <span className="text-emerald-700 font-bold">✓ Attached</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">3. Class X Certificate (Date of Birth Proof)</p>
                  <p className="text-slate-500 text-[11px]">
                    class_10_cbse_certificate.pdf • 680 KB PDF
                  </p>
                </div>
                <span className="text-emerald-700 font-bold">✓ Attached</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">4. Qualifying Degree Certificate</p>
                  <p className="text-slate-500 text-[11px]">
                    ggsipu_btech_degree.pdf • 1.1 MB PDF
                  </p>
                </div>
                <span className="text-emerald-700 font-bold">✓ Attached</span>
              </div>

              {category !== "UR" && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">5. {category} Caste Certificate</p>
                    <p className="text-slate-500 text-[11px]">
                      obc_certificate_govt_delhi.pdf • 530 KB PDF
                    </p>
                  </div>
                  <span className="text-emerald-700 font-bold">✓ Attached</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded text-xs text-blue-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-800 shrink-0" />
              <span>
                All documents have been resized, checked against corrupted headers, and formatted to prevent cyber café rejection.
              </span>
            </div>
          </div>
        )}

        {/* STEP 5: COMPREHENSIVE FORM REVIEW & PREVIEW */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900 flex items-center justify-between">
              <span className="font-bold">
                Please carefully verify every entry below against your original certificates before final submission.
              </span>
              <span className="text-[10px] uppercase font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                Final Review Stage
              </span>
            </div>

            {/* Official Government Form Printout View */}
            <FormReviewTable
              job={job}
              user={{
                ...user,
                fullName,
                fatherName,
                motherName,
                dob,
                gender,
                mobile,
                email,
                category,
                categoryCertificateNo: certNo,
                domicileState: domicile,
              }}
              declarationSigned={declarationSigned}
              onToggleDeclaration={(signed) => setDeclarationSigned(signed)}
              trackingNumber={activeDraft?.trackingNumber}
            />
          </div>
        )}
      </div>

      {/* BOTTOM NAVIGATION ACTIONS */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        {currentStep > 1 ? (
          <Button
            variant="secondary"
            size="md"
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate(`/jobs/${job.id}`)}
          >
            Cancel Application
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="lg"
            type="button"
            onClick={handleNextStep}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="font-bold"
          >
            {currentStep === 5 ? "Confirm & Proceed to Payment (₹40)" : "Save & Continue"}
          </Button>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {activeDraft && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          application={activeDraft}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
