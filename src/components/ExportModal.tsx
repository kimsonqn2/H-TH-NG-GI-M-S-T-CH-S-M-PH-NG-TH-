import React, { useState } from 'react';
import {
  Download,
  Check,
  FileSpreadsheet,
  X,
  Copy,
  Layers,
} from 'lucide-react';
import { SimulationOverviewMetrics, TimeRangeOption } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: SimulationOverviewMetrics;
  timeRange: TimeRangeOption;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  metrics,
  timeRange,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const csvContent = `ChiSo,GiaTri,DonVi,MoTa
TienDoSoHoaDiaChinh,${metrics.totalCadastralCompleted},HoSo,So ho so dia chinh da so hoa va quet OCR
TongMucTieuDiaChinh,${metrics.totalCadastralTarget},HoSo,Tong ho so toan do thi
TyLeHoanThanhDiaChinh,${((metrics.totalCadastralCompleted / metrics.totalCadastralTarget) * 100).toFixed(1)},Percent,Ty le % hoan thanh
ThongLuongDT15,${metrics.dt15CurrentBandwidthMBps},MB/s,Bang thong truyen nhan cam bien va GIS DT15
TongDungLuongDT15,${metrics.dt15TotalDataVolumeTB},TB,Tong du lieu tich luy du an DT15
GiaoDichSanDuLieu,${metrics.exchangeDailyTransactions},Luot,So lenh khop giao dich tren san
UptimeSanDuLieu,${metrics.exchangeSystemUptime},Percent,Do san sang he thong SLA
DoChinhXacKiemDinh,${metrics.aiVerificationAccuracy},Percent,Ty le OCR va kiem dinh phap ly tu dong
`;

  const handleDownloadCSV = () => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bao_cao_mo_phong_do_thi_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csvContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Xuất Báo Cáo Chỉ Số Mô Phỏng</h3>
              <p className="text-xs text-slate-500">Định dạng CSV tương thích Excel & GIS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 font-mono text-[11px] text-slate-700 overflow-x-auto max-h-48">
          <pre>{csvContent}</pre>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            {copied ? 'Đã sao chép!' : 'Sao chép CSV'}
          </button>

          <button
            onClick={handleDownloadCSV}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Tải file .csv
          </button>
        </div>
      </div>
    </div>
  );
};
