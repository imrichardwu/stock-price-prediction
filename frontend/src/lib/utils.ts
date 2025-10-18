import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getRecommendationColor(recommendation: string): string {
  switch (recommendation) {
    case "STRONG_BUY":
      return "text-green-600";
    case "BUY":
      return "text-green-500";
    case "HOLD":
      return "text-yellow-500";
    case "SELL":
      return "text-red-500";
    case "STRONG_SELL":
      return "text-red-600";
    default:
      return "text-gray-500";
  }
}

export function getRiskLevelColor(riskLevel: string): string {
  switch (riskLevel) {
    case "LOW":
      return "text-green-600";
    case "MEDIUM":
      return "text-yellow-500";
    case "HIGH":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}
