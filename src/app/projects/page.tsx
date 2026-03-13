export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { Plus, Target, Building2, Calendar, MoreHorizontal, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default async function ProjectsPage() {
    const projects = await prisma.costSavingProject.findMany({
        include: { department: true },
        orderBy: { createdAt: "desc" },
    });

    const departments = await prisma.department.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">비용절감 OKS 관리</h2>
                    <p className="text-slate-400 mt-1">부서별로 등록된 비용절감 사업 및 목표를 관리합니다.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                    <Plus size={18} />
                    <span>신규 사업 등록</span>
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="p-20 rounded-[2rem] bg-slate-900/20 border border-slate-800/40 border-dashed flex flex-col items-center justify-center text-center">
                    <Target size={48} className="text-slate-800 mb-4" />
                    <p className="text-slate-500 font-bold tracking-tight">등록된 비용절감 사업이 없습니다.</p>
                    <p className="text-slate-700 text-sm mt-1">부서의 비용절감 목표(OKS)를 먼저 등록해 주세요.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="group p-6 rounded-3xl bg-slate-900/40 border border-slate-800/60 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-md">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="space-y-3 flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                            {project.category}
                                        </span>
                                        <span className="text-slate-500 text-xs">•</span>
                                        <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                                            <Building2 size={12} />
                                            {project.department.name}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate">{project.projectName}</h3>
                                        <p className="text-slate-500 text-sm mt-1 line-clamp-1">{project.objective}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-8 lg:gap-12 pr-4">
                                    <div className="text-center md:text-left">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">기준값</p>
                                        <p className="text-sm font-bold text-slate-200">
                                            {project.calcType === "PERCENT_OF_BASELINE" ? formatCurrency(project.baselineAmount || 0) : "항목별 상이"}
                                        </p>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">목표절감률</p>
                                        <p className="text-sm font-bold text-blue-400">{project.targetSavingRate}%</p>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">기간</p>
                                        <p className="text-sm font-bold text-slate-200 flex items-center gap-1">
                                            <Calendar size={12} />
                                            {project.startMonth}월 ~ {project.endMonth}월
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                                            <MoreHorizontal size={18} />
                                        </button>
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="p-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
                                        >
                                            <ChevronRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
