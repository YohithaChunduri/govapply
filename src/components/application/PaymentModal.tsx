import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { ShieldCheck, QrCode, CreditCard, Building2, CheckCircle2 } from "lucide-react";
import { ApplicationDraft } from "../../types";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: ApplicationDraft;
  onPaymentSuccess: (paymentMethod: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  application,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const methodLabel =
        selectedMethod === "upi"
          ? "UPI (Google Pay / PhonePe)"
          : selectedMethod === "card"
          ? "Debit / RuPay Card"
          : "Net Banking (SBI)";
      onPaymentSuccess(methodLabel);
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Application Service Fee Checkout"
      subtitle={`Application Ref: ${application.trackingNumber} • ${application.jobTitle}`}
      maxWidth="md"
    >
      <div className="space-y-4 text-left">
        {/* Transparent Cost Breakdown */}
        <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs space-y-2.5">
          <div className="flex items-center justify-between font-medium text-slate-700">
            <span>GovApply Application Assistance & Spec Verification</span>
            <span className="font-mono text-slate-900 font-bold">₹40.00</span>
          </div>

          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Official Examination Application Fee (Direct to Commission)</span>
            <span className="font-mono">
              {application.applicationFee === 0 ? "Exempted (SC/ST/Women)" : `₹${application.applicationFee}.00`}
            </span>
          </div>

          <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-sm font-bold text-slate-900">
            <span>Total Payable to GovApply Platform</span>
            <span className="font-mono text-base text-[#0B2546]">₹40.00</span>
          </div>
          <p className="text-[10px] text-slate-500">
            *Fixed nominal platform charge covering document formatting, eligibility audit, and draft generation.
          </p>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Select Payment Option
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedMethod("upi")}
              className={`p-3 rounded border text-left flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                selectedMethod === "upi"
                  ? "bg-blue-50/60 border-[#0B2546] text-[#0B2546] font-semibold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <QrCode className="w-5 h-5" />
              <span className="text-xs">UPI / QR</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod("card")}
              className={`p-3 rounded border text-left flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                selectedMethod === "card"
                  ? "bg-blue-50/60 border-[#0B2546] text-[#0B2546] font-semibold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-xs">Debit / Card</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod("netbanking")}
              className={`p-3 rounded border text-left flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                selectedMethod === "netbanking"
                  ? "bg-blue-50/60 border-[#0B2546] text-[#0B2546] font-semibold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="text-xs">Net Banking</span>
            </button>
          </div>
        </div>

        {/* Payment Method Details */}
        {selectedMethod === "upi" && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-center space-y-2">
            <div className="w-28 h-28 mx-auto bg-white border border-slate-300 rounded p-2 flex flex-col items-center justify-center">
              <QrCode className="w-20 h-20 text-slate-800" />
              <span className="text-[8px] text-slate-500 font-mono mt-0.5">govapply@upi</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Scan using any UPI App: Google Pay, PhonePe, Paytm, BHIM or enter UPI ID
            </p>
          </div>
        )}

        {selectedMethod === "card" && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
            <p className="font-semibold text-slate-800">RuPay / Visa / MasterCard Debit Cards</p>
            <p className="text-[11px] text-slate-500">
              Zero surcharge on RuPay Debit Cards under Government Digital India guidelines.
            </p>
          </div>
        )}

        {selectedMethod === "netbanking" && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
            <p className="font-semibold text-slate-800">All Major Indian Public & Private Banks</p>
            <p className="text-[11px] text-slate-500">SBI, Punjab National Bank, Canara Bank, HDFC, ICICI, etc.</p>
          </div>
        )}

        {/* Security Badge */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>PCI-DSS Compliant & Secured with 256-bit TLS Encryption. Receipt emailed instantly.</span>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col gap-2">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSimulatePayment}
            isLoading={isProcessing}
            className="w-full text-sm font-bold"
          >
            Pay ₹40 & Lodge Application
          </Button>

          <Button variant="ghost" size="sm" onClick={onClose} className="w-full text-xs">
            Cancel and Return to Review
          </Button>
        </div>
      </div>
    </Modal>
  );
};
