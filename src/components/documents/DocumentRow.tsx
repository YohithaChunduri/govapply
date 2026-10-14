import React from "react";
import {
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { StoredDocument } from "../../types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface DocumentRowProps {
  document: StoredDocument;
  onView: (doc: StoredDocument) => void;
  onReplace: (doc: StoredDocument) => void;
  onDelete: (docId: string) => void;
}

export const DocumentRow: React.FC<DocumentRowProps> = ({
  document,
  onView,
  onReplace,
  onDelete,
}) => {
  const isImage = document.fileName.endsWith(".jpg") || document.fileName.endsWith(".jpeg") || document.fileName.endsWith(".png");

  return (
    <div className="bg-white border border-slate-200 rounded-md p-3.5 sm:p-4 hover:border-slate-300 transition-colors text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
      <div className="flex items-start gap-3">
        {/* Document Icon */}
        <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
          {isImage ? <ImageIcon className="w-5 h-5 text-blue-600" /> : <FileText className="w-5 h-5 text-slate-600" />}
        </div>

        {/* Details */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900 leading-tight">{document.name}</h4>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded border border-slate-200">
              {document.category}
            </span>
            {document.status === "verified" ? (
              <Badge variant="verified" size="sm">
                <CheckCircle2 className="w-3 h-3" /> Spec Verified
              </Badge>
            ) : document.status === "expiring" ? (
              <Badge variant="warning" size="sm">
                <AlertTriangle className="w-3 h-3" /> Renewal Needed
              </Badge>
            ) : (
              <Badge variant="neutral" size="sm">
                <Clock className="w-3 h-3" /> Uploaded
              </Badge>
            )}
          </div>

          <p className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
            <span className="font-mono text-slate-700">{document.fileName}</span>
            <span>•</span>
            <span>{document.fileSize}</span>
            <span>•</span>
            <span>Uploaded {document.uploadDate}</span>
          </p>

          <p className="text-[11px] text-slate-500 italic">
            Official Spec: {document.specRequirement}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:self-center shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onView(document)}
          leftIcon={<Eye className="w-3.5 h-3.5" />}
          className="text-xs py-1 px-2.5 min-h-[32px]"
        >
          View
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onReplace(document)}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="text-xs py-1 px-2.5 min-h-[32px]"
        >
          Replace
        </Button>

        <button
          type="button"
          onClick={() => onDelete(document.id)}
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
          title="Delete document"
          aria-label="Delete document"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
