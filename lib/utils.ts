import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return isoDuration;
  const hours = match[1] ? `${match[1]} hour${match[1] === "1" ? "" : "s"}` : "";
  const minutes = match[2] ? `${match[2]} minute${match[2] === "1" ? "" : "s"}` : "";
  return [hours, minutes].filter(Boolean).join(" ");
}

export function formatReadableDate(dateStr: string): string {
  const date = new Date(dateStr);

  const day = date.getDate();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-indexed
  const year = date.getFullYear();

  const getOrdinalSuffix = (n: number) => {
    if (n >= 11 && n <= 13) return `${n}th`;
    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  };

  return `${getOrdinalSuffix(day)} ${month} ${year}`;
}


export function formatTimeOnly(dateStr: string): string {
  const date = new Date(dateStr);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${hours}:${paddedMinutes} ${ampm}`;
}
