import React from "react";
import { ShieldCheck, Phone, Mail, HelpCircle, FileText, CheckCircle2 } from "lucide-react";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800 mt-auto">
      {/* Top Value Assurance Ribbon */}
      <div className="bg-[#071526] border-b border-slate-800 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white text-xs">Standard ₹40 Assistance Fee</p>
              <p className="text-[11px] text-slate-400">Fixed rate per draft. Zero hidden charges or recurring subscriptions.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white text-xs">Spec-Compliant Documents</p>
              <p className="text-[11px] text-slate-400">Photos & signatures formatted to official SSC, UPSC & RRB file size limits.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white text-xs">Single-Dossier Convenience</p>
              <p className="text-[11px] text-slate-400">Fill your academic & personal history once. Avoid repetitive cyber café errors.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white text-xs">Candidate Support Desk</p>
              <p className="text-[11px] text-slate-400">Available Mon-Sat 9AM-6PM IST for application verification queries.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Col 1 & 2: Platform Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-white text-[#0B2546] font-bold flex items-center justify-center text-xs">
                GA
              </div>
              <span className="text-base font-bold text-white tracking-tight">GovApply</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              GovApply is a dedicated digital workflow platform created to help Indian government job aspirants prepare error-free application drafts, verify notification-specific eligibility, and organize identity & academic credentials in a compliant vault.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <p>Registered Office: New Delhi, India</p>
              <p>Candidate Support: support@govapply.in | Helpline: 1800-572-8921</p>
            </div>
          </div>

          {/* Col 3: Recruitment Notices */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Recruitment Portals
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/jobs")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Staff Selection Commission (SSC)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/jobs")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Railway Recruitment Boards (RRB)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/jobs")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Banking Recruitment (IBPS / SBI)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/jobs")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  State Public Service Commissions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/jobs")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Police & Defence Recruitment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Candidate Services
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/documents")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Document Specification Checker
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/dashboard")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Automated Eligibility Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/applications")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Application Draft Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/help")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cyber Café Partner Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/help")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Age & Reservation Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Disclaimers */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Transparency & Trust
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/help")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Statutory Disclaimer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/help")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Data Protection & Privacy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/help")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/help")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Service Fee Policy (₹40)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/help")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Grievance Redressal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Statutory Disclaimer Box */}
        <div className="mt-8 pt-6 border-t border-slate-800 bg-slate-950/60 p-4 rounded border border-slate-800/80">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-200">STATUTORY NOTICE & DISCLAIMER:</strong> GovApply is an independent privately operated technological utility designed to assist individual citizens with profile documentation, eligibility matching, and form draft preparation. GovApply is <strong>NOT</strong> an official government entity, does <strong>NOT</strong> conduct recruitments, and is <strong>NOT</strong> affiliated with UPSC, SSC, IBPS, Railways, NTA, or any Central/State Ministry. Examination trademarks and notification details are cited strictly for informational candidate assistance. Official exam submissions are subject to final scrutiny by respective recruitment boards. All recruitment data shown during prototype evaluation represents sample demo notices.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© 2026 GovApply Technologies India. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built for Indian Job Seekers</span>
            <span>•</span>
            <span>Secured with 256-bit TLS Encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
