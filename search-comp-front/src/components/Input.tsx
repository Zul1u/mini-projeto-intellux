"use client";

import { InputHTMLAttributes, forwardRef } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  containerClassName?: string;
  inputClassName?: string;
  rounded?: "full" | "md";
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ containerClassName, inputClassName, rounded = "full", ...rest }, ref) => {
    const radius = rounded === "full" ? "rounded-full" : "rounded-md";
    return (
      <label
        className={`block h-12 w-full bg-white shadow-sm border border-[#030f13]/10 ${radius} ${
          containerClassName ?? ""
        }`}
      >
        <input
          ref={ref}
          className={`h-full w-full px-4 text-lg outline-none focus:outline-none ${
            inputClassName ?? ""
          }`}
          {...rest}
        />
      </label>
    );
  }
);
Input.displayName = "Input";

export default Input;
