"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CalculationType, Category } from "@prisma/client";

const ProjectSchema = z.object({
    departmentId: z.string().min(1, "부서를 선택해주세요."),
    projectName: z.string().min(1, "사업명을 입력해주세요."),
    objective: z.string().min(1, "Objective를 입력해주세요."),
    keySuccess: z.string().min(1, "Key Success를 입력해주세요."),
    description: z.string().optional(),
    category: z.nativeEnum(Category),
    startMonth: z.number().min(1).max(12),
    endMonth: z.number().min(1).max(12),
    calcType: z.nativeEnum(CalculationType),
    baselineAmount: z.number().optional(),
    baselineUsage: z.number().optional(),
    unitCost: z.number().optional(),
    targetSavingRate: z.number().optional(),
});

export async function createProject(data: any) {
    try {
        await prisma.costSavingProject.create({
            data: {
                ...data,
                year: 2026,
            },
        });
        revalidatePath("/projects");
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "사업 등록 중 오류가 발생했습니다." };
    }
}

export async function toggleProjectStatus(id: string, isActive: boolean) {
    try {
        await prisma.costSavingProject.update({
            where: { id },
            data: { isActive },
        });
        revalidatePath("/projects");
        return { success: true };
    } catch (e) {
        return { error: "상태 변경 중 오류가 발생했습니다." };
    }
}
