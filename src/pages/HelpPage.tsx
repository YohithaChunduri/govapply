import React, { useState } from "react";
import {
  HelpCircle,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ticketSent, setTicketSent] = useState(false);
  const [queryName, setQueryName] = useState("");
  const [queryEmail, setQueryEmail] = useState("");
  const [queryMsg, setQueryMsg] = useState("");

  const faqs = [
    {
      q: "How does GovApply work?",
      a: "GovApply is an assisted application preparation platform. You register your personal, educational, and category details once, and upload your essential documents (photo, signature, certificates) to your vault. When new exam notifications are released (SSC, RRB, UPSC, IBPS, Police, State PSC), our platform automatically calculates your eligibility, pre-fills the complex application draft, auto-attaches spec-checked documents, and presents a complete summary for your review and confirmation for a flat ₹40 assistance fee.",
    },
    {
      q: "How is eligibility checked?",
      a: "Our eligibility engine reads the crucial cutoff dates, age limits (including category-specific relaxations for OBC-NCL, SC, ST, PwD, and ESM), and minimum educational degrees from each official notification. It instantly compares them against your saved date of birth and degree history to provide green (Eligible), amber (Attention Required), or red (Ineligible) status indicators.",
    },
    {
      q: "Can I edit my information before submission?",
      a: "Yes, absolutely! During Step 1, 2, and 3 of the Application Builder, every pre-filled field is completely editable. If your correspondence address or marks need adjustment for a specific exam, you can edit them directly and choose to update your permanent dossier.",
    },
    {
      q: "What documents do I need to upload?",
      a: "You only need 4 to 5 standard documents: (1) Recent color passport photograph, (2) Digital signature in black ink, (3) Class 10th certificate or marksheet (for date of birth verification), (4) Highest qualifying degree or provisional certificate, and (5) Category / Caste / EWS certificate if claiming reservation benefits. GovApply automatically reformats photos and signatures to meet official pixel and KB specifications.",
    },
    {
      q: "How much does an application cost?",
      a: "GovApply charges a transparent platform service fee of ₹40 per assisted application draft. This covers automatic document formatting, eligibility checking, and error-free form generation. Official examination fees (e.g. ₹100 for SSC or ₹0 for women/SC/ST) are specified separately on each notification.",
    },
    {
      q: "How do I track my application?",
      a: "Every application generated through GovApply receives a unique tracking reference (e.g. GA-2026-001245). You can monitor your application timeline under the 'My Applications' section — from draft preparation to confirmation, lodge timestamp, and upcoming admit card releases.",
    },
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryName || !queryMsg) return;
    setTicketSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 text-left space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Candidate Support & FAQ
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          GovApply Help Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Find clear answers to common questions about eligibility verification, document specifications, and assisted applications.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="bg-white border border-slate-200 rounded-md divide-y divide-slate-200 shadow-xs">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-slate-900 text-sm hover:text-[#0B2546] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />}
              </button>
              {isOpen && (
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Helpline & Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Direct Contact Channels */}
        <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#0B2546]" />
            Official Candidate Helpline
          </h2>
          <p className="text-xs text-slate-600">
            For assistance with cyber centre document verification, payment receipts, or application errors:
          </p>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Toll-Free Phone</span>
                <span className="font-bold text-slate-900 text-sm">1800-572-8921</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-700 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Email Support</span>
                <span className="font-bold text-slate-900 text-sm">support@govapply.in</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center gap-3">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Working Hours</span>
                <span className="font-medium text-slate-800">Monday to Saturday • 09:00 AM – 06:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Ticket Submission Form */}
        <div className="bg-white border border-slate-200 rounded-md p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#0B2546]" />
            Send a Query to Support
          </h2>

          {ticketSent ? (
            <div className="p-6 text-center space-y-2 bg-emerald-50 border border-emerald-200 rounded">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
              <h3 className="text-sm font-bold text-slate-900">Query Lodged Successfully</h3>
              <p className="text-xs text-slate-600">
                Ticket #TK-2026-{Math.floor(1000 + Math.random() * 9000)} created. Our candidate assistance team will reply within 4 business hours.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setTicketSent(false);
                  setQueryMsg("");
                }}
                className="mt-2 text-xs"
              >
                Send Another Query
              </Button>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-3 text-xs">
              <Input
                label="Your Name"
                value={queryName}
                onChange={(e) => setQueryName(e.target.value)}
                placeholder="e.g. Rajesh Sharma"
                required
              />
              <Input
                label="Email / Mobile"
                value={queryEmail}
                onChange={(e) => setQueryEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Describe Your Query / Issue
                </label>
                <textarea
                  rows={3}
                  value={queryMsg}
                  onChange={(e) => setQueryMsg(e.target.value)}
                  placeholder="Mention your application reference or issue with document formatting..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2546]"
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full text-xs font-bold">
                Submit Support Query
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
