"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const DepartmentSchema = z.object({
    name: z.string().min(1, "부서명을 입력해주세요."),
});

export async function createDepartment(formData: FormData) {
    const name = formData.get("name") as string;

    const validated = DepartmentSchema.safeParse({ name });
    if (!validated.success) return { error: validated.error.issues[0].message };

    try {
        await prisma.department.create({
            data: { name: validated.data.name },
        });
        revalidatePath("/departments");
        return { success: true };
    } catch (e: any) {
        if (e.code === 'P2002') return { error: "이미 존재하는 부서명입니다." };
        return { error: "부서 생성 중 오류가 발생했습니다." };
    }
}

export async function deleteDepartment(id: string) {
    try {
        await prisma.department.delete({ where: { id } });
        revalidatePath("/departments");
        return { success: true };
    } catch (e) {
        return { error: "부서 삭제 중 오류가 발생했습니다." };
    }
}
