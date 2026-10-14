import React, { useState } from "react";
import { ShieldCheck, ArrowRight, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

interface ForgotPasswordPageProps {
  onNavigate: (path: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const [identifier, setIdentifier] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#0B2546] text-white font-bold text-sm mb-2 shadow-xs">
            GA
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reset Password</h1>
          <p className="text-xs text-slate-500">
            Recover access to your candidate dossier and applications.
          </p>
        </div>

        <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs text-left">
          {submitted ? (
            <div className="text-center space-y-4 py-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Password Reset Link Sent</h3>
                <p className="text-xs text-slate-600">
                  If an account exists for <strong className="text-slate-800">{identifier}</strong>, we have sent password reset instructions and an OTP.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate("/login")}
                className="w-full text-xs font-semibold"
              >
                Back to Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email or Mobile (+91)"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. rajesh.sharma@example.com"
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full font-bold text-sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Send Password Reset Instructions
              </Button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => onNavigate("/login")}
              className="text-xs text-[#0B2546] font-semibold hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
