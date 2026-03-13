export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { Calculator, Calendar, Building2, CheckCircle2, AlertCircle } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";

export default async function PerformancePage() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = 2026;

    const projects = await prisma.costSavingProject.findMany({
        where: { isActive: true },
        include: {
            department: true,
            performances: {
                where: { month: currentMonth, year: currentYear }
            }
        },
        orderBy: { department: { name: "asc" } },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">월별 실적 입력</h2>
                    <p className="text-slate-400 mt-1">{currentYear}년 {currentMonth}월 실적을 입력하고 관리합니다.</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2 rounded-xl backdrop-blur-sm">
                    <Calendar size={18} className="text-blue-500 ml-2" />
                    <span className="text-white font-bold mr-2">{currentYear}년 {currentMonth}월</span>
                </div>
            </div>

            <div className="space-y-4">
                {projects.length === 0 ? (
                    <div className="p-20 rounded-[2rem] bg-slate-900/20 border border-slate-800/40 border-dashed flex flex-col items-center justify-center text-center">
                        <AlertCircle size={48} className="text-slate-800 mb-4" />
                        <p className="text-slate-500 font-bold tracking-tight">입력 가능한 활성 사업이 없습니다.</p>
                        <p className="text-slate-700 text-sm mt-1">사업 관리 메뉴에서 사업을 먼저 등록하거나 활성화해 주세요.</p>
                    </div>
                ) : (
                    projects.map((project: any) => {
                        const perf = project.performances[0];
                        const isCompleted = !!perf;

                        return (
                            <div key={project.id} className={`group p-6 rounded-[2rem] border transition-all duration-300 backdrop-blur-md ${isCompleted
                                ? "bg-emerald-500/[0.03] border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                                : "bg-slate-900/40 border-slate-800/60 hover:border-slate-700 shadow-sm"
                                }`}>
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    {/* Left: Project Info */}
                                    <div className="space-y-2 flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            {isCompleted ? (
                                                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                                    <CheckCircle2 size={10} />
                                                    입력완료
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
                                                    <AlertCircle size={10} />
                                                    입력대기
                                                </div>
                                            )}
                                            <span className="text-slate-500 text-xs">•</span>
                                            <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                                                <Building2 size={12} />
                                                {project.department.name}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">{project.projectName}</h3>
                                    </div>

                                    {/* Right: Input Logic (Placeholder for Form) */}
                                    <div className="flex flex-wrap items-center gap-6 lg:gap-10">
                                        <div className="text-center md:text-left">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">목표</p>
                                            <p className="text-sm font-bold text-slate-300">{project.targetSavingRate}% 절감</p>
                                        </div>

                                        <div className="w-full md:w-auto flex items-center gap-4">
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    placeholder="실제 절감률 (%)"
                                                    defaultValue={perf?.actualRate || ""}
                                                    className="w-full md:w-32 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-slate-700"
                                                />
                                                <span className="absolute right-3 top-2.5 text-slate-600 font-bold text-sm">%</span>
                                            </div>
                                            <button className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${isCompleted
                                                ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                                                }`}>
                                                저장
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
