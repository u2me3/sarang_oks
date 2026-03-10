import prisma from "@/lib/prisma";
import { formatCurrency, formatPercent } from "@/lib/utils";
import {
    TrendingDown,
    LayoutDashboard,
    Target,
    Activity,
    BarChart3,
    PieChart
} from "lucide-react";

export default async function DashboardPage() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = 2026;

    // Real data aggregation
    const projectsCount = await prisma.costSavingProject.count({ where: { isActive: true } });
    const departmentsCount = await prisma.department.count();

    const performances = await prisma.monthlyPerformance.findMany({
        where: { year: currentYear, month: currentMonth },
        include: { project: true }
    });

    const totalMonthlySaving = performances.reduce((acc, p) => acc + p.actualAmount, 0);
    const totalYearlySaving = await prisma.monthlyPerformance.aggregate({
        where: { year: currentYear },
        _sum: { actualAmount: true }
    });

    const stats = [
        { label: "당월 총 절감액", value: formatCurrency(totalMonthlySaving), sub: `프로젝트 ${performances.length}개 집계`, color: "blue", icon: TrendingDown },
        { label: "연 누적 절감액", value: formatCurrency(totalYearlySaving._sum.actualAmount || 0), sub: `${currentYear}년도 합계`, color: "indigo", icon: LayoutDashboard },
        { label: "진행 중 사업", value: `${projectsCount}건`, sub: `전체 ${departmentsCount}개 부서`, color: "emerald", icon: Target },
        { label: "실적 입력 현황", value: `${performances.length}/${projectsCount}`, sub: `입력률 ${projectsCount ? Math.round((performances.length / projectsCount) * 100) : 0}%`, color: "rose", icon: Activity },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">종합 대시보드</h2>
                    <p className="text-slate-400 mt-1">인천사랑병원 OKS 비용절감 성과 실시간 현황</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-1 rounded-xl backdrop-blur-sm">
                    <button className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                        2026년
                    </button>
                    <button className="px-5 py-2 rounded-lg text-slate-400 text-sm font-bold hover:text-slate-200 transition-colors">
                        2025년
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="group relative p-6 rounded-3xl bg-slate-900/40 border border-slate-800/60 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-md overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-colors" />

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-blue-400 transition-colors">
                                    <Icon size={20} />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] mb-1.5">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-bold text-white tracking-tight leading-none">{stat.value}</h3>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="text-[11px] font-bold text-slate-400 px-2.5 py-1 rounded-full bg-slate-950/50 border border-slate-800/50">
                                        {stat.sub}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts (Client Components will be needed for Recharts, using placeholders for now) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800/60 backdrop-blur-md aspect-[16/9] flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.03),transparent)]" />
                    <div className="w-16 h-16 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 text-slate-700 group-hover:text-blue-500/50 transition-colors">
                        <BarChart3 size={32} />
                    </div>
                    <p className="text-slate-400 font-bold tracking-tight">월별 성과 추이 차트 준비 중</p>
                    <p className="text-slate-600 text-xs mt-2 font-medium italic">충분한 실적 데이터가 수집되면 차트가 활성화됩니다.</p>
                </div>

                <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800/60 backdrop-blur-md flex flex-col items-center justify-center group relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,_rgba(99,102,241,0.03),transparent)]" />
                    <div className="w-16 h-16 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 text-slate-700 group-hover:text-indigo-500/50 transition-colors">
                        <PieChart size={32} />
                    </div>
                    <p className="text-slate-400 font-bold tracking-tight">부서별 기여도 순위</p>
                    <p className="text-slate-600 text-xs mt-2 font-medium italic">순위를 결정할 실적 정보가 없습니다.</p>
                </div>
            </div>
        </div>
    );
}
