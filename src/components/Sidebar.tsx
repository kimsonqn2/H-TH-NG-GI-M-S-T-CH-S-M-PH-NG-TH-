import React from 'react';
import {
  Clock,
  MapPin,
  RefreshCw,
  Sliders,
  Code2,
  LayoutDashboard,
  ShieldCheck,
  Calendar,
  Activity,
  Layers,
  FileCode,
  Download,
} from 'lucide-react';
import { TimeRangeOption } from '../types';

interface SidebarProps {
  timeRange: TimeRangeOption;
  setTimeRange: (range: TimeRangeOption) => void;
  selectedDistrict: string;
  setSelectedDistrict: (dist: string) => void;
  simSpeed: number;
  setSimSpeed: (speed: number) => void;
  isAutoRefresh: boolean;
  setIsAutoRefresh: (auto: boolean) => void;
  activeView: 'dashboard' | 'code';
  setActiveView: (view: 'dashboard' | 'code') => void;
  onManualRefresh: () => void;
  lastUpdated: Date;
  onDownloadCode: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  timeRange,
  setTimeRange,
  selectedDistrict,
  setSelectedDistrict,
  simSpeed,
  setSimSpeed,
  isAutoRefresh,
  setIsAutoRefresh,
  activeView,
  setActiveView,
  onManualRefresh,
  lastUpdated,
  onDownloadCode,
}) => {
  return (
    <aside className="w-full lg:w-72 bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
            Mô Phỏng Đô Thị
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Streamlit
            </span>
          </h1>
          <p className="text-xs text-slate-400">Urban Simulation v3.4</p>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="p-3 border-b border-slate-800">
        <div className="grid grid-cols-2 gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800/80">
          <button
            id="view-tab-dashboard"
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
              activeView === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <button
            id="view-tab-code"
            onClick={() => setActiveView('code')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${
              activeView === 'code'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Mã Python</span>
          </button>
        </div>
      </div>

      {/* Sidebar Content Controls */}
      <div className="p-4 space-y-6 flex-1 overflow-y-auto custom-scrollbar text-xs">
        {/* Time Filter Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              Bộ lọc Thời gian
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Streamlit.Sidebar</span>
          </div>

          <div className="space-y-1.5">
            {[
              { id: 'today', label: 'Hôm nay (Thời gian thực)' },
              { id: '7d', label: '7 ngày qua' },
              { id: '30d', label: '30 ngày qua' },
              { id: 'quarter', label: 'Quý III / 2026' },
            ].map((opt) => (
              <button
                key={opt.id}
                id={`filter-time-${opt.id}`}
                onClick={() => setTimeRange(opt.id as TimeRangeOption)}
                className={`w-full text-left px-3 py-2 rounded-md transition-all flex items-center justify-between ${
                  timeRange === opt.id
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-medium'
                    : 'text-slate-300 hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                <span>{opt.label}</span>
                {timeRange === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
              </button>
            ))}
          </div>
        </div>

        {/* District Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-slate-300 font-medium" htmlFor="district-select">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            Phân vùng đô thị
          </label>
          <select
            id="district-select"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-md px-3 py-2 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">Toàn thành phố (Tổng hợp)</option>
            <option value="thu-duc">TP. Thủ Đức</option>
            <option value="q1">Quận 1</option>
            <option value="binh-thanh">Quận Bình Thạnh</option>
            <option value="q7">Quận 7</option>
            <option value="binh-chanh">Huyện Bình Chánh</option>
          </select>
        </div>

        {/* Simulation Speed Slider */}
        <div className="space-y-2.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Tốc độ mô phỏng
            </span>
            <span className="font-mono text-amber-300 text-[11px] font-semibold">{simSpeed}x</span>
          </div>
          <input
            id="sim-speed-slider"
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={simSpeed}
            onChange={(e) => setSimSpeed(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0.5x</span>
            <span>1.0x (Chuẩn)</span>
            <span>2.5x</span>
            <span>5.0x</span>
          </div>
        </div>

        {/* Auto Refresh & Action */}
        <div className="space-y-2">
          <div className="flex items-center justify-between py-1">
            <span className="text-slate-300 font-medium">Tự động đồng bộ</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="auto-refresh-toggle"
                checked={isAutoRefresh}
                onChange={(e) => setIsAutoRefresh(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <button
            id="btn-manual-refresh"
            onClick={onManualRefresh}
            className="w-full bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 py-2 px-3 rounded-md flex items-center justify-center gap-2 font-medium transition-colors border border-slate-700 text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
            <span>Làm mới dữ liệu vi mô</span>
          </button>
        </div>

        {/* Python Download Shortcut */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Mã nguồn Streamlit</span>
            <span className="text-emerald-400 font-mono">app.py</span>
          </div>
          <button
            id="btn-download-app-py"
            onClick={onDownloadCode}
            className="w-full bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 py-2 px-3 rounded-md flex items-center justify-center gap-2 font-medium transition-colors text-xs"
          >
            <Download className="w-3.5 h-3.5 text-indigo-300" />
            <span>Tải file app.py</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Trực tuyến
          </span>
          <span className="font-mono text-slate-400">
            {lastUpdated.toLocaleTimeString('vi-VN')}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Cổng phân tích dữ liệu không gian & mô phỏng đô thị
        </p>
      </div>
    </aside>
  );
};
