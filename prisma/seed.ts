import "dotenv/config";
import { PrismaClient, Category, CalculationType } from '@prisma/client';

const prisma = new PrismaClient({
    datasource: {
        url: process.env.DATABASE_URL
    }
} as any);

async function main() {
    console.log('🌱 Seeding database...');

    // 1. Clear existing data
    await prisma.monthlyPerformance.deleteMany();
    await prisma.costSavingProject.deleteMany();
    await prisma.department.deleteMany();
    await prisma.user.deleteMany();

    // 2. Create Departments
    const departmentNames = [
        'QPS', '심뇌혈관센터', '의공팀', '감염관리실', '진단검사의학과',
        '의료정보팀', '영상의학팀', '전산팀', '영양팀', '구매팀', '시설팀', '재무팀'
    ];

    const departments = await Promise.all(
        departmentNames.map(name => prisma.department.create({ data: { name } }))
    );

    console.log(`✅ Created ${departments.length} departments.`);

    // 3. Create Sample Projects
    const projectSeeds = [
        {
            deptName: '시설팀',
            projectName: '냉난방기 운영 최적화',
            objective: '에너지 효율 극대화',
            keySuccess: '전기료 10% 절감',
            category: Category.ENERGY,
            calcType: CalculationType.PERCENT_OF_BASELINE,
            baselineAmount: 12000000,
            targetSavingRate: 10,
        },
        {
            deptName: '의료정보팀',
            projectName: '종이서식 전산화',
            objective: '페이퍼리스 병원 구현',
            keySuccess: '인쇄비 30% 절감',
            category: Category.PRINTING,
            calcType: CalculationType.PERCENT_OF_BASELINE,
            baselineAmount: 3000000,
            targetSavingRate: 30,
        },
        {
            deptName: '영상의학팀',
            projectName: '조영제 재고관리',
            objective: '재고 회전율 향상',
            keySuccess: '폐기율 5% 감소',
            category: Category.INVENTORY,
            calcType: CalculationType.PERCENT_OF_BASELINE,
            baselineAmount: 8000000,
            targetSavingRate: 5,
        },
        {
            deptName: '진단검사의학과',
            projectName: '시약 재고관리',
            objective: '시약 낭비 최소화',
            keySuccess: '비용 8% 절감',
            category: Category.INVENTORY,
            calcType: CalculationType.PERCENT_OF_BASELINE,
            baselineAmount: 10000000,
            targetSavingRate: 8,
        },
        {
            deptName: '의공팀',
            projectName: '유지보수 업체 계약 점검',
            objective: '고정비용 최적화',
            keySuccess: '계약금액 12% 절감',
            category: Category.MAINTENANCE,
            calcType: CalculationType.PERCENT_OF_BASELINE,
            baselineAmount: 5000000,
            targetSavingRate: 12,
        }
    ];

    for (const p of projectSeeds) {
        const dept = departments.find(d => d.name === p.deptName);
        if (!dept) continue;

        const project = await prisma.costSavingProject.create({
            data: {
                departmentId: dept.id,
                projectName: p.projectName,
                objective: p.objective,
                keySuccess: p.keySuccess,
                description: `${p.projectName} 활동을 통한 비용 절감`,
                category: p.category,
                startMonth: 1,
                endMonth: 12,
                year: 2026,
                calcType: p.calcType,
                baselineAmount: p.baselineAmount,
                targetSavingRate: p.targetSavingRate,
            }
        });

        // Create Sample Performance for Jan & Feb
        await prisma.monthlyPerformance.createMany({
            data: [
                {
                    projectId: project.id,
                    month: 1,
                    year: 2026,
                    actualRate: p.targetSavingRate + (Math.random() * 2),
                    actualAmount: (p.baselineAmount || 0) * ((p.targetSavingRate + 2) / 100),
                    memo: '1월 실적 양호',
                },
                {
                    projectId: project.id,
                    month: 2,
                    year: 2026,
                    actualRate: p.targetSavingRate - (Math.random() * 1),
                    actualAmount: (p.baselineAmount || 0) * ((p.targetSavingRate - 1) / 100),
                    memo: '2월 실적 보고',
                }
            ]
        });
    }

    console.log('✅ Seed completed successfully.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
