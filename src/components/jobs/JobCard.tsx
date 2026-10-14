import React from "react";
import {
  Calendar,
  Users,
  GraduationCap,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { Job } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { checkJobEligibility } from "../../utils/eligibility";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface JobCardProps {
  job: Job;
  onViewDetails: (jobId: string) => void;
  onApply: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails, onApply }) => {
  const { user, isAuthenticated } = useAuth();

  const eligibility = isAuthenticated && user ? checkJobEligibility(user, job) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-md p-4 sm:p-5 hover:border-slate-300 transition-all duration-150 text-left shadow-xs">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-3 border-b border-slate-100">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#0B2546] text-white uppercase tracking-wider">
              {job.agency}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Advt: {job.notificationNumber}
            </span>
            {job.isClosingSoon && (
              <Badge variant="warning" size="sm">
                Closing Soon
              </Badge>
            )}
            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
              Demo Notice
            </span>
          </div>

          <h3
            onClick={() => onViewDetails(job.id)}
            className="text-base sm:text-lg font-semibold text-slate-900 hover:text-[#0B2546] cursor-pointer transition-colors"
          >
            {job.title}
          </h3>
          <p className="text-xs text-slate-600 font-medium">{job.department}</p>
        </div>

        {/* Real-Time Profile Eligibility Badge */}
        <div className="shrink-0 sm:text-right">
          {eligibility ? (
            eligibility.status === "eligible" ? (
              <Badge variant="eligible" size="md">
                <ShieldCheck className="w-3.5 h-3.5" />
                Eligible For Your Profile
              </Badge>
            ) : eligibility.status === "attention_required" ? (
              <Badge variant="warning" size="md">
                <AlertCircle className="w-3.5 h-3.5" />
                Attention Needed (Certificate)
              </Badge>
            ) : (
              <Badge variant="error" size="md">
                <AlertCircle className="w-3.5 h-3.5" />
                Not Eligible (Criteria Mismatch)
              </Badge>
            )
          ) : (
            <Badge variant="neutral" size="sm">
              Sign In to Check Eligibility
            </Badge>
          )}
        </div>
      </div>

      {/* Structured Job Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 text-xs border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-700">
          <Users className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-[10px] uppercase text-slate-400 block font-semibold">Vacancies</span>
            <span className="font-semibold text-slate-900">{job.totalVacancies.toLocaleString("en-IN")} Posts</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700">
          <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-[10px] uppercase text-slate-400 block font-semibold">Qualification</span>
            <span className="font-semibold text-slate-900">{job.qualificationRequired}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700">
          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-[10px] uppercase text-slate-400 block font-semibold">Age Limit</span>
            <span className="font-semibold text-slate-900">{job.minAge} - {job.maxAge} Years</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-700">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-[10px] uppercase text-slate-400 block font-semibold">Location</span>
            <span className="font-semibold text-slate-900 line-clamp-1">{job.location.split("(")[0]}</span>
          </div>
        </div>
      </div>

      {/* Description Snippet & Timeline Footer */}
      <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Last Date: <strong className="text-slate-900 font-semibold">{job.lastDate}</strong>
            </span>
          </div>
          <div>
            <span>
              Official Exam Fee:{" "}
              <strong className="text-slate-900 font-semibold">
                ₹{job.applicationFee.general}
              </strong>{" "}
              <span className="text-[11px] text-slate-500">(Reserved/Women: ₹{job.applicationFee.reserved})</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(job.id)}
            className="flex-1 sm:flex-none text-xs"
          >
            Notification Details
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onApply(job.id)}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="flex-1 sm:flex-none text-xs"
          >
            Prepare Application
          </Button>
        </div>
      </div>
    </div>
  );
};
