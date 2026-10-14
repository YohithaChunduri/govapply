import React from "react";
import { CheckCircle2, AlertCircle, XCircle, ArrowRight, ShieldCheck, FileText, UserCheck } from "lucide-react";
import { Job } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { checkJobEligibility } from "../../utils/eligibility";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface EligibilityDrawerProps {
  job: Job;
  onPrepareApplication: (jobId: string) => void;
  onLoginRequest?: () => void;
}

export const EligibilityDrawer: React.FC<EligibilityDrawerProps> = ({
  job,
  onPrepareApplication,
  onLoginRequest,
}) => {
  const { user, isAuthenticated, loginWithDemo } = useAuth();

  const eligibility = isAuthenticated && user ? checkJobEligibility(user, job) : null;

  return (
    <div className="bg-white border border-slate-300 rounded-md p-5 text-left shadow-xs sticky top-20">
      {/* Header */}
      <div className="pb-3 border-b border-slate-200">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Eligibility Engine
          </span>
          {eligibility && (
            <Badge
              variant={
                eligibility.status === "eligible"
                  ? "eligible"
                  : eligibility.status === "attention_required"
                  ? "warning"
                  : "error"
              }
              size="sm"
            >
              {eligibility.status === "eligible"
                ? "Full Match"
                : eligibility.status === "attention_required"
                ? "Attention Needed"
                : "Criteria Mismatch"}
            </Badge>
          )}
        </div>
        <h3 className="text-base font-bold text-slate-900">Your Eligibility Check</h3>
        {user && (
          <p className="text-xs text-slate-500 mt-0.5">
            Verified candidate: <strong className="text-slate-800 font-semibold">{user.fullName}</strong> ({user.category})
          </p>
        )}
      </div>

      {/* When Not Logged In */}
      {!isAuthenticated && (
        <div className="py-5 text-center space-y-3">
          <UserCheck className="w-8 h-8 text-slate-400 mx-auto" />
          <div>
            <p className="text-xs font-semibold text-slate-800">Check Match Against Your Saved Profile</p>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to automatically compare your age, qualifications, and stored documents against this notification.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                loginWithDemo();
              }}
              className="w-full text-xs"
            >
              ⚡ Instant Demo Check (Rajesh Sharma)
            </Button>
            {onLoginRequest && (
              <Button variant="outline" size="sm" onClick={onLoginRequest} className="w-full text-xs">
                Candidate Login
              </Button>
            )}
          </div>
        </div>
      )}

      {/* When Logged In: Detailed Parameter Breakdown */}
      {isAuthenticated && eligibility && (
        <div className="py-4 space-y-3.5">
          {eligibility.checks.map((item, idx) => (
            <div key={idx} className="text-xs space-y-1">
              <div className="flex items-start gap-2">
                {item.met === true ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : item.met === "warning" ? (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{item.criterion}</span>
                    <span
                      className={`text-[10px] uppercase font-bold ${
                        item.met === true
                          ? "text-emerald-700"
                          : item.met === "warning"
                          ? "text-amber-700"
                          : "text-rose-700"
                      }`}
                    >
                      {item.met === true ? "Passed" : item.met === "warning" ? "Notice" : "Failed"}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Your record: <span className="font-medium text-slate-900">{item.candidateValue}</span>
                  </p>
                  {item.note && (
                    <p
                      className={`text-[11px] mt-0.5 ${
                        item.met === "warning" ? "text-amber-800 font-medium" : "text-slate-500"
                      }`}
                    >
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Status Remark Box */}
          <div
            className={`p-3 rounded text-xs border ${
              eligibility.status === "eligible"
                ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                : eligibility.status === "attention_required"
                ? "bg-amber-50/80 border-amber-200 text-amber-900"
                : "bg-rose-50/80 border-rose-200 text-rose-900"
            }`}
          >
            <p className="font-semibold mb-0.5">
              {eligibility.status === "eligible"
                ? "✓ Ready For Application Draft"
                : eligibility.status === "attention_required"
                ? "⚠ Warning: Check Certificate Details"
                : "✕ Criteria Incompatible"}
            </p>
            <p className="text-[11px] opacity-90">{eligibility.remarks}</p>
          </div>

          {/* GovApply Assisted Draft Trigger */}
          <div className="pt-2 space-y-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => onPrepareApplication(job.id)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full text-sm font-semibold"
              disabled={eligibility.status === "not_eligible"}
            >
              Prepare Application
            </Button>
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>Platform Assistance Fee:</span>
              <span className="font-bold text-slate-800">₹40 per draft</span>
            </div>
            <p className="text-[11px] text-slate-500 text-center leading-tight">
              Pre-fills personal details, auto-selects formatted photo & signature, and validates certificates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
