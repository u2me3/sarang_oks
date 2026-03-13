export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { Plus, Building2 } from "lucide-react";
import { createDepartment } from "@/lib/actions/department";
import DeleteDepartmentButton from "@/components/departments/DeleteDepartmentButton";

export default async function DepartmentsPage() {
    const departments = await prisma.department.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">부서 관리</h2>
                    <p className="text-slate-400 mt-1">비용절감 활동을 수행하는 병원 내 부서 목록입니다.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Registration Form */}
                <div className="lg:col-span-1">
                    <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md sticky top-8">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Plus className="text-blue-500" size={20} />
                            새 부서 등록
                        </h3>
                        <form action={async (formData) => {
                            "use server";
                            await createDepartment(formData);
                        }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">부서명</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="예: 기획조정실, 의공팀..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <span>등록하기</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2 space-y-4">
                    {departments.length === 0 ? (
                        <div className="p-20 rounded-3xl bg-slate-900/20 border border-slate-800/40 border-dashed flex flex-col items-center justify-center text-center">
                            <Building2 size={48} className="text-slate-800 mb-4" />
                            <p className="text-slate-500 font-medium">등록된 부서가 없습니다.</p>
                            <p className="text-slate-700 text-sm mt-1">왼쪽 양식을 통해 부서를 먼저 등록해 주세요.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {departments.map((dept: any) => (
                                <div key={dept.id} className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 flex items-center justify-between group hover:border-slate-700 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                                            <Building2 size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{dept.name}</h4>
                                            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold mt-0.5">인천사랑병원</p>
                                        </div>
                                    </div>
                                    <DeleteDepartmentButton id={dept.id} name={dept.name} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
