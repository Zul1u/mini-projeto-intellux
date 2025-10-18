export class CompanyResponseDTO {
  name: string;
  summary: string;
  branch: string[];
  competitors: {
    name: string;
    site: string;
    why: string;
    branch: string[];
  }[];
  sources: { url: string; title: string }[];
}
