export type TimeRangeOption = 'today' | '7d' | '30d' | 'quarter' | 'custom';

export interface CadastralDistrictProgress {
  district: string;
  totalRecords: number;
  digitizedRecords: number;
  verifiedRecords: number;
  percentage: number;
  status: 'optimal' | 'in_progress' | 'delayed';
}

export interface CadastralTimelinePoint {
  timeLabel: string;
  scanned: number;
  verified: number;
  target: number;
  cumulativePercent: number;
}

export interface DT15TrafficPoint {
  timeLabel: string;
  iotSensors: number;      // MB/s
  trafficCameras: number;  // MB/s
  gisLayers: number;       // MB/s
  infrastructure: number;  // MB/s
  totalThroughput: number; // MB/s
  latencyMs: number;
}

export interface DT15GatewayNode {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'warning' | 'offline';
  throughputMBps: number;
  loadPercent: number;
  uptime: string;
}

export interface DataExchangeTransactionPoint {
  timeLabel: string;
  transactions: number;
  volumeGB: number;
  apiQueries: number;
  successRate: number;
}

export interface TopDataset {
  id: string;
  name: string;
  category: string;
  provider: string;
  queries24h: number;
  volumeGB: number;
  status: 'active' | 'synced' | 'restricted';
}

export interface ExchangeNodeHealth {
  service: string;
  status: 'healthy' | 'degraded' | 'critical';
  latency: number; // ms
  uptime: string;
  message: string;
}

export interface SimulationOverviewMetrics {
  totalCadastralTarget: number;
  totalCadastralCompleted: number;
  dt15CurrentBandwidthMBps: number;
  dt15TotalDataVolumeTB: number;
  exchangeDailyTransactions: number;
  exchangeSystemUptime: number;
  aiVerificationAccuracy: number;
}
