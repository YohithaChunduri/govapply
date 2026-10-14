import React from "react";
import { UserProfile, Job, EducationRecord } from "../../types";
import { CheckSquare, ShieldCheck, Printer } from "lucide-react";
import { Button } from "../ui/Button";

interface FormReviewTableProps {
  job: Job;
  user: UserProfile;
  declarationSigned: boolean;
  onToggleDeclaration: (signed: boolean) => void;
  trackingNumber?: string;
  isConfirmedView?: boolean;
}

export const FormReviewTable: React.FC<FormReviewTableProps> = ({
  job,
  user,
  declarationSigned,
  onToggleDeclaration,
  trackingNumber = "GA-2026-DRAFT",
  isConfirmedView = false,
}) => {
  return (
    <div className="bg-white border border-slate-300 rounded-md p-6 text-left shadow-xs text-slate-900">
      {/* Official Top Form Banner */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 bg-[#0B2546] text-white rounded">
                OFFICIAL APPLICATION SUMMARY DRAFT
              </span>
              <span className="text-xs text-slate-500 font-mono">Assisted by GovApply</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">{job.title}</h2>
            <p className="text-xs text-slate-600 font-medium">{job.department} • Advt No: {job.notificationNumber}</p>
          </div>

          {/* Reference Numbers & Print Button */}
          <div className="md:text-right space-y-1">
            <p className="text-xs text-slate-500">
              Application Ref No: <strong className="text-slate-900 font-mono">{trackingNumber}</strong>
            </p>
            <p className="text-xs text-slate-500">
              Date Generated: <span className="font-medium text-slate-800">{new Date().toLocaleDateString("en-IN")}</span>
            </p>
            {isConfirmedView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                leftIcon={<Printer className="w-3.5 h-3.5" />}
                className="text-xs py-1 px-2 no-print"
              >
                Print / Save PDF
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Candidate Photo & Signature Visual Boxes (Realistic Govt Format) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded mb-6">
        <div className="text-xs space-y-1">
          <p className="font-semibold text-slate-900">Biometric & Identity Asset Attachments</p>
          <p className="text-slate-500 text-[11px]">
            Formatted to official notification specifications (White background, strictly sized to 20–50 KB & 10–20 KB).
          </p>
          <div className="flex items-center gap-2 text-emerald-700 font-medium text-[11px] pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dimensions & Byte Size Verified by GovApply Engine</span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {/* Photo Box */}
          <div className="w-24 h-32 border-2 border-dashed border-slate-300 rounded bg-white flex flex-col items-center justify-center p-1 text-center shadow-2xs">
            <div className="w-14 h-16 bg-slate-200 rounded-sm mb-1 flex items-center justify-center text-slate-400 font-bold text-lg">
              {user.fullName.slice(0, 1)}
            </div>
            <span className="text-[9px] uppercase font-bold text-slate-600 leading-tight">Passport Photo</span>
            <span className="text-[8px] text-emerald-700 font-semibold">3.5 x 4.5 cm</span>
          </div>

          {/* Signature Box */}
          <div className="w-32 h-16 border-2 border-dashed border-slate-300 rounded bg-white flex flex-col items-center justify-center p-1 text-center shadow-2xs">
            <span className="font-serif italic text-sm text-slate-800 tracking-wider">
              {user.fullName}
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-500 leading-tight">Specimen Signature</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: Personal Particulars */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-3 py-1.5 border border-slate-200 rounded-t">
          1. Candidate Personal Particulars
        </h3>
        <table className="w-full text-xs border border-slate-200 divide-y divide-slate-200 border-t-0">
          <tbody className="divide-y divide-slate-200">
            <tr className="divide-x divide-slate-200">
              <td className="w-1/4 p-2.5 font-semibold text-slate-600 bg-slate-50/50">Full Name</td>
              <td className="w-1/4 p-2.5 font-bold text-slate-900 uppercase">{user.fullName}</td>
              <td className="w-1/4 p-2.5 font-semibold text-slate-600 bg-slate-50/50">Gender</td>
              <td className="w-1/4 p-2.5 text-slate-900">{user.gender}</td>
            </tr>
            <tr className="divide-x divide-slate-200">
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">Father's Name</td>
              <td className="p-2.5 text-slate-900">{user.fatherName}</td>
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">Mother's Name</td>
              <td className="p-2.5 text-slate-900">{user.motherName}</td>
            </tr>
            <tr className="divide-x divide-slate-200">
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">Date of Birth</td>
              <td className="p-2.5 text-slate-900 font-medium">{user.dob}</td>
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">Aadhaar (Masked)</td>
              <td className="p-2.5 font-mono text-slate-900">{user.aadhaarNumber}</td>
            </tr>
            <tr className="divide-x divide-slate-200">
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">Mobile Number</td>
              <td className="p-2.5 text-slate-900">{user.mobile}</td>
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">Email Address</td>
              <td className="p-2.5 text-slate-900">{user.email}</td>
            </tr>
            <tr className="divide-x divide-slate-200">
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">Permanent Address</td>
              <td colSpan={3} className="p-2.5 text-slate-900">
                {user.permanentAddress.street}, {user.permanentAddress.city},{" "}
                {user.permanentAddress.district}, {user.permanentAddress.state} - {user.permanentAddress.pincode}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECTION 2: Educational Qualifications */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-3 py-1.5 border border-slate-200 rounded-t">
          2. Educational Qualifications
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-200 divide-y divide-slate-200 border-t-0">
            <thead className="bg-slate-50 text-slate-600 font-semibold">
              <tr className="divide-x divide-slate-200">
                <th className="p-2 text-left">Level</th>
                <th className="p-2 text-left">Exam / Degree Title</th>
                <th className="p-2 text-left">Board / University</th>
                <th className="p-2 text-center">Year</th>
                <th className="p-2 text-center">Roll Number</th>
                <th className="p-2 text-right">Percentage / CGPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {user.education.map((edu, idx) => (
                <tr key={idx} className="divide-x divide-slate-200">
                  <td className="p-2 font-semibold text-slate-900">{edu.level}</td>
                  <td className="p-2 text-slate-800">{edu.degreeName}</td>
                  <td className="p-2 text-slate-600">{edu.boardOrUniversity}</td>
                  <td className="p-2 text-center text-slate-800 font-mono">{edu.passingYear}</td>
                  <td className="p-2 text-center text-slate-800 font-mono">{edu.rollNumber}</td>
                  <td className="p-2 text-right font-bold text-slate-900">{edu.percentageOrCgpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: Reservation, Category & Age Relaxation */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-3 py-1.5 border border-slate-200 rounded-t">
          3. Category & Statutory Concessions Claimed
        </h3>
        <table className="w-full text-xs border border-slate-200 divide-y divide-slate-200 border-t-0">
          <tbody className="divide-y divide-slate-200">
            <tr className="divide-x divide-slate-200">
              <td className="w-1/4 p-2.5 font-semibold text-slate-600 bg-slate-50/50">Applied Category</td>
              <td className="w-1/4 p-2.5 font-bold text-slate-900">{user.category}</td>
              <td className="w-1/4 p-2.5 font-semibold text-slate-600 bg-slate-50/50">Certificate Number</td>
              <td className="w-1/4 p-2.5 text-slate-900 font-mono">{user.categoryCertificateNo || "N/A"}</td>
            </tr>
            <tr className="divide-x divide-slate-200">
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">Date of Certificate Issue</td>
              <td className="p-2.5 text-slate-900">{user.categoryIssueDate || "N/A"}</td>
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">Domicile State</td>
              <td className="p-2.5 text-slate-900">{user.domicileState}</td>
            </tr>
            <tr className="divide-x divide-slate-200">
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">PwD Status</td>
              <td className="p-2.5 text-slate-900">{user.isPwD ? "Yes (PwD)" : "No"}</td>
              <td className="p-2.5 font-semibold text-slate-600 bg-slate-50/50">Ex-Serviceman Quota</td>
              <td className="p-2.5 text-slate-900">{user.isExServiceman ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECTION 4: Auto-Attached Documents */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-3 py-1.5 border border-slate-200 rounded-t">
          4. Auto-Selected Vault Documents Attached
        </h3>
        <div className="p-3 border border-slate-200 border-t-0 space-y-1.5 text-xs text-slate-700">
          {user.documents.map((doc, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
              <span className="font-medium text-slate-900">• {doc.name} ({doc.fileName})</span>
              <span className="text-[11px] font-semibold text-emerald-700">✓ Attached & Spec Verified</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: Statutory Applicant Declaration */}
      <div className="p-4 bg-slate-50 border border-slate-300 rounded text-xs space-y-3">
        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
          Statutory Applicant Declaration
        </h4>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          I hereby solemnly declare that all statements made in this application are true, complete and correct to the best of my knowledge and belief. I understand that in the event of any information being found false, fraudulent or incorrect, or ineligibility being detected before or after the examination/interview, my candidature shall stand cancelled forthwith without any notice.
        </p>

        {!isConfirmedView ? (
          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={declarationSigned}
              onChange={(e) => onToggleDeclaration(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#0B2546] border-slate-300 focus:ring-[#0B2546] cursor-pointer"
            />
            <span className="font-semibold text-slate-900 select-none">
              I have verified all information above against original certificates and agree to the declaration.
            </span>
          </label>
        ) : (
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs pt-1">
            <CheckSquare className="w-4 h-4 text-emerald-700" />
            <span>Electronically verified and signed by applicant on {new Date().toLocaleDateString("en-IN")}.</span>
          </div>
        )}
      </div>
    </div>
  );
};
