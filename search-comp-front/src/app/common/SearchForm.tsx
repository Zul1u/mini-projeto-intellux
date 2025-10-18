"use client";

import { useState } from "react";
import { Dropdown, DropdownItem } from "@/components/Dropdown";
import Input from "@/components/Input";

type SearchType = "company" | "market-trend";
type Language = "pt-BR" | "en-US" | "es";
type Region = "global" | "br" | "us" | "cn" | "eu" | "apac" | "latam";

export type SearchFormValues = {
  search: string;
  type: SearchType | "";
  language: Language | "";
  region: Region | "";
};

const typeItems: DropdownItem<SearchType>[] = [
  { label: "Empresa", value: "company" },
  { label: "Tendência de Mercado", value: "market-trend" },
];

const languageItems: DropdownItem<Language>[] = [
  { label: "Português", value: "pt-BR" },
  { label: "Inglês", value: "en-US" },
  { label: "Espanhol", value: "es" },
];

const regionItems: DropdownItem<Region>[] = [
  { label: "Global", value: "global" },
  { label: "Brasil", value: "br" },
  { label: "Estados Unidos", value: "us" },
  { label: "China", value: "cn" },
  { label: "Europa", value: "eu" },
  { label: "Ásia-Pacífico", value: "apac" },
  { label: "América Latina", value: "latam" },
];

const placeholderByType: Record<SearchType, string> = {
  company: "Digite o nome da empresa",
  "market-trend": "Digite a tendência/termo de mercado",
};

type Props = { onSubmit: (values: SearchFormValues) => Promise<void> | void };

export function SearchForm({ onSubmit }: Props) {
  const [formValue, setFormValue] = useState<SearchFormValues>({
    search: "",
    type: "",
    language: "",
    region: "",
  });

  const needsRegion = formValue.type === "market-trend";
  const baseValid =
    formValue.type !== "" &&
    formValue.language !== "" &&
    formValue.search.trim().length >= 1;

  const isValid = needsRegion ? baseValid && !!formValue.region : baseValid;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;
    await onSubmit(formValue);
  };

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 md:flex-row">
        <Dropdown<SearchType | "">
          value={formValue.type}
          items={typeItems}
          onChange={(value) =>
            setFormValue((prev) => ({
              ...prev,
              type: value,
              region: value === "market-trend" ? prev.region : "",
            }))
          }
          className="w-full md:w-1/2"
          label={formValue.type ? undefined : "Selecione o tipo de busca"}
        />

        <Dropdown<Language | "">
          value={formValue.language}
          items={languageItems}
          onChange={(value) =>
            setFormValue((prev) => ({ ...prev, language: value }))
          }
          className="w-full md:w-1/2"
          label={
            formValue.language ? undefined : "Selecione o idioma da resposta"
          }
        />
      </div>
      {formValue.type && (
        <div className="flex flex-col gap-4 md:flex-row">
          {needsRegion && (
            <Dropdown<Region | "">
              value={formValue.region ?? ""}
              items={regionItems}
              onChange={(value) =>
                setFormValue((prev) => ({ ...prev, region: value }))
              }
              label={
                formValue.region ? undefined : "Selecione um país ou região"
              }
            />
          )}

          <Input
            id="search"
            type="text"
            placeholder={
              needsRegion
                ? placeholderByType["market-trend"]
                : placeholderByType["company"]
            }
            value={formValue.search}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid}
        className={[
          "self-end h-12 w-[175px] rounded-[50px] px-4 text-base font-semibold shadow-sm transition-colors",
          isValid
            ? "bg-[#d6fb49] text-[#030f13] hover:cursor-pointer"
            : "bg-[#f4ffe0] text-[#092731] cursor-default",
        ].join(" ")}
        aria-label="Buscar"
        title="Buscar"
      >
        Buscar
      </button>
    </form>
  );
}
