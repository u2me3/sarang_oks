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

## GitHub 연동
이 프로젝트는 `hospital-okr-manager`와 동일한 계정(`u2me3`)을 기반으로 설정되었습니다.
GitHub에 `sarang_oks` 저장소를 생성한 후 아래 명령어로 연결하실 수 있습니다.

```bash
git remote add origin https://github.com/u2me3/sarang_oks.git
git push -u origin master
```

## Supabase 설정 (Prisma 연동)
`hospital-okr-manager`에서 사용 중인 Supabase 프로젝트와 동기화되었습니다. 
하지만 Prisma ORM을 통한 DB 직접 연결을 위해 아래 환경변수 추가가 필요합니다.

1. `.env` 파일에 아래 정보 입력:
   - `DATABASE_URL`: Supabase > Settings > Database > Connection String (Transaction 모드)
   - `DIRECT_URL`: Supabase > Settings > Database > Connection String (Session 모드)

2. 설정 후 아래 명령어로 DB 스키마 생성:
```bash
npx prisma db push
```

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
