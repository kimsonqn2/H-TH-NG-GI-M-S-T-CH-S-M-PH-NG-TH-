import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  ScanLine,
  TrendingUp,
  PieChart as PieIcon,
  ChevronRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { CadastralDistrictProgress, CadastralTimelinePoint } from '../types';

interface CadastralColumnProps {
  districts: CadastralDistrictProgress[];
  timeline: CadastralTimelinePoint[];
  totalTarget: number;
  totalCompleted: number;
}

const LAND_TYPE_DATA = [
  { name: 'Đất ở đô thị', value: 520000, color: '#2563eb' },
  { name: 'Đất nông nghiệp', value: 410000, color: '#10b981' },
  { name: 'Thương mại - Dịch vụ', value: 219000, color: '#f59e0b' },
  { name: 'Hạ tầng & Công cộng', value: 120000, color: '#64748b' },
];

export const CadastralColumn: React.FC<CadastralColumnProps> = ({
  districts,
  timeline,
  totalTarget,
  totalCompleted,
}) => {
  const percent = ((totalCompleted / totalTarget) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col p-4 space-y-4">
      {/* Column Header */}
      <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              Số Hóa Hồ Sơ Địa Chính
            </h2>
            <p className="text-[11px] text-slate-500">Giám sát tiến trình số hóa bản đồ & GCN</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
          Cột 1
        </span>
      </div>

      {/* Main Overall Progress Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <ScanLine className="w-3.5 h-3.5 text-blue-600" />
            Tiến độ hoàn thành toàn đô thị
          </span>
          <span className="font-bold text-blue-600 font-mono text-sm">{percent}%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <span>Đã xử lý: {totalCompleted.toLocaleString('vi-VN')} hồ sơ</span>
          <span>Mục tiêu: {totalTarget.toLocaleString('vi-VN')}</span>
        </div>
      </div>

      {/* Chart 1: Sản lượng số hóa hàng ngày */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            Sản lượng số hóa theo mốc thời gian
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Hồ sơ / ngày</span>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="timeLabel" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '11px',
                }}
                formatter={(val: number) => [`${val.toLocaleString('vi-VN')} hồ sơ`]}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
                iconType="circle"
              />
              <Bar dataKey="scanned" name="Quét & OCR" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="verified" name="Kiểm định pháp lý" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Donut Phân loại cơ cấu loại đất */}
      <div className="space-y-1.5 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <PieIcon className="w-3.5 h-3.5 text-indigo-600" />
            Cơ cấu loại đất đã số hóa
          </h3>
        </div>

        <div className="grid grid-cols-5 items-center gap-2">
          <div className="col-span-3 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LAND_TYPE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={58}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {LAND_TYPE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                  formatter={(val: number) => [`${val.toLocaleString('vi-VN')} hồ sơ`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-2 space-y-1 text-[11px]">
            {LAND_TYPE_DATA.map((item) => (
              <div key={item.name} className="flex flex-col leading-tight">
                <div className="flex items-center gap-1 text-slate-600">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-800 font-mono pl-3 text-[10px]">
                  {((item.value / 1269000) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District Progress Table */}
      <div className="space-y-2 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-800">Tiến độ theo địa bàn trọng điểm</h3>
          <span className="text-[10px] text-slate-400">6 quận / huyện</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-52 overflow-y-auto pr-1 text-xs">
          {districts.map((d) => (
            <div key={d.district} className="py-2 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 truncate text-[11px]">{d.district}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        d.percentage > 90
                          ? 'bg-emerald-500'
                          : d.percentage > 80
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${d.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{d.percentage}%</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-600 block">
                  {d.digitizedRecords.toLocaleString('vi-VN')}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                    d.status === 'optimal'
                      ? 'bg-emerald-50 text-emerald-700'
                      : d.status === 'in_progress'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {d.status === 'optimal' ? 'Đạt chỉ tiêu' : d.status === 'in_progress' ? 'Đang số hóa' : 'Cần đẩy nhanh'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech specs footer note */}
      <div className="mt-auto pt-2 bg-blue-50/50 rounded-lg p-2.5 border border-blue-100 text-[11px] text-slate-600 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium text-blue-900">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          OCR AI trích xuất chính xác 99.4%
        </span>
        <span className="text-[10px] text-slate-500 font-mono">1.2s/hồ sơ</span>
      </div>
    </div>
  );
};
