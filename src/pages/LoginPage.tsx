import React, { useState } from "react";
import { ShieldCheck, ArrowRight, Lock, User, AlertCircle, KeyRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, loginWithDemo, isLoading } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!identifier.trim()) {
      setError("Please enter your registered email address or mobile number.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your account password.");
      return;
    }

    try {
      await login(identifier, password);
      onNavigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please verify your mobile/email and password.");
    }
  };

  const handleDemoLogin = () => {
    loginWithDemo();
    onNavigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#0B2546] text-white font-bold text-sm mb-2 shadow-xs">
            GA
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Candidate Portal Login</h1>
          <p className="text-xs text-slate-500">
            Sign in to access your stored dossier, document vault, and application drafts.
          </p>
        </div>

        {/* Hackathon Judge One-Click Demo Login Banner */}
        <div className="p-3.5 bg-amber-50 border border-amber-300 rounded text-left text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-amber-800" />
              Evaluation / Demo Shortcut
            </span>
            <span className="text-[10px] uppercase font-bold bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded">
              Judges
            </span>
          </div>
          <p className="text-[11px] text-amber-800 leading-normal">
            To evaluate GovApply with pre-loaded educational credentials, documents, and matching jobs, click below:
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={handleDemoLogin}
            className="w-full text-xs font-semibold bg-amber-800 hover:bg-amber-900 border-amber-900"
          >
            ⚡ One-Click Login as Candidate (Rajesh Sharma)
          </Button>
        </div>

        {/* Standard Credentials Form */}
        <div className="bg-white border border-slate-300 rounded-md p-6 shadow-xs text-left">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Registered Email or Mobile (+91)"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. rajesh.sharma@example.com or 9876543210"
              leftIcon={<User className="w-4 h-4" />}
              autoComplete="username"
              required
            />

            <Input
              label="Account Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your account password"
              leftIcon={<Lock className="w-4 h-4" />}
              autoComplete="current-password"
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#0B2546] focus:ring-[#0B2546]"
                />
                <span>Remember this device</span>
              </label>

              <button
                type="button"
                onClick={() => onNavigate("/forgot-password")}
                className="text-xs text-[#0B2546] font-semibold hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-bold text-sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Candidate Portal
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Don't have a GovApply account? </span>
            <button
              type="button"
              onClick={() => onNavigate("/signup")}
              className="font-bold text-[#0B2546] hover:underline cursor-pointer"
            >
              Register for Free
            </button>
          </div>
        </div>

        {/* Security assurance note */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted with 256-bit TLS • Government Document Security Standard</span>
        </div>
      </div>
    </div>
  );
};
