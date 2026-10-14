import React from "react";
import {
  ShieldCheck,
  Briefcase,
  FileText,
  FolderOpen,
  Calendar,
  AlertCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
  ExternalLink,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import { useApplications } from "../context/ApplicationContext";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { jobs } = useJobs();
  const { applications } = useApplications();

  // Time-aware greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Filter 3 matching jobs
  const matchingJobs = jobs.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 text-left space-y-6">
      {/* Top Greeting & Dossier Completion Banner */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#0B2546] text-white">
                Candidate Dashboard
              </span>
              <span className="text-xs text-slate-500 font-mono">Dossier ID: {user?.id || "USR-DL-98231"}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {greeting}, {user?.fullName || "Candidate"}
            </h1>
            <p className="text-xs text-slate-600">
              Registered Category: <strong className="text-slate-800">{user?.category}</strong> • Domicile:{" "}
              <strong className="text-slate-800">{user?.domicileState}</strong>
            </p>
          </div>

          {/* Profile Completion Bar */}
          <div className="lg:w-80 bg-slate-50 p-3.5 rounded border border-slate-200 space-y-2 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Dossier Completion</span>
              <span className="font-bold text-emerald-700">{user?.profileCompletionPercentage || 85}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${user?.profileCompletionPercentage || 85}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Core documents verified. Upload renewal for OBC-NCL certificate to reach 100%.
            </p>
          </div>
        </div>

        {/* Quick Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block">Matching Opportunities</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">6 Open</p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block">Stored Documents</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{user?.documents.length || 7} Files</p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block">Active Applications</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{applications.length} Drafted / Lodged</p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block">Fixed Platform Fee</span>
            <p className="text-xl font-bold text-emerald-700 mt-0.5">₹40 / App</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Matching Jobs (Left) and Deadlines + Docs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Eligible Matching Jobs + Applications Table */}
        <div className="lg:col-span-8 space-y-6">
          {/* SECTION: Top Eligible Jobs For Your Profile */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Recommended Jobs Matching Your Profile
                </h2>
                <p className="text-xs text-slate-500">
                  Based on your degree (B.Tech Graduate), age (24y), and OBC-NCL reservation criteria.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("/jobs")}
                className="text-xs font-semibold shrink-0"
              >
                Browse All ({jobs.length})
              </Button>
            </div>

            <div className="space-y-3">
              {matchingJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3.5 rounded border border-slate-200 hover:border-slate-300 transition-colors bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-800 font-bold text-[10px] border border-slate-200">
                        {job.agency}
                      </span>
                      <Badge variant="eligible" size="sm">
                        ✓ Eligible
                      </Badge>
                      {job.isClosingSoon && (
                        <span className="text-[10px] text-amber-800 font-semibold bg-amber-100 px-1.5 py-0.2 rounded">
                          Closing Soon
                        </span>
                      )}
                    </div>
                    <h3
                      onClick={() => onNavigate(`/jobs/${job.id}`)}
                      className="font-bold text-slate-900 text-sm hover:text-[#0B2546] cursor-pointer"
                    >
                      {job.title}
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      {job.department} • {job.totalVacancies.toLocaleString("en-IN")} Vacancies • Last Date:{" "}
                      <strong className="text-slate-800">{job.lastDate}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onNavigate(`/jobs/${job.id}`)}
                      className="text-xs py-1 px-2.5 min-h-[32px]"
                    >
                      View Notice
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onNavigate(`/apply/${job.id}`)}
                      className="text-xs py-1 px-3 min-h-[32px]"
                    >
                      Prepare App (₹40)
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION: Recent Applications Tracker Table */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Your Recent Applications</h2>
                <p className="text-xs text-slate-500">Track draft review status, receipts, and submission slips.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("/applications")}
                className="text-xs font-semibold shrink-0"
              >
                View Full Tracking
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Application Ref</th>
                    <th className="p-2.5">Job / Exam</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-2.5 font-mono font-bold text-slate-900">{app.trackingNumber}</td>
                      <td className="p-2.5">
                        <p className="font-semibold text-slate-800 line-clamp-1">{app.jobTitle}</p>
                        <p className="text-[11px] text-slate-500">{app.department}</p>
                      </td>
                      <td className="p-2.5">
                        {app.status === "submitted" ? (
                          <Badge variant="verified" size="sm">
                            ✓ Submitted
                          </Badge>
                        ) : app.status === "prepared" ? (
                          <Badge variant="warning" size="sm">
                            Review & Pay
                          </Badge>
                        ) : (
                          <Badge variant="draft" size="sm">
                            Draft
                          </Badge>
                        )}
                      </td>
                      <td className="p-2.5 text-slate-600">{app.appliedDate}</td>
                      <td className="p-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => onNavigate(`/applications/${app.id}`)}
                          className="font-semibold text-[#0B2546] hover:underline cursor-pointer"
                        >
                          {app.status === "submitted" ? "Acknowledgement Slip →" : "Continue Review →"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Approaching Deadlines & Document Completion */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Application Deadlines */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Clock className="w-4 h-4 text-amber-700" />
              <h3 className="text-sm font-bold text-slate-900">Upcoming Exam Deadlines</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded bg-amber-50 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-900">
                  <span>SSC CGL 2026</span>
                  <span>28 Mar 2026</span>
                </div>
                <p className="text-[11px] text-amber-800">Closing in 10 days. Ensure draft is confirmed.</p>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Delhi Police SI 2026</span>
                  <span>02 Apr 2026</span>
                </div>
                <p className="text-[11px] text-slate-500">4,187 vacancies. Driving license verification active.</p>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>RRB NTPC Recruitment</span>
                  <span>05 Apr 2026</span>
                </div>
                <p className="text-[11px] text-slate-500">11,558 Posts across Railway Zones.</p>
              </div>
            </div>
          </div>

          {/* Document Vault Status */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[#0B2546]" />
                <h3 className="text-sm font-bold text-slate-900">Document Vault</h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("/documents")}
                className="text-xs text-[#0B2546] font-semibold hover:underline cursor-pointer"
              >
                Manage Files →
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-700">Passport Photo (JPEG, 38KB)</span>
                <span className="text-emerald-700 font-bold">✓ Ready</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-700">Digital Signature (JPEG, 14KB)</span>
                <span className="text-emerald-700 font-bold">✓ Ready</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-700">Class X DOB Certificate</span>
                <span className="text-emerald-700 font-bold">✓ Ready</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-700">B.Tech Degree Certificate</span>
                <span className="text-emerald-700 font-bold">✓ Ready</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-700">Central OBC-NCL Certificate</span>
                <span className="text-amber-700 font-bold">⚠ Renewal Advised</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("/documents")}
              className="w-full text-xs"
            >
              Open Document Vault
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
