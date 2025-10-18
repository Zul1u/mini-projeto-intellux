"use client";

import { TrendReportData } from "@/types/trendReport";
import { useState } from "react";
import {
  FiChevronDown,
  FiExternalLink,
  FiLayers,
  FiThumbsUp,
  FiAlertTriangle,
  FiTrendingUp,
} from "react-icons/fi";

export function TrendReport({ data }: { data: TrendReportData }) {
  const {
    market,
    summary,
    trend,
    pros = [],
    against = [],
    sources = [],
  } = data;

  const [openSources, setOpenSources] = useState(false);
  const [openPros, setOpenPros] = useState<Record<number, boolean>>({});
  const [openAgainst, setOpenAgainst] = useState<Record<number, boolean>>({});

  return (
    <article className="w-full max-w-[840px] rounded-2xl bg-white shadow-lg border border-[#030f13]/10">
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
            Tendência de Mercado: {market}
          </h1>
          <p
            className="mt-1 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#030f13" }}
          >
            <FiTrendingUp /> Panorama & Análise
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

        {trend && (
          <section className="grid gap-2">
            <h3
              className="flex items-center gap-2 text-base font-semibold"
              style={{ color: "#030f13" }}
            >
              <FiLayers /> Tendência
            </h3>
            <p className="leading-relaxed text-zinc-800 break-words">{trend}</p>
          </section>
        )}

        {pros.length > 0 && (
          <section className="grid gap-3">
            <h3
              className="flex items-center gap-2 text-base font-semibold"
              style={{ color: "#030f13" }}
            >
              <FiThumbsUp /> Fatores favoráveis
            </h3>

            <ul className="grid gap-4">
              {pros.map((pro, idx) => {
                const isOpen = !!openPros[idx];
                return (
                  <li
                    key={`${pro.name}-${idx}`}
                    className="rounded-xl border border-[#030f13]/10 p-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="font-semibold text-zinc-900">
                        {pro.name}
                      </div>
                      {pro.why && (
                        <p className="text-sm leading-relaxed text-zinc-700">
                          {pro.why}
                        </p>
                      )}

                      {pro.sources && pro.sources.length > 0 && (
                        <>
                          <button
                            type="button"
                            className="cursor-pointer mt-1 inline-flex w-fit items-center justify-between gap-2 rounded-md bg-white text-left text-sm font-semibold"
                            style={{ color: "#030f13" }}
                            aria-expanded={isOpen}
                            aria-controls={`pros-src-${idx}`}
                            onClick={() =>
                              setOpenPros((prev) => ({
                                ...prev,
                                [idx]: !prev[idx],
                              }))
                            }
                          >
                            Fontes
                            <FiChevronDown
                              size={16}
                              className={`transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div
                              id={`pros-src-${idx}`}
                              className="grid overflow-hidden transition-all duration-300"
                            >
                              <ul className="min-h-0 overflow-hidden grid gap-1.5 px-1 py-2">
                                {pro.sources.map((source) => (
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
                          )}
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {against.length > 0 && (
          <section className="grid gap-3">
            <h3
              className="flex items-center gap-2 text-base font-semibold"
              style={{ color: "#030f13" }}
            >
              <FiAlertTriangle /> Pontos de atenção
            </h3>

            <ul className="grid gap-4">
              {against.map((versus, idx) => {
                const isOpen = !!openAgainst[idx];
                return (
                  <li
                    key={`${versus.name}-${idx}`}
                    className="rounded-xl border border-[#030f13]/10 p-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="font-semibold text-zinc-900">
                        {versus.name}
                      </div>
                      {versus.why && (
                        <p className="text-sm leading-relaxed text-zinc-700">
                          {versus.why}
                        </p>
                      )}

                      {versus.sources && versus.sources.length > 0 && (
                        <>
                          <button
                            type="button"
                            className="cursor-pointer mt-1 inline-flex w-fit items-center justify-between gap-2 rounded-md bg-white text-left text-sm font-semibold"
                            style={{ color: "#030f13" }}
                            aria-expanded={isOpen}
                            aria-controls={`against-src-${idx}`}
                            onClick={() =>
                              setOpenAgainst((prev) => ({
                                ...prev,
                                [idx]: !prev[idx],
                              }))
                            }
                          >
                            Fontes
                            <FiChevronDown
                              size={16}
                              className={`transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div
                              id={`against-src-${idx}`}
                              className="grid overflow-hidden transition-all duration-300"
                            >
                              <ul className="min-h-0 overflow-hidden grid gap-1.5 px-1 py-2">
                                {versus.sources.map((s) => (
                                  <li key={s.url}>
                                    <a
                                      href={s.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-2 underline underline-offset-4 break-words"
                                      style={{ color: "#030f13" }}
                                    >
                                      <FiExternalLink /> {s.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {sources.length > 0 && (
          <section className="grid gap-2">
            <button
              type="button"
              className="flex w-fit items-center justify-start gap-2 rounded-md bg-white text-left font-semibold cursor-pointer"
              style={{ color: "#030f13" }}
              aria-expanded={openSources}
              aria-controls="trend-sources-panel"
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
              id="trend-sources-panel"
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
