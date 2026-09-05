import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Layers,
  ArrowUpRight,
  Database,
  Lock,
  ServerCrash,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import {
  DataExchangeTransactionPoint,
  TopDataset,
  ExchangeNodeHealth,
} from '../types';

interface DataExchangeColumnProps {
  transactions: DataExchangeTransactionPoint[];
  topDatasets: TopDataset[];
  nodeHealth: ExchangeNodeHealth[];
  totalTx: number;
}

export const DataExchangeColumn: React.FC<DataExchangeColumnProps> = ({
  transactions,
  topDatasets,
  nodeHealth,
  totalTx,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col p-4 space-y-4">
      {/* Column Header */}
      <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 text-violet-600 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              Sàn Giao Dịch Dữ Liệu
            </h2>
            <p className="text-[11px] text-slate-500">Giám sát khớp lệnh & lưu thông dữ liệu đô thị</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
          Cột 3
        </span>
      </div>

      {/* Main Exchange Health Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-violet-600" />
            Trạng thái Sàn giao dịch
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Hoạt động thông suốt
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
              {totalTx.toLocaleString('vi-VN')}
            </span>
            <span className="text-xs font-semibold text-slate-500 ml-1">lệnh khớp</span>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            <span>Uptime dịch vụ: </span>
            <span className="font-semibold text-emerald-600 font-mono">99.98%</span>
          </div>
        </div>

        {/* Quick status counters */}
        <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px]">
          <div className="bg-white border border-slate-200 rounded px-2 py-1 text-center">
            <span className="text-slate-400 block">Dung lượng bán</span>
            <span className="font-bold text-violet-600 font-mono">4.2 TB</span>
          </div>
          <div className="bg-white border border-slate-200 rounded px-2 py-1 text-center">
            <span className="text-slate-400 block">API Queries</span>
            <span className="font-bold text-blue-600 font-mono">1.2M lượt</span>
          </div>
          <div className="bg-white border border-slate-200 rounded px-2 py-1 text-center">
            <span className="text-slate-400 block">Tỷ lệ thành công</span>
            <span className="font-bold text-emerald-600 font-mono">99.97%</span>
          </div>
        </div>
      </div>

      {/* Chart 1: Lệnh khớp & Lưu lượng trao đổi (Bar Chart) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-violet-600" />
            Lệnh khớp dữ liệu theo khung giờ
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Lượt khớp lệnh</span>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transactions} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                formatter={(val: number) => [`${val.toLocaleString('vi-VN')} lệnh khớp`]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} iconType="circle" />
              <Bar dataKey="transactions" name="Lệnh giao dịch thành công" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Microservice health & SLA */}
      <div className="space-y-2 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Sức khỏe Hạ tầng Dịch vụ Sàn
          </h3>
          <span className="text-[10px] text-emerald-600 font-mono">Tất cả bình thường</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {nodeHealth.map((node) => (
            <div
              key={node.service}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="text-[10px] font-semibold text-slate-800 truncate flex-1 pl-1">
                  {node.service.split('(')[0]}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/50">
                <span className="font-mono text-emerald-600">{node.latency}ms</span>
                <span className="font-mono text-slate-600">{node.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Datasets Table */}
      <div className="space-y-2 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-800">Top tập dữ liệu giao dịch nhiều nhất</h3>
          <span className="text-[10px] text-slate-400">24 giờ qua</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1 text-xs">
          {topDatasets.map((ds) => (
            <div key={ds.id} className="py-2 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 truncate text-[11px]">{ds.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400 truncate">{ds.category}</span>
                  <span className="text-[10px] text-blue-600 font-mono font-medium">
                    {ds.queries24h.toLocaleString('vi-VN')} lượt
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] font-bold text-slate-800 font-mono block">
                  {ds.volumeGB} GB
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-medium bg-emerald-50 text-emerald-700">
                  Khớp ngay
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Contract / Security note */}
      <div className="mt-auto pt-2 bg-violet-50/50 rounded-lg p-2.5 border border-violet-100 text-[11px] text-slate-600 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium text-violet-950">
          <Lock className="w-3.5 h-3.5 text-violet-600" />
          Hợp đồng chia sẻ dữ liệu mã hóa AES-256
        </span>
        <span className="text-[10px] text-slate-500 font-mono">100% Verify</span>
      </div>
    </div>
  );
};
