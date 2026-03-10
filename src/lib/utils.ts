import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumber(value: number) {
    return new Intl.NumberFormat('ko-KR').format(value);
}

export function formatCurrency(value: number) {
    return `₩${formatNumber(value)}`;
}

export function formatPercent(value: number) {
    return `${value.toFixed(1)}%`;
}

export function getStatusColor(rate: number) {
    if (rate >= 120) return "text-emerald-500";
    if (rate >= 80) return "text-amber-500";
    return "text-rose-500";
}

export function getStatusBg(rate: number) {
    if (rate >= 120) return "bg-emerald-500/10 border-emerald-500/20";
    if (rate >= 80) return "bg-amber-500/10 border-amber-500/20";
    return "bg-rose-500/10 border-rose-500/20";
}
