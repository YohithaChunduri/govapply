import React, { useState } from "react";
import { Upload, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { StoredDocument } from "../../types";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (doc: Omit<StoredDocument, "id" | "uploadDate">) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [docCategory, setDocCategory] = useState<"identity" | "education" | "application" | "reservation">("identity");
  const [docName, setDocName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const documentTypeOptions = [
    { value: "Aadhaar Card (Front & Back)", category: "identity", spec: "PDF / JPG, Max 1 MB" },
    { value: "Passport Photograph", category: "application", spec: "JPEG, 20 KB to 50 KB, White background" },
    { value: "Digital Signature", category: "application", spec: "JPEG, 10 KB to 20 KB, Black ink" },
    { value: "Class X Certificate & Marksheet", category: "education", spec: "PDF, Max 2 MB (DOB Proof)" },
    { value: "Class XII Passing Certificate", category: "education", spec: "PDF, Max 2 MB" },
    { value: "Degree / Diploma Certificate", category: "education", spec: "PDF, Max 2 MB" },
    { value: "Category / Caste Certificate (OBC/SC/ST/EWS)", category: "reservation", spec: "PDF, Central/State Govt format" },
    { value: "Domicile Certificate", category: "reservation", spec: "PDF, Max 2 MB" },
  ];

  const handleTypeSelect = (name: string) => {
    setDocName(name);
    const match = documentTypeOptions.find((o) => o.value === name);
    if (match) {
      setDocCategory(match.category as any);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Government spec checks
      if (docName === "Passport Photograph") {
        if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
          setValidationError("Passport photo must be in JPEG/JPG format.");
          return;
        }
        if (file.size > 100 * 1024) {
          setValidationError("Photo exceeds 100 KB limit. Recommended size is 20 KB - 50 KB.");
          return;
        }
      }

      if (docName === "Digital Signature") {
        if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
          setValidationError("Signature must be in JPEG/JPG format.");
          return;
        }
        if (file.size > 50 * 1024) {
          setValidationError("Signature exceeds 50 KB limit. Recommended size is 10 KB - 20 KB.");
          return;
        }
      }

      if (file.size > 5 * 1024 * 1024) {
        setValidationError("File size exceeds 5 MB portal limit.");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) {
      setValidationError("Please select or enter document title.");
      return;
    }
    if (!selectedFile) {
      setValidationError("Please select a file to upload.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const match = documentTypeOptions.find((o) => o.value === docName);
      const spec = match ? match.spec : "Standard Government File Spec";

      const sizeInKb = (selectedFile.size / 1024).toFixed(0);

      onUploadSuccess({
        category: docCategory,
        name: docName,
        fileName: selectedFile.name,
        fileSize: `${sizeInKb} KB`,
        status: "verified",
        specRequirement: spec,
      });

      setIsSubmitting(false);
      onClose();
      setSelectedFile(null);
      setDocName("");
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Document to Vault"
      subtitle="Standardized for automatic attachment to official job applications"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Document Preset Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Document Category / Requirement <span className="text-rose-600">*</span>
          </label>
          <select
            value={docName}
            onChange={(e) => handleTypeSelect(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded px-3 py-2 bg-white text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2546]"
            required
          >
            <option value="">-- Select Standard Document --</option>
            {documentTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.value} ({opt.category.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* Custom Name Override if needed */}
        <Input
          label="Document Name / Description"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          placeholder="e.g., Degree Certificate, Aadhaar Card"
          required
        />

        {/* File Picker Zone */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Select Scanned File <span className="text-rose-600">*</span>
          </label>
          <div className="border-2 border-dashed border-slate-300 rounded p-5 text-center hover:border-slate-400 bg-slate-50/50 transition-colors">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <div className="space-y-1">
              <label
                htmlFor="file-upload"
                className="inline-block px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-800 hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                Choose Local File
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <p className="text-[11px] text-slate-500">
                PDF or JPEG accepted. Max size: 2MB (Certificates) / 50KB (Photo).
              </p>
            </div>

            {selectedFile && (
              <div className="mt-3 p-2.5 bg-white border border-slate-200 rounded flex items-center justify-between text-xs text-slate-800">
                <div className="flex items-center gap-2 font-medium">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                </div>
                <span className="text-slate-500 font-mono">{(selectedFile.size / 1024).toFixed(0)} KB</span>
              </div>
            )}
          </div>
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="flex items-start gap-2 p-2.5 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Specification Advisory */}
        <div className="p-3 bg-blue-50/60 border border-blue-200 rounded text-[11px] text-slate-700 space-y-1">
          <p className="font-semibold text-blue-900 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
            GovApply Automatic Dimension Verification
          </p>
          <p>
            When attached to official applications (SSC, RRB, UPSC), our system ensures the file adheres to strict notification pixels and aspect ratios to prevent cyber café rejection.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <Button variant="secondary" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
            Save to Vault
          </Button>
        </div>
      </form>
    </Modal>
  );
};
