import React from 'react';
import {
  Radio,
  Wifi,
  Server,
  Activity,
  Cpu,
  ArrowUpRight,
  ShieldAlert,
  Gauge,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { DT15TrafficPoint, DT15GatewayNode } from '../types';

interface DT15TrafficColumnProps {
  trafficSeries: DT15TrafficPoint[];
  gateways: DT15GatewayNode[];
  currentBandwidth: number;
}

export const DT15TrafficColumn: React.FC<DT15TrafficColumnProps> = ({
  trafficSeries,
  gateways,
  currentBandwidth,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col p-4 space-y-4">
      {/* Column Header */}
      <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              Lưu Lượng Dữ Liệu Dự Án DT15
            </h2>
            <p className="text-[11px] text-slate-500">Giám sát luồng thông lượng số hóa đô thị & IoT</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
          Cột 2
        </span>
      </div>

      {/* Main Bandwidth Status Badge */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-indigo-600" />
            Băng thông truyền tải tức thời
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Kết nối ổn định
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
              {currentBandwidth}
            </span>
            <span className="text-xs font-semibold text-slate-500 ml-1">MB/s</span>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            <span>Độ trễ trung bình: </span>
            <span className="font-semibold text-emerald-600 font-mono">18.4 ms</span>
          </div>
        </div>

        {/* Quick category stream badges */}
        <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px]">
          <div className="bg-white border border-slate-200 rounded px-2 py-1 text-center">
            <span className="text-slate-400 block">IoT Sensors</span>
            <span className="font-bold text-sky-600 font-mono">195 MB/s</span>
          </div>
          <div className="bg-white border border-slate-200 rounded px-2 py-1 text-center">
            <span className="text-slate-400 block">GIS 3D Layer</span>
            <span className="font-bold text-indigo-600 font-mono">120 MB/s</span>
          </div>
          <div className="bg-white border border-slate-200 rounded px-2 py-1 text-center">
            <span className="text-slate-400 block">Video AI Đô thị</span>
            <span className="font-bold text-amber-600 font-mono">113 MB/s</span>
          </div>
        </div>
      </div>

      {/* Chart 1: Lưu lượng truyền tải đa luồng (Area Chart) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            Lưu lượng phân loại theo khung thời gian
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">MB/s</span>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIot" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorGis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorCam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
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
                formatter={(val: number) => [`${val} MB/s`]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} iconType="circle" />
              <Area type="monotone" dataKey="iotSensors" name="Cảm biến IoT" stroke="#0284c7" fillOpacity={1} fill="url(#colorIot)" />
              <Area type="monotone" dataKey="gisLayers" name="Dữ liệu GIS 3D" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorGis)" />
              <Area type="monotone" dataKey="trafficCameras" name="Camera Video AI" stroke="#f59e0b" fillOpacity={1} fill="url(#colorCam)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Độ trễ vi mô (Latency Line Chart) */}
      <div className="space-y-1.5 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-cyan-600" />
            Độ trễ truyền nhận vi mô (Edge Latency)
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">ms</span>
        </div>

        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficSeries} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="timeLabel" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[5, 35]} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
                formatter={(val: number) => [`${val} ms`]}
              />
              <Line type="monotone" dataKey="latencyMs" name="Độ trễ" stroke="#06b6d4" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* DT15 Gateway Nodes Table */}
      <div className="space-y-2 border-t border-slate-100 pt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-slate-800">Trạng thái Trạm Gateway DT15</h3>
          <span className="text-[10px] text-emerald-600 font-medium">4/4 Online</span>
        </div>

        <div className="space-y-1.5 text-xs">
          {gateways.map((gw) => (
            <div
              key={gw.id}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <p className="font-semibold text-slate-800 text-[11px] truncate">{gw.name}</p>
                </div>
                <p className="text-[10px] text-slate-400 truncate pl-3.5">{gw.location}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-right">
                <div>
                  <span className="text-[11px] font-bold text-slate-800 font-mono block">
                    {gw.throughputMBps} MB/s
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">CPU: {gw.loadPercent}%</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                  {gw.uptime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-2 bg-indigo-50/50 rounded-lg p-2.5 border border-indigo-100 text-[11px] text-slate-600 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium text-indigo-950">
          <Layers className="w-3.5 h-3.5 text-indigo-600" />
          Mạng lưới 12,450 nút cảm biến DT15
        </span>
        <span className="text-[10px] text-slate-500 font-mono">Mất gói: 0.002%</span>
      </div>
    </div>
  );
};
