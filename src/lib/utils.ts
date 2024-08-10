import { type ClassValue, clsx } from "clsx"; // Import types and function for handling class names
import { twMerge } from "tailwind-merge"; // Import function for merging Tailwind CSS class names

/**
 * Combine and merge Tailwind CSS class names.
 *
 * @param inputs - Class names and conditional class values to be combined.
 * @returns A single string of class names with duplicates merged.
 */
export function cn(...inputs: ClassValue[]): string {
  // Use clsx to combine class names and twMerge to handle Tailwind-specific merging
  return twMerge(clsx(inputs));
}
