"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function savePerformance(data: {
    projectId: string;
    month: number;
    year: number;
    actualRate?: number;
    actualAmount: number;
    memo?: string;
    isExecuted: boolean;
}) {
    try {
        const { projectId, month, year, ...rest } = data;

        await prisma.monthlyPerformance.upsert({
            where: {
                projectId_year_month: {
                    projectId,
                    year,
                    month,
                },
            },
            update: {
                ...rest,
            },
            create: {
                projectId,
                year,
                month,
                ...rest,
            },
        });

        revalidatePath("/performance");
        revalidatePath("/dashboard");
        revalidatePath("/department-results");
        revalidatePath("/total-results");

        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "실적 저장 중 오류가 발생했습니다." };
    }
}
