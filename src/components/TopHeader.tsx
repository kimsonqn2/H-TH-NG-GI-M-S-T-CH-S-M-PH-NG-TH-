import React from 'react';
import {
  FileCheck2,
  Radio,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Download,
  Share2,
} from 'lucide-react';
import { SimulationOverviewMetrics, TimeRangeOption } from '../types';

interface TopHeaderProps {
  metrics: SimulationOverviewMetrics;
  timeRange: TimeRangeOption;
  selectedDistrict: string;
  onOpenPythonModal: () => void;
  onExportData: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  metrics,
  timeRange,
  selectedDistrict,
  onOpenPythonModal,
  onExportData,
}) => {
  const districtNameMap: Record<string, string> = {
    all: 'Toàn thành phố',
    'thu-duc': 'TP. Thủ Đức',
    q1: 'Quận 1',
    'binh-thanh': 'Quận Bình Thạnh',
    q7: 'Quận 7',
    'binh-chanh': 'Huyện Bình Chánh',
  };

  const timeRangeNameMap: Record<TimeRangeOption, string> = {
    today: 'Hôm nay (Thời gian thực)',
    '7d': '7 ngày gần nhất',
    '30d': '30 ngày qua',
    quarter: 'Quý III / 2026',
    custom: 'Khoảng thời gian tùy chỉnh',
  };

  const progressCadastral = (
    (metrics.totalCadastralCompleted / metrics.totalCadastralTarget) *
    100
  ).toFixed(1);

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              Streamlit Architecture
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {timeRangeNameMap[timeRange]} • {districtNameMap[selectedDistrict] || 'Toàn thành phố'}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Hệ Thống Giám Sát Chỉ Số Mô Phỏng Đô Thị
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Bảng điều khiển 3 phân hệ: Tiến độ số hóa địa chính, Lưu lượng hạ tầng DT15, và Hoạt động sàn dữ liệu
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="btn-view-python-source"
            onClick={onOpenPythonModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Mã Python (Streamlit)</span>
          </button>

          <button
            id="btn-export-csv"
            onClick={onExportData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-300"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards (st.columns(4)) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span className="flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              Số hóa Hồ sơ Địa chính
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-mono">
              OCR AI
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{progressCadastral}%</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +2.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {metrics.totalCadastralCompleted.toLocaleString('vi-VN')} /{' '}
            {metrics.totalCadastralTarget.toLocaleString('vi-VN')} hồ sơ
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span className="flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-indigo-600" />
              Thông lượng Dự án DT15
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-mono">
              Live Stream
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{metrics.dt15CurrentBandwidthMBps} MB/s</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +34.2 MB/s
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Tổng tích lũy: {metrics.dt15TotalDataVolumeTB} TB dữ liệu số
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 hover:border-violet-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-violet-600" />
              Giao dịch Sàn Dữ liệu
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 font-mono">
              24h
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">
              {metrics.exchangeDailyTransactions.toLocaleString('vi-VN')}
            </span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +12.8%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Khớp lệnh chia sẻ & thương mại hóa
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sức khỏe Hệ thống (SLA)
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-mono">
              Uptime
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">{metrics.exchangeSystemUptime}%</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              Ổn định
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Độ chính xác kiểm định: {metrics.aiVerificationAccuracy}%
          </p>
        </div>
      </div>
    </header>
  );
};
