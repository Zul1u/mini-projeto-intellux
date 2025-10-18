export type Competitor = {
  name: string;
  site: string;
  why: string;
  branch: string[];
};

export type Source = { url: string; title: string };

export type CompanyReportData = {
  name: string;
  summary: string;
  branch: string[];
  competitors: Competitor[];
  sources: Source[];
};
