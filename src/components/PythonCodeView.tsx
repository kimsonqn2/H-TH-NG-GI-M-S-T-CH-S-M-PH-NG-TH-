import React, { useState } from 'react';
import {
  FileCode,
  Copy,
  Check,
  Download,
  Terminal,
  Play,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { pythonStreamlitCode } from '../data/pythonStreamlitSource';

interface PythonCodeViewProps {
  onDownloadCode: () => void;
  onSwitchToDashboard: () => void;
}

export const PythonCodeView: React.FC<PythonCodeViewProps> = ({
  onDownloadCode,
  onSwitchToDashboard,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonStreamlitCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Python 3 • Streamlit • Plotly
            </span>
            <span className="text-xs text-slate-400">File: app.py</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Mã Nguồn Streamlit: Dashboard Giám Sát Mô Phỏng Đô Thị
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
            Bố cục chuẩn 3 cột (<code className="text-indigo-300 font-mono">st.columns(3)</code>), tích hợp bộ lọc thời gian ở Sidebar, biểu đồ Plotly tương tác và theo dõi đồng thời 3 phân hệ đô thị.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="codeview-copy-btn"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Sao chép mã</span>
              </>
            )}
          </button>

          <button
            id="codeview-download-btn"
            onClick={onDownloadCode}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Tải app.py</span>
          </button>

          <button
            id="codeview-back-dashboard-btn"
            onClick={onSwitchToDashboard}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>Xem Dashboard</span>
          </button>
        </div>
      </div>

      {/* Terminal instruction card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-bold">
              1
            </span>
            Cài đặt các thư viện cần thiết
          </div>
          <div className="bg-slate-900 rounded-lg p-2 font-mono text-[11px] text-slate-200 flex items-center justify-between">
            <code>pip install streamlit plotly pandas numpy</code>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-bold">
              2
            </span>
            Khởi chạy ứng dụng Streamlit
          </div>
          <div className="bg-slate-900 rounded-lg p-2 font-mono text-[11px] text-slate-200 flex items-center justify-between">
            <code>streamlit run app.py</code>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold">
              3
            </span>
            Truy cập trình duyệt tự động
          </div>
          <div className="bg-slate-900 rounded-lg p-2 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
            <code>http://localhost:8501</code>
          </div>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        {/* Editor bar */}
        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="text-slate-400 font-mono text-xs pl-2">app.py — Python 3.9+</span>
          </div>

          <span className="text-slate-500 text-xs font-mono">Bố cục 3 Cột • Sidebar Lọc Thời Gian</span>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 overflow-auto max-h-[650px] font-mono text-xs text-slate-300 leading-relaxed custom-scrollbar">
          <pre>
            <code>{pythonStreamlitCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
