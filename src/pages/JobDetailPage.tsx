import React from "react";
import {
  Calendar,
  Users,
  GraduationCap,
  Clock,
  MapPin,
  FileText,
  CreditCard,
  Layers,
  ArrowLeft,
  AlertCircle,
  Download,
  Info,
} from "lucide-react";
import { useJobs } from "../context/JobsContext";
import { EligibilityDrawer } from "../components/jobs/EligibilityDrawer";
import { Button } from "../components/ui/Button";

interface JobDetailPageProps {
  jobId: string;
  onNavigate: (path: string) => void;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({ jobId, onNavigate }) => {
  const { getJobById } = useJobs();
  const job = getJobById(jobId);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Recruitment Notice Not Found</h2>
        <p className="text-xs text-slate-500">The requested job notification does not exist or has closed.</p>
        <Button variant="primary" size="sm" onClick={() => onNavigate("/jobs")}>
          Back to Jobs Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 text-left space-y-6">
      {/* Top Breadcrumb Back Link */}
      <button
        type="button"
        onClick={() => onNavigate("/jobs")}
        className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 font-medium cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Recruitment Directory
      </button>

      {/* Main Grid: Details (Left 8) + Sticky Eligibility Panel (Right 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Comprehensive Official Job Notice Particulars */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#0B2546] text-white">
                {job.agency}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Advt Ref: {job.notificationNumber}
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                Evaluation Sample Notice
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {job.title}
            </h1>
            <p className="text-sm font-semibold text-slate-700">{job.department}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Vacancies</span>
                <span className="text-sm font-bold text-slate-900">{job.totalVacancies.toLocaleString("en-IN")} Posts</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Min Qualification</span>
                <span className="text-sm font-bold text-slate-900">{job.qualificationRequired}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Age Range</span>
                <span className="text-sm font-bold text-slate-900">{job.minAge} - {job.maxAge} Years</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Closing Date</span>
                <span className="text-sm font-bold text-slate-900">{job.lastDate}</span>
              </div>
            </div>
          </div>

          {/* SECTION 1: Vacancies Breakdown By Social Category */}
          <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0B2546]" />
              1. Vacancy Distribution by Category
            </h2>
            <p className="text-xs text-slate-500">
              Statutory vertical reservations allocated according to Government of India rules:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 divide-y divide-slate-200">
                <thead className="bg-slate-50 text-slate-700 font-semibold">
                  <tr className="divide-x divide-slate-200">
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Reservation Quota</th>
                    <th className="p-2.5 text-right">Sanctioned Vacancies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {job.vacanciesBreakdown.map((item, idx) => (
                    <tr key={idx} className="divide-x divide-slate-200">
                      <td className="p-2.5 font-bold text-slate-900">{item.category}</td>
                      <td className="p-2.5 text-slate-600">
                        {item.category === "UR"
                          ? "Open Merit / Unreserved"
                          : item.category === "OBC-NCL"
                          ? "27% Other Backward Classes (Non-Creamy Layer)"
                          : item.category === "SC"
                          ? "15% Scheduled Castes"
                          : item.category === "ST"
                          ? "7.5% Scheduled Tribes"
                          : "10% Economically Weaker Sections"}
                      </td>
                      <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                        {item.count.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 divide-x divide-slate-200 font-bold">
                    <td colSpan={2} className="p-2.5 text-slate-900 uppercase text-[11px]">
                      Total Vacancy Strength
                    </td>
                    <td className="p-2.5 text-right font-mono text-slate-900">
                      {job.totalVacancies.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 2: Academic Qualification & Cutoff */}
          <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#0B2546]" />
              2. Minimum Educational Qualification
            </h2>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
              <p className="font-semibold text-slate-900">{job.qualificationDiscipline}</p>
              <p className="text-slate-600">
                Candidates must have acquired the prescribed essential qualification on or before the crucial date{" "}
                <strong className="text-slate-800">{job.ageCutoffDate}</strong>. Documentary evidence (Degree / Marksheet) must be furnished.
              </p>
            </div>
          </div>

          {/* SECTION 3: Age Limit & Category Relaxations */}
          <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0B2546]" />
              3. Age Limits & Permissible Relaxations
            </h2>
            <div className="text-xs space-y-2">
              <p className="text-slate-700">
                Crucial Date for Age Calculation: <strong className="text-slate-900">{job.ageCutoffDate}</strong>. Normal age bracket:{" "}
                <strong className="text-slate-900">{job.minAge} to {job.maxAge} Years</strong>.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-slate-200 divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-slate-700 font-semibold">
                    <tr className="divide-x divide-slate-200">
                      <th className="p-2 text-left">Category Code</th>
                      <th className="p-2 text-left">Category Description</th>
                      <th className="p-2 text-right">Age Relaxation Permissible</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    <tr className="divide-x divide-slate-200">
                      <td className="p-2 font-mono">01</td>
                      <td className="p-2">SC / ST Candidates</td>
                      <td className="p-2 text-right font-semibold text-emerald-800">5 Years</td>
                    </tr>
                    <tr className="divide-x divide-slate-200">
                      <td className="p-2 font-mono">02</td>
                      <td className="p-2">OBC-NCL Candidates (Central List)</td>
                      <td className="p-2 text-right font-semibold text-emerald-800">3 Years</td>
                    </tr>
                    <tr className="divide-x divide-slate-200">
                      <td className="p-2 font-mono">03</td>
                      <td className="p-2">PwD Candidates (Unreserved)</td>
                      <td className="p-2 text-right font-semibold text-emerald-800">10 Years</td>
                    </tr>
                    <tr className="divide-x divide-slate-200">
                      <td className="p-2 font-mono">04</td>
                      <td className="p-2">Ex-Servicemen (ESM)</td>
                      <td className="p-2 text-right font-semibold text-emerald-800">3 Years after deduction of military service</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SECTION 4: Scheme of Examination & Selection Stages */}
          <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0B2546]" />
              4. Selection Process & Examination Stages
            </h2>
            <div className="space-y-2 text-xs">
              {job.selectionStages.map((stage, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-[#0B2546] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-800">{stage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: Mandatory Required Documents */}
          <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0B2546]" />
              5. Documents Required During Application Draft
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {job.requiredDocsList.map((doc, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-2">
                  <span className="text-[#0B2546] font-bold">•</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              *GovApply automatically attaches and resizes these from your stored candidate document vault.
            </p>
          </div>
        </div>

        {/* Right Column: Sticky Eligibility Engine Panel */}
        <div className="lg:col-span-4">
          <EligibilityDrawer
            job={job}
            onPrepareApplication={(id) => onNavigate(`/apply/${id}`)}
            onLoginRequest={() => onNavigate("/login")}
          />
        </div>
      </div>
    </div>
  );
};
