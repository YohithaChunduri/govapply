import React, { useState } from "react";
import { FolderOpen, Upload, ShieldCheck, CheckCircle2, AlertTriangle, FileText, Eye, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DocumentRow } from "../components/documents/DocumentRow";
import { DocumentUploadModal } from "../components/documents/DocumentUploadModal";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import { StoredDocument } from "../types";

interface DocumentsPageProps {
  onNavigate: (path: string) => void;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({ onNavigate }) => {
  const { user, addDocument, removeDocument, replaceDocument } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Document Preview Modal State
  const [viewingDoc, setViewingDoc] = useState<StoredDocument | null>(null);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Please Sign In to Access Document Vault</h2>
        <p className="text-xs text-slate-500">Sign in to manage and review your stored application documents.</p>
        <Button variant="primary" size="sm" onClick={() => onNavigate("/login")}>
          Go to Sign In
        </Button>
      </div>
    );
  }

  const documents = user.documents;

  const filteredDocs =
    selectedCategory === "all"
      ? documents
      : documents.filter((d) => d.category === selectedCategory);

  const categories = [
    { id: "all", label: "All Documents", count: documents.length },
    { id: "identity", label: "Identity Proof", count: documents.filter((d) => d.category === "identity").length },
    { id: "education", label: "Education Credentials", count: documents.filter((d) => d.category === "education").length },
    { id: "application", label: "Application Assets (Photo / Sign)", count: documents.filter((d) => d.category === "application").length },
    { id: "reservation", label: "Category & Domicile", count: documents.filter((d) => d.category === "reservation").length },
  ];

  const handleReplace = (doc: StoredDocument) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const sizeInKb = (file.size / 1024).toFixed(0);
        replaceDocument(doc.id, file.name, `${sizeInKb} KB`);
      }
    };
    input.click();
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 text-left space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#0B2546] text-white">
              Candidate Credential Vault
            </span>
            <span className="text-xs text-slate-500 font-medium">Auto-Attached to Applications</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Document Management Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Store verified copies of identity, educational certificates, and biometric assets formatted to official specifications.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsUploadModalOpen(true)}
          leftIcon={<Upload className="w-4 h-4" />}
          className="shrink-0 text-xs font-semibold"
        >
          Upload New Document
        </Button>
      </div>

      {/* Official Specification Standards Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded p-4 text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Government Portal Document Standards & Validation Rules</span>
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          • <strong>Photograph:</strong> 20 KB to 50 KB, JPEG format, 3.5cm x 4.5cm, plain white background, sharp contrast. <br />
          • <strong>Signature:</strong> 10 KB to 20 KB, JPEG format, 4.0cm x 2.0cm, black ink on white paper, no capital running letters. <br />
          • <strong>Certificates (10th / Degree / Caste):</strong> PDF format, 100 KB to 2 MB, clear scanned resolution showing authority stamp.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? "bg-[#0B2546] text-white font-semibold"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                selectedCategory === cat.id ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded p-8 text-center text-xs text-slate-500">
            No documents found in this category. Click "Upload New Document" to add one.
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <DocumentRow
              key={doc.id}
              document={doc}
              onView={(d) => setViewingDoc(d)}
              onReplace={handleReplace}
              onDelete={(id) => {
                if (window.confirm("Are you sure you want to delete this document from your vault?")) {
                  removeDocument(id);
                }
              }}
            />
          ))
        )}
      </div>

      {/* Document Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={(docData) => addDocument(docData)}
      />

      {/* Document Viewer Modal */}
      {viewingDoc && (
        <Modal
          isOpen={!!viewingDoc}
          onClose={() => setViewingDoc(null)}
          title={viewingDoc.name}
          subtitle={`Vault File: ${viewingDoc.fileName} (${viewingDoc.fileSize})`}
          maxWidth="md"
        >
          <div className="space-y-4 text-left text-xs">
            {/* Spec metadata */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Document Type:</span>
                <span className="font-semibold text-slate-900 uppercase">{viewingDoc.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">File Size:</span>
                <span className="font-mono text-slate-900">{viewingDoc.fileSize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Upload Date:</span>
                <span className="text-slate-900">{viewingDoc.uploadDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Gov Specification:</span>
                <span className="font-medium text-slate-800 text-[11px]">{viewingDoc.specRequirement}</span>
              </div>
            </div>

            {/* Document Visual Mock/Preview */}
            <div className="border border-slate-300 rounded p-6 bg-slate-100 flex flex-col items-center justify-center text-center space-y-2">
              <FileText className="w-12 h-12 text-slate-400" />
              <p className="font-bold text-slate-800 text-sm">{viewingDoc.fileName}</p>
              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                ✓ Verified Against Commission Pixel & Byte Specification
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="secondary" size="sm" onClick={() => setViewingDoc(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
