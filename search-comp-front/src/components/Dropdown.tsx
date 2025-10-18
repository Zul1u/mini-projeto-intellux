"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { FiChevronRight } from "react-icons/fi";

export type DropdownItem<T extends string = string> = {
  label: string;
  value: T;
};

type Props<T extends string = string> = {
  value: T;
  items: DropdownItem<T>[];
  onChange: (val: T) => void;
  className?: string;
  buttonClassName?: string;
  listClassName?: string;
  label?: string;
};

export function Dropdown<T extends string = string>({
  value,
  items,
  onChange,
  className,
  buttonClassName,
  listClassName,
  label,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      if (rootRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;

      setOpen(false);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useLayoutEffect(() => {
    const updateCoords = () => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({ left: rect.left, top: rect.bottom + 10, width: rect.width });
    };

    if (open) {
      updateCoords();
      window.addEventListener("scroll", updateCoords, true);
      window.addEventListener("resize", updateCoords);
      return () => {
        window.removeEventListener("scroll", updateCoords, true);
        window.removeEventListener("resize", updateCoords);
      };
    }
  }, [open]);

  const selected = items.find((i) => i.value === value)?.label ?? "";

  return (
    <div
      ref={rootRef}
      className={[
        "relative flex h-12 w-full items-center justify-center rounded-full bg-white",
        "border border-[#030f13]/10 shadow-sm",
        className ?? "",
      ].join(" ")}
    >
      <button
        ref={buttonRef}
        type="button"
        className={[
          "flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-2 font-semibold",
          buttonClassName ?? "",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {label ?? selected}
        <FiChevronRight
          size={20}
          className={`min-w-5 transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>

      {open &&
        coords &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              left: coords.left,
              top: coords.top,
              width: coords.width,
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <ul
              role="listbox"
              className={[
                "flex flex-col gap-2 rounded-md bg-white p-1 shadow-sm",
                "max-h-[150px] overflow-y-auto overscroll-contain",
                listClassName ?? "",
              ].join(" ")}
              aria-label="Opções"
            >
              {items.map((it) => (
                <li key={it.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={value === it.value}
                    onClick={() => {
                      onChange(it.value);
                      setOpen(false);
                    }}
                    className="block w-full cursor-pointer rounded-md p-2 text-left font-semibold hover:bg-[#ebffb8] hover:shadow-sm"
                  >
                    {it.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
