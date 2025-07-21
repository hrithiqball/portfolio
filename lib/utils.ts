import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseFileName(filename: string) {
  const match = filename.match(/^(.+?)T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z-(.+)\.md$/)
  if (!match) return null

  const [_, datePart, hh, mm, ss, ms, title] = match
  const iso = `${datePart}T${hh}:${mm}:${ss}.${ms}Z`
  return {
    title,
    date: new Date(iso).toLocaleString(), // format for display
    filename
  }
}
