export class TrendResponseDTO {
  market: string;
  summary: string;
  trend: string;
  pros: {
    name: string;
    sources: { url: string; title: string }[];
    why: string;
  }[];
  against: {
    name: string;
    sources: { url: string; title: string }[];
    why: string;
  }[];
  sources: { url: string; title: string }[];
}
