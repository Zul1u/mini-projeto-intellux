export type TrendSource = { url: string; title: string };

export type TrendPoint = {
  name: string;
  sources?: TrendSource[];
  why?: string;
};

export type TrendReportData = {
  market: string;
  summary: string;
  trend: string;
  pros: TrendPoint[];
  against: TrendPoint[];
  sources?: TrendSource[];
};
