import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
}

export function getSentimentLabel(score: number): string {
  if (score >= 0.6) return 'Positive';
  if (score >= 0.3) return 'Neutral';
  return 'Negative';
}

export function getSentimentColor(score: number): string {
  if (score >= 0.6) return 'text-green-600 bg-green-50';
  if (score >= 0.3) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
}
