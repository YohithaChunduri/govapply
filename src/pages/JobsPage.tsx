import React from "react";
import { useJobs } from "../context/JobsContext";
import { JobCard } from "../components/jobs/JobCard";
import { JobFilter } from "../components/jobs/JobFilter";
import { Info, Briefcase } from "lucide-react";

interface JobsPageProps {
  onNavigate: (path: string) => void;
}

export const JobsPage: React.FC<JobsPageProps> = ({ onNavigate }) => {
  const { filteredJobs } = useJobs();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 text-left space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#0B2546] text-white">
              Recruitment Directory
            </span>
            <span className="text-xs text-slate-500 font-medium">All India & State Notifications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Government Job Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Compare educational qualifications, age limits, and check automated eligibility against your saved profile.
          </p>
        </div>

        {/* Demo Data Disclaimer Banner */}
        <div className="p-2.5 bg-slate-100 border border-slate-200 rounded text-[11px] text-slate-600 sm:max-w-xs">
          <div className="flex items-center gap-1 font-semibold text-slate-800 mb-0.5">
            <Info className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            Evaluation Prototype Notice
          </div>
          <p>
            The recruitment notices listed below are realistic sample data modeled on current Indian recruitment standards.
          </p>
        </div>
      </div>

      {/* Filter Component */}
      <JobFilter />

      {/* Results Count & Sort Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900 font-semibold">{filteredJobs.length}</strong> official recruitment notices
        </span>
        <span>Sorted by: Application Closing Date</span>
      </div>

      {/* Job Cards List */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-md p-10 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching jobs found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search query or loosening your qualification / agency filters to see more results.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={(id) => onNavigate(`/jobs/${id}`)}
              onApply={(id) => onNavigate(`/apply/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
