"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Building2,
    Target,
    Calculator,
    PieChart,
    BarChart3,
    Settings,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
    { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
    { href: "/departments", label: "부서 관리", icon: Building2 },
    { href: "/projects", label: "비용절감 OKS 관리", icon: Target },
    { href: "/performance", label: "월별 실적 입력", icon: Calculator },
    { href: "/department-results", label: "부서별 성과", icon: PieChart },
    { href: "/total-results", label: "병원 전체 성과", icon: BarChart3 },
    { href: "/settings", label: "설정", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-900 transition-transform duration-300 lg:translate-x-0 bg-[radial-gradient(circle_at_10%_10%,_rgba(59,130,246,0.05),transparent)]",
                !isOpen && "-translate-x-full"
            )}>
                <div className="flex flex-col h-full p-6">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Target className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white leading-tight uppercase tracking-tight">Sarang OKS</h1>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Management System</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-1.5 h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium",
                                        isActive
                                            ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 ring-1 ring-transparent hover:ring-slate-800"
                                    )}
                                >
                                    <Icon size={18} className={cn(
                                        "transition-colors",
                                        isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                                    )} />
                                    <span>{item.label}</span>
                                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section (Fixed at bottom) */}
                    <div className="mt-6 pt-6 border-t border-slate-900">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold">
                                AD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">인천사랑병원</p>
                                <p className="text-xs text-slate-500 truncate">기획조정실 관리자</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && <div className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />}
        </>
    );
}
