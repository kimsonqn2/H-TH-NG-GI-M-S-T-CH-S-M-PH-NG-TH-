import {
  CadastralDistrictProgress,
  CadastralTimelinePoint,
  DT15TrafficPoint,
  DT15GatewayNode,
  DataExchangeTransactionPoint,
  TopDataset,
  ExchangeNodeHealth,
  SimulationOverviewMetrics,
  TimeRangeOption,
} from '../types';

export function getSimulationMetrics(timeRange: TimeRangeOption, district: string): SimulationOverviewMetrics {
  const mult = district === 'all' ? 1 : 0.25;
  return {
    totalCadastralTarget: Math.round(1500000 * mult),
    totalCadastralCompleted: Math.round(1269000 * mult),
    dt15CurrentBandwidthMBps: timeRange === 'today' ? 428.5 : 385.2,
    dt15TotalDataVolumeTB: timeRange === '30d' ? 142.8 : timeRange === 'quarter' ? 418.5 : 12.6,
    exchangeDailyTransactions: timeRange === 'today' ? 14892 : 89450,
    exchangeSystemUptime: 99.98,
    aiVerificationAccuracy: 99.42,
  };
}

export function getCadastralDistricts(): CadastralDistrictProgress[] {
  return [
    {
      district: 'TP. Thủ Đức',
      totalRecords: 420000,
      digitizedRecords: 384300,
      verifiedRecords: 352100,
      percentage: 91.5,
      status: 'optimal',
    },
    {
      district: 'Quận 1',
      totalRecords: 150000,
      digitizedRecords: 147300,
      verifiedRecords: 142800,
      percentage: 98.2,
      status: 'optimal',
    },
    {
      district: 'Q. Bình Thạnh',
      totalRecords: 210000,
      digitizedRecords: 185640,
      verifiedRecords: 168000,
      percentage: 88.4,
      status: 'optimal',
    },
    {
      district: 'Quận 7',
      totalRecords: 180000,
      digitizedRecords: 149580,
      verifiedRecords: 135200,
      percentage: 83.1,
      status: 'in_progress',
    },
    {
      district: 'H. Bình Chánh',
      totalRecords: 320000,
      digitizedRecords: 229120,
      verifiedRecords: 198400,
      percentage: 71.6,
      status: 'in_progress',
    },
    {
      district: 'H. Củ Chi',
      totalRecords: 220000,
      digitizedRecords: 173060,
      verifiedRecords: 145600,
      percentage: 78.7,
      status: 'delayed',
    },
  ];
}

export function getCadastralTimeline(timeRange: TimeRangeOption): CadastralTimelinePoint[] {
  if (timeRange === 'today') {
    return [
      { timeLabel: '08:00', scanned: 1250, verified: 1100, target: 1200, cumulativePercent: 81.2 },
      { timeLabel: '10:00', scanned: 2450, verified: 2180, target: 2400, cumulativePercent: 82.0 },
      { timeLabel: '12:00', scanned: 3100, verified: 2900, target: 3000, cumulativePercent: 82.8 },
      { timeLabel: '14:00', scanned: 4800, verified: 4350, target: 4500, cumulativePercent: 83.5 },
      { timeLabel: '16:00', scanned: 6200, verified: 5800, target: 6000, cumulativePercent: 84.1 },
      { timeLabel: '18:00', scanned: 7450, verified: 7100, target: 7000, cumulativePercent: 84.6 },
    ];
  } else if (timeRange === '7d') {
    return [
      { timeLabel: 'T2', scanned: 12400, verified: 11200, target: 12000, cumulativePercent: 81.5 },
      { timeLabel: 'T3', scanned: 14200, verified: 13100, target: 13000, cumulativePercent: 82.2 },
      { timeLabel: 'T4', scanned: 15800, verified: 14900, target: 14000, cumulativePercent: 82.9 },
      { timeLabel: 'T5', scanned: 15100, verified: 14200, target: 14000, cumulativePercent: 83.4 },
      { timeLabel: 'T6', scanned: 17200, verified: 16300, target: 15000, cumulativePercent: 84.0 },
      { timeLabel: 'T7', scanned: 13400, verified: 12800, target: 13000, cumulativePercent: 84.3 },
      { timeLabel: 'CN', scanned: 16900, verified: 15900, target: 15000, cumulativePercent: 84.6 },
    ];
  } else {
    return [
      { timeLabel: 'Tuần 1', scanned: 82000, verified: 76000, target: 80000, cumulativePercent: 78.4 },
      { timeLabel: 'Tuần 2', scanned: 94000, verified: 88500, target: 90000, cumulativePercent: 80.2 },
      { timeLabel: 'Tuần 3', scanned: 106000, verified: 99400, target: 95000, cumulativePercent: 82.5 },
      { timeLabel: 'Tuần 4', scanned: 118000, verified: 112000, target: 100000, cumulativePercent: 84.6 },
    ];
  }
}

export function getDT15TrafficSeries(timeRange: TimeRangeOption): DT15TrafficPoint[] {
  if (timeRange === 'today') {
    return [
      { timeLabel: '00:00', iotSensors: 85, trafficCameras: 25, gisLayers: 40, infrastructure: 15, totalThroughput: 165, latencyMs: 12.4 },
      { timeLabel: '04:00', iotSensors: 75, trafficCameras: 20, gisLayers: 35, infrastructure: 12, totalThroughput: 142, latencyMs: 11.2 },
      { timeLabel: '07:00', iotSensors: 140, trafficCameras: 85, gisLayers: 70, infrastructure: 32, totalThroughput: 327, latencyMs: 18.6 },
      { timeLabel: '09:00', iotSensors: 195, trafficCameras: 125, gisLayers: 110, infrastructure: 48, totalThroughput: 478, latencyMs: 24.8 },
      { timeLabel: '12:00', iotSensors: 165, trafficCameras: 95, gisLayers: 90, infrastructure: 38, totalThroughput: 388, latencyMs: 19.5 },
      { timeLabel: '15:00', iotSensors: 180, trafficCameras: 115, gisLayers: 105, infrastructure: 42, totalThroughput: 442, latencyMs: 22.3 },
      { timeLabel: '18:00', iotSensors: 215, trafficCameras: 140, gisLayers: 125, infrastructure: 52, totalThroughput: 532, latencyMs: 27.4 },
      { timeLabel: '21:00', iotSensors: 145, trafficCameras: 75, gisLayers: 80, infrastructure: 28, totalThroughput: 328, latencyMs: 16.8 },
    ];
  } else {
    return [
      { timeLabel: 'Ngày 1', iotSensors: 165, trafficCameras: 102, gisLayers: 88, infrastructure: 35, totalThroughput: 390, latencyMs: 18.2 },
      { timeLabel: 'Ngày 2', iotSensors: 172, trafficCameras: 110, gisLayers: 94, infrastructure: 38, totalThroughput: 414, latencyMs: 19.0 },
      { timeLabel: 'Ngày 3', iotSensors: 185, trafficCameras: 118, gisLayers: 102, infrastructure: 42, totalThroughput: 447, latencyMs: 21.4 },
      { timeLabel: 'Ngày 4', iotSensors: 160, trafficCameras: 98, gisLayers: 85, infrastructure: 32, totalThroughput: 375, latencyMs: 17.5 },
      { timeLabel: 'Ngày 5', iotSensors: 198, trafficCameras: 130, gisLayers: 115, infrastructure: 48, totalThroughput: 491, latencyMs: 23.8 },
      { timeLabel: 'Ngày 6', iotSensors: 175, trafficCameras: 105, gisLayers: 92, infrastructure: 36, totalThroughput: 408, latencyMs: 18.9 },
      { timeLabel: 'Ngày 7', iotSensors: 188, trafficCameras: 122, gisLayers: 108, infrastructure: 44, totalThroughput: 462, latencyMs: 20.6 },
    ];
  }
}

export function getDT15Gateways(): DT15GatewayNode[] {
  return [
    {
      id: 'gw-central',
      name: 'DT15 Gateway Trung tâm',
      location: 'TT Điều hành Đô thị Thông minh',
      status: 'online',
      throughputMBps: 182.4,
      loadPercent: 54,
      uptime: '99.99%',
    },
    {
      id: 'gw-east',
      name: 'DT15 Gateway Phía Đông',
      location: 'Khu Công nghệ Cao TP. Thủ Đức',
      status: 'online',
      throughputMBps: 114.2,
      loadPercent: 41,
      uptime: '99.98%',
    },
    {
      id: 'gw-south',
      name: 'DT15 Gateway Phía Nam',
      location: 'Hạ tầng Đô thị Nam Sài Gòn (Q.7)',
      status: 'online',
      throughputMBps: 86.1,
      loadPercent: 33,
      uptime: '99.97%',
    },
    {
      id: 'gw-north',
      name: 'DT15 Gateway Phía Bắc',
      location: 'Trung tâm Dữ liệu Quang Trung',
      status: 'online',
      throughputMBps: 45.8,
      loadPercent: 26,
      uptime: '99.95%',
    },
  ];
}

export function getDataExchangeTransactions(timeRange: TimeRangeOption): DataExchangeTransactionPoint[] {
  if (timeRange === 'today') {
    return [
      { timeLabel: '08:00', transactions: 420, volumeGB: 12.4, apiQueries: 3200, successRate: 99.95 },
      { timeLabel: '10:00', transactions: 1420, volumeGB: 45.1, apiQueries: 9800, successRate: 99.98 },
      { timeLabel: '12:00', transactions: 1310, volumeGB: 39.8, apiQueries: 8400, successRate: 99.92 },
      { timeLabel: '14:00', transactions: 1820, volumeGB: 58.2, apiQueries: 12400, successRate: 99.99 },
      { timeLabel: '16:00', transactions: 1750, volumeGB: 54.0, apiQueries: 11900, successRate: 99.97 },
      { timeLabel: '18:00', transactions: 980, volumeGB: 29.6, apiQueries: 6700, successRate: 99.94 },
    ];
  } else {
    return [
      { timeLabel: 'T2', transactions: 11200, volumeGB: 320.5, apiQueries: 74000, successRate: 99.97 },
      { timeLabel: 'T3', transactions: 13400, volumeGB: 410.2, apiQueries: 89000, successRate: 99.98 },
      { timeLabel: 'T4', transactions: 15200, volumeGB: 490.8, apiQueries: 104000, successRate: 99.99 },
      { timeLabel: 'T5', transactions: 14800, volumeGB: 460.5, apiQueries: 98000, successRate: 99.96 },
      { timeLabel: 'T6', transactions: 16900, volumeGB: 535.1, apiQueries: 118000, successRate: 99.98 },
      { timeLabel: 'T7', transactions: 9400, volumeGB: 280.0, apiQueries: 62000, successRate: 99.95 },
      { timeLabel: 'CN', transactions: 8550, volumeGB: 255.4, apiQueries: 56000, successRate: 99.96 },
    ];
  }
}

export function getTopDatasets(): TopDataset[] {
  return [
    {
      id: 'ds-01',
      name: 'Bản đồ Quy hoạch Phân khu 1/2000',
      category: 'Quy hoạch & Địa chính',
      provider: 'Sở Quy hoạch Kiến trúc',
      queries24h: 4120,
      volumeGB: 840,
      status: 'active',
    },
    {
      id: 'ds-02',
      name: 'Mạng lưới Giao thông & Luồng xe Thời gian thực',
      category: 'Giao thông DT15',
      provider: 'Trung tâm Quản lý Giao thông',
      queries24h: 3890,
      volumeGB: 1420,
      status: 'active',
    },
    {
      id: 'ds-03',
      name: 'Vi khí hậu, Cảm biến Môi trường & Ngập lụt',
      category: 'Khí quyển & Thủy văn',
      provider: 'Sở Tài nguyên Môi trường',
      queries24h: 2940,
      volumeGB: 290,
      status: 'synced',
    },
    {
      id: 'ds-04',
      name: 'Mật độ Di động Dân cư & Điểm dịch vụ',
      category: 'Nhân khẩu đô thị',
      provider: 'Tổng cục Viễn thông & Đô thị',
      queries24h: 2150,
      volumeGB: 450,
      status: 'active',
    },
    {
      id: 'ds-05',
      name: 'Hiện trạng Mạng lưới Cấp thoát nước Ngầm',
      category: 'Hạ tầng kỹ thuật',
      provider: 'Cấp thoát nước Đô thị',
      queries24h: 1792,
      volumeGB: 310,
      status: 'synced',
    },
  ];
}

export function getExchangeNodeHealth(): ExchangeNodeHealth[] {
  return [
    {
      service: 'API Gateway & Reverse Proxy',
      status: 'healthy',
      latency: 18,
      uptime: '99.99%',
      message: 'Thông lượng ổn định, phản hồi trung bình 18ms',
    },
    {
      service: 'Matching Engine (Khớp lệnh Trao đổi Dữ liệu)',
      status: 'healthy',
      latency: 12,
      uptime: '99.98%',
      message: 'Hàng đợi xử lý < 50 req/s, không nghẽn lệnh',
    },
    {
      service: 'Smart Contract & Data Tokenizer',
      status: 'healthy',
      latency: 35,
      uptime: '100%',
      message: 'Xác thực chữ ký số & cấp quyền truy cập dữ liệu tức thời',
    },
    {
      service: 'Sandbox Bảo mật & Khử định danh Dữ liệu',
      status: 'healthy',
      latency: 42,
      uptime: '99.96%',
      message: 'Thuật toán Differential Privacy vận hành bình thường',
    },
  ];
}
