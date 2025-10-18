"use client";

import Image from "next/image";
import Link from "next/link";

const nav = [{ label: "Formulário de Busca", href: "/" }];

export function Header() {
  return (
    <header className="w-full sticky top-0 z-50 px-3 py-2 bg-transparent">
      <div
        className="max-w-[1440px] mx-auto flex items-center justify-between rounded-full px-3 gap-4 py-2 shadow-sm"
        style={{ background: "#d6fb49" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/search_comp_logo.png"
              alt=""
              width={120}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        <nav className="lg:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:opacity-80 underline"
              style={{ color: "#0b2f3a" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
