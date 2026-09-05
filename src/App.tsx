import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { CadastralColumn } from './components/CadastralColumn';
import { DT15TrafficColumn } from './components/DT15TrafficColumn';
import { DataExchangeColumn } from './components/DataExchangeColumn';
import { PythonSourceModal } from './components/PythonSourceModal';
import { PythonCodeView } from './components/PythonCodeView';
import { ExportModal } from './components/ExportModal';
import { TimeRangeOption } from './types';
import {
  getSimulationMetrics,
  getCadastralDistricts,
  getCadastralTimeline,
  getDT15TrafficSeries,
  getDT15Gateways,
  getDataExchangeTransactions,
  getTopDatasets,
  getExchangeNodeHealth,
} from './data/simulationData';
import { pythonStreamlitCode } from './data/pythonStreamlitSource';

export default function App() {
  const [timeRange, setTimeRange] = useState<TimeRangeOption>('today');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [simSpeed, setSimSpeed] = useState<number>(1.0);
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<'dashboard' | 'code'>('dashboard');
  const [isPythonModalOpen, setIsPythonModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [ticker, setTicker] = useState<number>(0);

  // Dynamic simulation data
  const metrics = getSimulationMetrics(timeRange, selectedDistrict);
  const districts = getCadastralDistricts();
  const timeline = getCadastralTimeline(timeRange);
  const trafficSeries = getDT15TrafficSeries(timeRange);
  const gateways = getDT15Gateways();
  const transactions = getDataExchangeTransactions(timeRange);
  const topDatasets = getTopDatasets();
  const nodeHealth = getExchangeNodeHealth();

  // Dynamic slight jitter to represent live telemetry pulses
  const liveBandwidth = +(
    metrics.dt15CurrentBandwidthMBps +
    (Math.sin(ticker) * 8.5 * simSpeed)
  ).toFixed(1);

  const liveTransactions = Math.round(
    metrics.exchangeDailyTransactions + (Math.cos(ticker) * 25 * simSpeed)
  );

  const liveCompletedCadastral = Math.round(
    metrics.totalCadastralCompleted + Math.min(ticker * 12 * simSpeed, 1500)
  );

  // Simulation loop
  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      setTicker((prev) => prev + 1);
      setLastUpdated(new Date());
    }, 3000 / simSpeed);

    return () => clearInterval(interval);
  }, [isAutoRefresh, simSpeed]);

  // Handler to download app.py directly
  const handleDownloadAppPy = useCallback(() => {
    const blob = new Blob([pythonStreamlitCode], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'app.py');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleManualRefresh = () => {
    setTicker((prev) => prev + 1);
    setLastUpdated(new Date());
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-100 text-slate-900 font-sans antialiased">
      {/* Sidebar Component with Time Filter and Simulation Settings */}
      <Sidebar
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        simSpeed={simSpeed}
        setSimSpeed={setSimSpeed}
        isAutoRefresh={isAutoRefresh}
        setIsAutoRefresh={setIsAutoRefresh}
        activeView={activeView}
        setActiveView={setActiveView}
        onManualRefresh={handleManualRefresh}
        lastUpdated={lastUpdated}
        onDownloadCode={handleDownloadAppPy}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header with Overview Metrics Bar */}
        <TopHeader
          metrics={{
            ...metrics,
            totalCadastralCompleted: liveCompletedCadastral,
            dt15CurrentBandwidthMBps: liveBandwidth,
            exchangeDailyTransactions: liveTransactions,
          }}
          timeRange={timeRange}
          selectedDistrict={selectedDistrict}
          onOpenPythonModal={() => setIsPythonModalOpen(true)}
          onExportData={() => setIsExportModalOpen(true)}
        />

        {/* View Switcher: Interactive 3-Column Dashboard OR Python Streamlit Code View */}
        {activeView === 'dashboard' ? (
          <main className="p-4 sm:p-6 space-y-6">
            {/* 3 Columns Grid as explicitly requested */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
              {/* CỘT 1: Tiến độ số hóa hồ sơ địa chính */}
              <CadastralColumn
                districts={districts}
                timeline={timeline}
                totalTarget={metrics.totalCadastralTarget}
                totalCompleted={liveCompletedCadastral}
              />

              {/* CỘT 2: Lưu lượng dữ liệu dự án DT15 */}
              <DT15TrafficColumn
                trafficSeries={trafficSeries}
                gateways={gateways}
                currentBandwidth={liveBandwidth}
              />

              {/* CỘT 3: Tình trạng hoạt động sàn giao dịch dữ liệu */}
              <DataExchangeColumn
                transactions={transactions}
                topDatasets={topDatasets}
                nodeHealth={nodeHealth}
                totalTx={liveTransactions}
              />
            </div>

            {/* Bottom Streamlit Run Quicktip Banner */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <div>
                  <span className="font-semibold text-slate-800">
                    Dashboard mô phỏng đô thị đang phát luồng vi mô
                  </span>
                  <p className="text-[11px] text-slate-500">
                    Đã chuẩn bị sẵn mã nguồn Python Streamlit hoàn chỉnh trong file <code className="text-indigo-600 font-mono font-semibold">app.py</code> với thư viện Plotly & Pandas.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsPythonModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors"
                >
                  Xem Mã Nguồn Streamlit
                </button>
                <button
                  onClick={handleDownloadAppPy}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 font-medium transition-colors"
                >
                  Tải app.py
                </button>
              </div>
            </div>
          </main>
        ) : (
          <PythonCodeView
            onDownloadCode={handleDownloadAppPy}
            onSwitchToDashboard={() => setActiveView('dashboard')}
          />
        )}
      </div>

      {/* Python Code Modal */}
      <PythonSourceModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
        onDownloadCode={handleDownloadAppPy}
      />

      {/* Export Data Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        metrics={{
          ...metrics,
          totalCadastralCompleted: liveCompletedCadastral,
          dt15CurrentBandwidthMBps: liveBandwidth,
          exchangeDailyTransactions: liveTransactions,
        }}
        timeRange={timeRange}
      />
    </div>
  );
}
