import React from "react";
import {
  Briefcase,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FolderLock,
  Clock,
  ChevronRight,
  AlertTriangle,
  Building,
  Users,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { sampleJobs } from "../data/sampleJobs";

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="text-left text-slate-900">
      {/* Top Notification Announcement Ticker */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
              Active Drive
            </span>
            <span>
              SSC CGL 2026 Notification published with 14,840 vacancies. Last date: 28 March 2026.
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("/jobs/job-ssc-cgl-2026")}
            className="font-semibold text-amber-950 underline hover:text-amber-800 text-xs flex items-center gap-1 cursor-pointer"
          >
            Check Eligibility & Apply <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Hero Section — Clean Government Portal + Polished SaaS (Zero AI Fluff) */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Clear Value & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Assisted Government Recruitment Workflow</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Government Jobs, <br className="hidden sm:inline" />
              <span className="text-[#0B2546]">Made Easier.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Save your personal details, educational qualifications, and verified documents once. Find matching government jobs and prepare accurate application drafts in minutes — without repeated cyber café queues.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate("/jobs")}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold text-sm"
              >
                Browse Government Jobs
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  const elem = document.getElementById("how-it-works");
                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-semibold"
              >
                How It Works
              </Button>
            </div>

            {/* Practical Metrics / Trust Bar */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <p className="text-lg font-bold text-slate-900">₹40</p>
                <p className="text-[11px] text-slate-500">Per assisted application</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">1-Time</p>
                <p className="text-[11px] text-slate-500">Dossier registration</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">100%</p>
                <p className="text-[11px] text-slate-500">Spec-checked photos & signatures</p>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Product Preview / Candidate Hub Snapshot */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-300 rounded-md shadow-xs overflow-hidden">
              {/* Fake Portal Window Header */}
              <div className="bg-[#0B2546] text-white px-4 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span className="font-semibold text-slate-100">Candidate Portal Preview</span>
                </div>
                <span className="text-[11px] text-slate-300">Profile ID: USR-DL-98231</span>
              </div>

              {/* Inside Window: Realistic Dashboard Snapshot */}
              <div className="p-4 sm:p-5 space-y-4 text-xs">
                {/* Profile Completion Bar */}
                <div className="bg-white p-3 rounded border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Dossier Completion</span>
                    <span className="font-bold text-emerald-700">85% Complete</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full w-[85%]"></div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Aadhaar, Photo, Signature & Degree verified. Ready to prepare applications.
                  </p>
                </div>

                {/* Live Eligible Match Snippet */}
                <div className="bg-white p-3 rounded border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Top Matching Job</span>
                    <Badge variant="eligible" size="sm">
                      ✓ Eligible
                    </Badge>
                  </div>
                  <p className="font-semibold text-slate-800 text-xs leading-tight">
                    SSC Combined Graduate Level (CGL) 2026
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>14,840 Vacancies • All India</span>
                    <span className="font-medium text-slate-700">Last Date: 28 Mar</span>
                  </div>
                </div>

                {/* Stored Documents Checklist */}
                <div className="bg-white p-3 rounded border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-slate-500">
                    Stored Documents (Vault)
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <span className="text-emerald-700 font-medium">✓ Photo (38 KB JPEG)</span>
                    <span className="text-emerald-700 font-medium">✓ Signature (14 KB)</span>
                    <span className="text-emerald-700 font-medium">✓ Class X (DOB Proof)</span>
                    <span className="text-emerald-700 font-medium">✓ Degree Certificate</span>
                  </div>
                </div>

                {/* Active Application Status */}
                <div className="bg-blue-50/70 p-3 rounded border border-blue-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-900 block">Active Application Draft</span>
                    <span className="font-bold text-slate-900 text-xs">Ref: GA-2026-001245</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate("/applications")}
                    className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
                  >
                    View Status →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Core Value Section — Clean Grid Layout (NO Huge Floating Cards) */}
      <section className="py-12 bg-slate-50 border-b border-slate-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Designed to Eliminate Cyber Café Friction
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Millions of aspirants waste days at internet kiosks retyping basic data and struggling with photo resizers. GovApply streamlines the complete process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="bg-white border border-slate-200 rounded p-5 space-y-2.5 shadow-2xs">
              <div className="w-9 h-9 rounded bg-blue-50 text-[#0B2546] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">One-Time Profile</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Save your personal, contact, category, and complete academic records once. Never re-type board marks or roll numbers again.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white border border-slate-200 rounded p-5 space-y-2.5 shadow-2xs">
              <div className="w-9 h-9 rounded bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Documents In One Place</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keep your passport photograph, signature, Aadhaar, and degree certificates formatted and stored according to commission guidelines.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white border border-slate-200 rounded p-5 space-y-2.5 shadow-2xs">
              <div className="w-9 h-9 rounded bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Live Eligibility Check</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instantly check whether you meet qualification, cutoff age, category relaxation, and document readiness before starting any form.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white border border-slate-200 rounded p-5 space-y-2.5 shadow-2xs">
              <div className="w-9 h-9 rounded bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">Faster Applications</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate pre-filled application drafts in 5 simple steps for just ₹40. Review each section carefully before final submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — Connected 4-Step Timeline Layout */}
      <section id="how-it-works" className="py-12 lg:py-16 bg-white border-b border-slate-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How GovApply Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              A transparent workflow built for Indian students and public job seekers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="text-left space-y-2.5 relative">
              <div className="w-10 h-10 rounded-full bg-[#0B2546] text-white flex items-center justify-center text-sm font-bold">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Create Candidate Profile</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your identity particulars, address, 10th/12th/Degree qualifications and category information once.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-left space-y-2.5 relative">
              <div className="w-10 h-10 rounded-full bg-[#0B2546] text-white flex items-center justify-center text-sm font-bold">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Upload Documents</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload your photograph, signature, and certificates. Our engine verifies size and format compliance.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-left space-y-2.5 relative">
              <div className="w-10 h-10 rounded-full bg-[#0B2546] text-white flex items-center justify-center text-sm font-bold">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Find Eligible Jobs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse government exam notifications. See immediate green/amber indicators showing matching criteria.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-left space-y-2.5 relative">
              <div className="w-10 h-10 rounded-full bg-[#0B2546] text-white flex items-center justify-center text-sm font-bold">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">Review & Apply (₹40)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Auto-generate an application draft with pre-attached documents. Review every field, confirm, and lodge your form.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate("/jobs")}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start By Exploring Open Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Table / Notice Section */}
      <section className="py-12 bg-slate-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Current Opportunities
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Featured Public Exam Notifications
              </h2>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate("/jobs")}
              className="text-xs font-semibold"
            >
              View All Notifications ({sampleJobs.length})
            </Button>
          </div>

          {/* Simple Structured Jobs Table for Quick Scanning */}
          <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100/70 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Recruitment Exam</th>
                    <th className="p-3">Agency</th>
                    <th className="p-3">Vacancies</th>
                    <th className="p-3">Qualification</th>
                    <th className="p-3">Last Date</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sampleJobs.slice(0, 4).map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3">
                        <p className="font-bold text-slate-900 text-xs">{job.title}</p>
                        <p className="text-[11px] text-slate-500">{job.department}</p>
                      </td>
                      <td className="p-3">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold text-[11px] border border-slate-200">
                          {job.agency}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        {job.totalVacancies.toLocaleString("en-IN")}
                      </td>
                      <td className="p-3 text-slate-700">{job.qualificationRequired}</td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-900">{job.lastDate}</span>
                        {job.isClosingSoon && (
                          <span className="text-[10px] text-amber-700 block font-medium">Closing Soon</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => onNavigate(`/jobs/${job.id}`)}
                          className="font-semibold text-[#0B2546] hover:underline cursor-pointer"
                        >
                          Check Match →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
