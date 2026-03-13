"use client";

import { Trash2 } from "lucide-react";
import { deleteDepartment } from "@/lib/actions/department";

interface DeleteDepartmentButtonProps {
    id: string;
    name: string;
}

export default function DeleteDepartmentButton({ id, name }: DeleteDepartmentButtonProps) {
    return (
        <form action={async () => {
            if (confirm(`${name} 부서를 삭제하시겠습니까?`)) {
                await deleteDepartment(id);
            }
        }}>
            <button className="p-2 rounded-lg text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100">
                <Trash2 size={16} />
            </button>
        </form>
    );
}
