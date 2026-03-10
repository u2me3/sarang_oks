# sarang_oks: Hospital Cost Reduction OKS System

인천사랑병원 비용절감 및 OKS(Objectives & Key Success) 성과 관리 시스템입니다.

## 주요 기능
- **OKS 대시보드**: 병원 전체 절감 성과 및 부서별 기여도 시각화
- **부서 관리**: 비용절감 활동 부서 등록 및 관리
- **사업 관리**: 부서별 비용절감 사업(Objective/Key Success) 등록
- **실적 입력**: 월별 실제 절감액 및 절감률 입력 (자동 계산 처리)
- **자동 집계**: 부서/카테고리별 성과 자동 합산 및 리포트

## 기술 스택
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase PostgreSQL
- **ORM**: Prisma 7
- **UI**: Tailwind CSS, Lucide Icons, Recharts
- **Validation**: Zod

## 시작하기

### 1. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env` 파일을 생성하고 Supabase 정보를 입력합니다.
```bash
cp .env.example .env
```

### 2. 의존성 설치 및 DB 설정
```bash
npm install
npx prisma db push
npx prisma db seed
```

### 3. 개발 서버 실행
```bash
npm run dev
```

## 배포 가이드 (Vercel)
1. GitHub 저장소에 코드를 push합니다.
2. Vercel에서 프로젝트를 Import합니다.
3. Vercel 프로젝트 설정의 Environment Variables에 `.env`의 내용을 모두 등록합니다.
4. Build Command에 `npx prisma generate && next build`를 확인합니다.
