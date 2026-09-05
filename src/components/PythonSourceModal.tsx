import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  Terminal,
  FileCode,
  X,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { pythonStreamlitCode } from '../data/pythonStreamlitSource';

interface PythonSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadCode: () => void;
}

export const PythonSourceModal: React.FC<PythonSourceModalProps> = ({
  isOpen,
  onClose,
  onDownloadCode,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonStreamlitCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Mã Nguồn Python Streamlit (app.py)
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready to Run
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Dashboard giám sát 3 cột: Địa chính, Dự án DT15, Sàn dữ liệu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="modal-copy-btn"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sao chép mã</span>
                </>
              )}
            </button>

            <button
              id="modal-download-btn"
              onClick={onDownloadCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file app.py</span>
            </button>

            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick run command instructions */}
        <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-mono text-slate-400">
              <span className="text-emerald-400">$</span> pip install streamlit plotly pandas numpy && streamlit run app.py
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Python 3.9+</span>
            <span>•</span>
            <span>Streamlit 1.30+</span>
            <span>•</span>
            <span>Plotly Express & Graph Objects</span>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed custom-scrollbar">
          <pre className="selection:bg-indigo-500/30 selection:text-white">
            <code>{pythonStreamlitCode}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-400" />
            File <code className="text-indigo-300">app.py</code> đã được tạo sẵn trong thư mục gốc của dự án.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
