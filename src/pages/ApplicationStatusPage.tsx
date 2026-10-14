import React from "react";
import {
  FileText,
  CheckCircle2,
  Clock,
  Printer,
  ArrowLeft,
  Download,
  Calendar,
  CreditCard,
  Building,
  ShieldCheck,
} from "lucide-react";
import { useApplications } from "../context/ApplicationContext";
import { useJobs } from "../context/JobsContext";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

interface ApplicationStatusPageProps {
  applicationId?: string;
  onNavigate: (path: string) => void;
}

export const ApplicationStatusPage: React.FC<ApplicationStatusPageProps> = ({
  applicationId,
  onNavigate,
}) => {
  const { applications, getApplicationById } = useApplications();
  const { getJobById } = useJobs();

  // If specific application ID is given, show that one. Otherwise default to first application or show full list.
  const app = applicationId ? getApplicationById(applicationId) : applications[0];

  if (!app) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <FileText className="w-10 h-10 text-slate-300 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">No Applications Found</h2>
        <p className="text-xs text-slate-500">You have not prepared or submitted any applications yet.</p>
        <Button variant="primary" size="sm" onClick={() => onNavigate("/jobs")}>
          Browse Open Jobs & Apply
        </Button>
      </div>
    );
  }

  const job = getJobById(app.jobId);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 text-left space-y-6">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <button
            type="button"
            onClick={() => onNavigate("/dashboard")}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Application Status & Tracking
          </h1>
          <p className="text-xs text-slate-600 font-mono">
            Tracking ID: <strong className="text-slate-900 font-bold">{app.trackingNumber}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Print Acknowledgement
          </Button>
        </div>
      </div>

      {/* Main Tracking Details Card */}
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-6">
        {/* Job & Reference Overview Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#0B2546] text-white">
              {app.agency}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{app.jobTitle}</h2>
            <p className="text-xs text-slate-600">{app.department}</p>
          </div>

          <div className="sm:text-right space-y-1">
            <span className="text-xs text-slate-500 block">Status:</span>
            {app.status === "submitted" ? (
              <Badge variant="verified" size="md">
                <CheckCircle2 className="w-4 h-4" /> Application Submitted & Lodged
              </Badge>
            ) : (
              <Badge variant="warning" size="md">
                Application Prepared (Pending Confirmation)
              </Badge>
            )}
            <p className="text-[11px] text-slate-500 mt-1">Lodge Date: {app.appliedDate}</p>
          </div>
        </div>

        {/* APPLICATION TIMELINE — SIMPLE & PROFESSIONAL (Per Prompt Specification) */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Application Milestone Timeline
          </h3>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-600 space-y-6 text-xs">
            {/* Stage 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900 text-sm">1. Candidate Dossier Compiled</p>
                <p className="text-slate-600 text-xs">
                  Personal and educational particulars auto-retrieved from verified candidate profile.
                </p>
                <span className="text-[10px] text-emerald-800 font-semibold block">Completed</span>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900 text-sm">2. Documents Attached & Spec-Checked</p>
                <p className="text-slate-600 text-xs">
                  Photograph (38KB), Signature (14KB), Class X DOB proof and Degree certificate verified.
                </p>
                <span className="text-[10px] text-emerald-800 font-semibold block">Completed</span>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900 text-sm">3. Candidate Review & Declaration</p>
                <p className="text-slate-600 text-xs">
                  Applicant signed statutory declaration verifying authenticity of all particulars.
                </p>
                <span className="text-[10px] text-emerald-800 font-semibold block">Confirmed</span>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="relative">
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-0 w-4 h-4 rounded-full flex items-center justify-center ${
                  app.status === "submitted"
                    ? "bg-emerald-600 ring-4 ring-emerald-100"
                    : "bg-slate-300 ring-4 ring-slate-100"
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900 text-sm">
                  4. Assisted Application Lodged & Service Fee Paid
                </p>
                <p className="text-slate-600 text-xs">
                  {app.status === "submitted"
                    ? `Payment Ref: ${app.paymentId || "PAY-UPI-20260312-9812"} via ${app.paymentMethod || "UPI"} (₹40)`
                    : "Awaiting final ₹40 payment confirmation"}
                </p>
                <span
                  className={`text-[10px] font-semibold block ${
                    app.status === "submitted" ? "text-emerald-800" : "text-amber-800"
                  }`}
                >
                  {app.status === "submitted" ? "Successfully Lodged" : "Action Required"}
                </span>
              </div>
            </div>

            {/* Stage 5: Upcoming */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-slate-100 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-slate-500 text-sm">5. Commission Scrutiny & Hall Ticket Release</p>
                <p className="text-slate-500 text-xs">
                  Notification of admit card release will be dispatched via SMS & Email.
                </p>
                <span className="text-[10px] text-slate-400 font-semibold block">Upcoming Stage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Receipt Summary Box */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-semibold text-slate-800">
            <span>GovApply Transaction Acknowledgement</span>
            <span className="font-mono text-emerald-800">PAID ₹40.00</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600 text-[11px]">
            <div>
              <span className="text-slate-400 block">Transaction ID</span>
              <span className="font-mono text-slate-900 font-bold">{app.paymentId || "PAY-SIM-9821"}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Payment Mode</span>
              <span className="text-slate-900">{app.paymentMethod || "UPI"}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Candidate Name</span>
              <span className="text-slate-900">{app.candidateName}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Lodge Date</span>
              <span className="text-slate-900">{app.appliedDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate(`/jobs/${app.jobId}`)}
            className="text-xs"
          >
            View Official Notification Details
          </Button>

          {app.status !== "submitted" && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate(`/apply/${app.jobId}`)}
              className="text-xs font-bold"
            >
              Complete Application Draft →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
