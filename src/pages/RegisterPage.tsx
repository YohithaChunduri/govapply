import React, { useState } from "react";
import { ShieldCheck, ArrowRight, User, Mail, Phone, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register, verifyOtp, isLoading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [error, setError] = useState("");

  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(30);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !mobile.trim()) {
      setError("Please fill in all mandatory fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters in length.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }
    if (!termsAgreed) {
      setError("Please accept the Terms of Service to register.");
      return;
    }

    const res = await register({ fullName, email, mobile });
    if (res.requiresOtp) {
      setShowOtpModal(true);
      setOtpCountdown(30);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    if (otpCode.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP received.");
      return;
    }

    const success = await verifyOtp(otpCode);
    if (success) {
      setShowOtpModal(false);
      onNavigate("/onboarding");
    } else {
      setOtpError("Invalid verification code. Use demo OTP 123456.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#0B2546] text-white font-bold text-sm mb-2 shadow-xs">
            GA
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Candidate Account</h1>
          <p className="text-xs text-slate-500">
            Store your details once and streamline government job applications.
          </p>
        </div>

        <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs text-left">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Candidate Full Name (As per 10th Certificate)"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rajesh Kumar Sharma"
              leftIcon={<User className="w-4 h-4" />}
              autoComplete="name"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                leftIcon={<Mail className="w-4 h-4" />}
                autoComplete="email"
                required
              />

              <Input
                label="Mobile Number (+91)"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9876543210"
                leftIcon={<Phone className="w-4 h-4" />}
                autoComplete="tel"
                maxLength={10}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Create Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                leftIcon={<Lock className="w-4 h-4" />}
                autoComplete="new-password"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                leftIcon={<Lock className="w-4 h-4" />}
                autoComplete="new-password"
                required
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#0B2546] focus:ring-[#0B2546]"
              />
              <span>
                I agree to the Terms of Service & Privacy Policy. I confirm all information entered matches my official identification documents.
              </span>
            </label>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-bold text-sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Verify Mobile & Create Account
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={() => onNavigate("/login")}
              className="font-bold text-[#0B2546] hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Candidate Data Stored in Compliance with Digital Personal Data Protection Act</span>
        </div>
      </div>

      {/* Realistic OTP Verification Modal */}
      <Modal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        title="Verify Mobile & Email"
        subtitle={`One-Time Password (OTP) sent to +91 ${mobile || "9876543210"}`}
        maxWidth="sm"
      >
        <form onSubmit={handleVerifyOtp} className="space-y-4 text-left">
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded text-xs text-blue-900 space-y-1">
            <p className="font-semibold">Evaluation Mode Hint:</p>
            <p>
              Enter demo OTP <strong className="font-mono text-slate-900 text-sm">123456</strong> to verify and immediately begin onboarding.
            </p>
          </div>

          {otpError && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800">
              {otpError}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Enter 6-Digit Verification Code
            </label>
            <input
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="w-full text-center tracking-[0.5em] text-lg font-mono font-bold py-2.5 border border-slate-300 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2546]"
              autoFocus
              required
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Resend OTP in 00:{otpCountdown < 10 ? `0${otpCountdown}` : otpCountdown}</span>
            <button
              type="button"
              disabled={otpCountdown > 0}
              onClick={() => setOtpCountdown(30)}
              className="text-[#0B2546] font-semibold hover:underline disabled:opacity-40"
            >
              Resend Code
            </button>
          </div>

          <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="w-full">
            Confirm & Proceed to Profile Setup
          </Button>
        </form>
      </Modal>
    </div>
  );
};
