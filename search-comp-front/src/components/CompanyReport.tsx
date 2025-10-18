"use client";

import { CompanyReportData } from "@/types/companyReport";
import { useState } from "react";
import {
  FiExternalLink,
  FiGlobe,
  FiUsers,
  FiLayers,
  FiChevronDown,
} from "react-icons/fi";

export function CompanyReport({ data }: { data: CompanyReportData }) {
  const { name, summary, branch, competitors, sources = [] } = data;
  const [openSources, setOpenSources] = useState(false);

  return (
    <article className="w-full z-0 max-w-[840px] rounded-2xl bg-white shadow-lg border border-[#030f13]/10">
      <header
        className="flex items-start gap-3 rounded-t-2xl px-6 py-5"
        style={{ background: "#f0f8ff" }}
      >
        <div
          className="mt-1 h-3 w-3 rounded-full"
          style={{ background: "#d6fb49" }}
        />
        <div>
          <h1
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: "#030f13" }}
          >
            {name}
          </h1>
          <p className="mt-1 text-sm opacity-70" style={{ color: "#030f13" }}>
            Relatório de visão geral
          </p>
        </div>
      </header>

      <div className="grid gap-6 px-6 py-6">
        <section className="grid gap-2">
          <h2 className="text-lg font-semibold" style={{ color: "#030f13" }}>
            Resumo
          </h2>
          <p className="leading-relaxed text-zinc-800 break-words">{summary}</p>
        </section>

        {branch.length > 0 && (
          <section className="grid gap-3">
            <h3
              className="flex items-center gap-2 text-base font-semibold"
              style={{ color: "#030f13" }}
            >
              <FiLayers /> Linhas de atuação
            </h3>
            <ul className="flex flex-wrap gap-2">
              {branch.map((b) => (
                <li
                  key={b}
                  className="rounded-full px-3 py-1 text-sm"
                  style={{ background: "#d6fb49", color: "#030f13" }}
                >
                  {b}
                </li>
              ))}
            </ul>
          </section>
        )}

        {competitors.length > 0 && (
          <section className="grid gap-3">
            <h3
              className="flex items-center gap-2 text-base font-semibold"
              style={{ color: "#030f13" }}
            >
              <FiUsers /> Concorrentes
            </h3>

            <ul className="grid gap-4">
              {competitors.map((competitor) => (
                <li
                  key={competitor.name}
                  className="rounded-xl border border-[#030f13]/10 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-semibold text-zinc-900">
                      {competitor.name}
                    </div>
                    <a
                      href={competitor.site}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm underline underline-offset-4 break-words"
                      style={{ color: "#030f13" }}
                    >
                      <FiGlobe className="-mt-[1px]" /> site <FiExternalLink />
                    </a>
                  </div>

                  {competitor.branch?.length ? (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {competitor.branch.map((b) => (
                        <li
                          key={b}
                          className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {competitor.why ? (
                    <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                      {competitor.why}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        )}

        {sources.length > 0 && (
          <section className="grid gap-2">
            <button
              type="button"
              className="flex items-center justify-start w-fit rounded-md gap-2 bg-white text-left font-semibold cursor-pointer"
              style={{ color: "#030f13" }}
              aria-expanded={openSources}
              aria-controls="sources-panel"
              onClick={() => setOpenSources((v) => !v)}
            >
              <span>Fontes</span>
              <FiChevronDown
                size={18}
                className={`transition-transform ${
                  openSources ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id="sources-panel"
              className={[
                "grid overflow-hidden transition-all duration-300",
                openSources
                  ? "[grid-template-rows:1fr] opacity-100"
                  : "[grid-template-rows:0fr] opacity-0",
              ].join(" ")}
            >
              <ul className="min-h-0 overflow-hidden grid gap-1.5 px-1 py-2">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 underline underline-offset-4 break-words"
                      style={{ color: "#030f13" }}
                    >
                      <FiExternalLink /> {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
