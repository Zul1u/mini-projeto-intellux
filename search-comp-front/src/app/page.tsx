"use client";

import Image from "next/image";
import { useState } from "react";
import { SearchForm, SearchFormValues } from "./common/SearchForm";
import { CompanyReport } from "@/components/CompanyReport";
import { ReportSkeleton } from "@/components/ReportSkeleton";
import { api } from "@/lib/axios";
import { CompanyReportData } from "@/types/companyReport";
import { TrendReport } from "@/components/TrendReport";
import { TrendReportData } from "@/types/trendReport";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyReport, setCompanyReport] = useState<CompanyReportData | null>(
    null
  );
  const [trendReport, setTrendReport] = useState<TrendReportData | null>(null);

  const hasStarted = isSubmitting || !!companyReport || !!trendReport;

  const searchCompany = async (values: SearchFormValues) => {
    const payload = {
      companyName: values.search,
      language: values.language,
    };

    try {
      const { data: response } = await api.post("/search/company", payload);
      setCompanyReport(response.data);
    } catch (e) {
      console.error("Erro ao buscar:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const searchTrend = async (values: SearchFormValues) => {
    const payload = {
      market: values.search,
      language: values.language,
      region: values.region,
    };

    try {
      const { data: response } = await api.post("/search/trend", payload);
      setTrendReport(response.data);
    } catch (e) {
      console.error("Erro ao buscar:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearchSubmit = async (values: SearchFormValues) => {
    setCompanyReport(null);
    setTrendReport(null);
    setIsSubmitting(true);

    if (values.type === "company") await searchCompany(values);
    if (values.type === "market-trend") await searchTrend(values);
  };

  return (
    <main className="flex h-full w-full flex-col items-center justify-start">
      <section className="flex w-full max-w-[840px] flex-col items-center gap-6 p-5 pt-0">
        {!hasStarted && (
          <div className="w-full flex justify-center pt-10">
            <Image
              src="/search_comp_logo.png"
              alt="search comp logo"
              width={320}
              height={200}
              className="mx-auto w-full max-w-[320px]"
              priority
            />
          </div>
        )}

        <div
          className={[
            "w-full max-w-[840px] rounded-2xl bg-white shadow-lg p-4",
            "motion-safe:transform-gpu motion-safe:transition-transform motion-safe:duration-500",
            hasStarted ? "-translate-y-3 md:-translate-y-0" : "translate-y-0",
          ].join(" ")}
        >
          <h1 className="mb-4 flex items-center gap-2 text-xl font-extrabold tracking-tight text-[#0b2f3a]">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ background: "#d6fb49" }}
            />
            Formulário de Busca
          </h1>

          <SearchForm onSubmit={handleSearchSubmit} />
        </div>

        <div className="w-full max-w-[900px]">
          {isSubmitting && (
            <div className="motion-safe:animate-[fadeIn_.4s_ease-out_forwards]">
              <ReportSkeleton />
            </div>
          )}

          {!isSubmitting && companyReport && (
            <div className="motion-safe:animate-[fadeInUp_.45s_ease-out_forwards]">
              <CompanyReport data={companyReport} />
            </div>
          )}

          {!isSubmitting && trendReport && (
            <div className="z-0 motion-safe:animate-[fadeInUp_.45s_ease-out_forwards]">
              <TrendReport data={trendReport} />
            </div>
          )}
        </div>
      </section>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: .0; transform: translateY(4px); }
            to   { opacity: 1;  transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: .0; transform: translateY(8px); }
            to   { opacity: 1;  transform: translateY(0); }
          }
        `}
      </style>
    </main>
  );
}
