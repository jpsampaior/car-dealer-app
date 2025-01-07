import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeWord(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function capitalize(str: string): string {
  try {
    const words = str.split(" ");
    const capitalizedWords = words.map((word) => capitalizeWord(word));
    return capitalizedWords.join(" ");
  } catch (error) {
    return "";
  }
}
