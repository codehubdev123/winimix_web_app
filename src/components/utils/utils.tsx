import { invalidData } from "@hookform/resolvers/typeschema/src/__tests__/__fixtures__/data.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const safeStringify = (obj) => {
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === "function" || value === undefined) {
        return undefined; // Exclude functions and undefined
      }
      // Handle circular references if needed, though less common for errors
      return value;
    },
    2,
  ); // Add indentation for readability
};

// Then use it:
// console.log(safeStringify(errors));
