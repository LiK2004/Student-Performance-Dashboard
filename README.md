# Cognitive Skills & Student Performance Dashboard

An interactive Next.js dashboard with a synthetic student dataset, exploratory analysis, ML models (regression + k-means clustering), and a companion Jupyter Notebook.

- Dataset fields: student_id, name, class, comprehension, attention, focus, retention, engagement_time, assessment_score
- Features:
  - Overview stats (averages)
  - Charts: Bar (skill vs score correlation), Scatter (attention vs performance), Radar (student profile)
  - Searchable/sortable student table
  - Insights section (top correlations, model R², personas)

## Quick Start (VS Code)

1) Install Node (>= 18) and pnpm or npm. Then install deps:

```bash
npm install
# or
pnpm install
# or
bun install
```

2) Run the app:

```bash
npm run dev
# or: pnpm dev / bun dev
```

Open http://localhost:3000 to view the dashboard.

3) Optional: Open the notebook (Python)

- Create a virtual environment and install Python deps:

```bash
python -m venv .venv && source .venv/bin/activate # Windows: .venv\\Scripts\\activate
pip install numpy pandas scikit-learn seaborn matplotlib jupyter
```

- Launch Jupyter and open notebooks/analysis.ipynb:

```bash
jupyter notebook
```

## Folder Structure

- src/lib/
  - data.ts: synthetic data generator and helpers
  - analysis.ts: correlations, regression model, k-means clustering and summaries
- src/hooks/
  - useStudentData.ts: runs the full pipeline and memoizes results for the UI
- src/components/
  - OverviewCards.tsx
  - Insights.tsx
  - StudentTable.tsx
  - charts/
    - BarSkillsVsScore.tsx
    - ScatterAttentionVsScore.tsx
    - RadarStudentProfile.tsx
- src/app/
  - layout.tsx
  - page.tsx: dashboard UI (client component)
- notebooks/
  - analysis.ipynb: reproducible analysis

## Tech Stack

- Next.js 15 (App Router)
- TypeScript + React
- Tailwind CSS
- Recharts (charts)
- simple-statistics (correlation, R²)
- ml-regression-multivariate-linear (linear regression)
- ml-kmeans (k-means clustering)

## How it Works

- Data generation: src/lib/data.ts creates a reproducible synthetic dataset using a seeded RNG with realistic relationships between cognitive skills and assessment_score.
- Analysis: src/lib/analysis.ts
  - computeCorrelations: Pearson correlation vs assessment_score
  - trainRegression: multivariate linear regression + R²
  - clusterStudents: k-means (k=3) over skills to form personas
- UI binding: src/hooks/useStudentData.ts runs the pipeline and exposes results to pages/components.

## Deployment (Vercel)

1) Push to GitHub (new repo):

```bash
git init
git add .
git commit -m "feat: cognitive skills dashboard"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

2) Deploy

- Go to https://vercel.com/new and import your GitHub repo
- Use default settings (Framework: Next.js)
- Click Deploy and wait for the build to finish
- Share the public URL that Vercel provides

## Findings (from the synthetic data)

- Skills with the strongest positive correlation to assessment_score typically include comprehension, retention, and focus (exact values shown in the dashboard).
- The regression model achieves a solid in-sample R² (see Insights panel) using five features: comprehension, attention, focus, retention, engagement_time.
- K-means personas (3 clusters) separate students by dominant skills, e.g., "high comprehension & retention" or "high attention & engagement".

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ScreenShots
<img width="1917" height="1079" alt="image" src="https://github.com/user-attachments/assets/6240b992-f53b-4b71-aa5e-9928c48fa312" />

<img width="1919" height="1079" alt="Screenshot 2025-09-18 002813" src="https://github.com/user-attachments/assets/e23aa2de-1587-41af-a3b5-7f8cc253592c" />
<img width="1919" height="1068" alt="Screenshot 2025-09-18 002824" src="https://github.com/user-attachments/assets/a73b1298-259a-401f-a4ab-2821778e7ab4" />
<img width="1911" height="956" alt="Screenshot 2025-09-18 002835" src="https://github.com/user-attachments/assets/66ce16db-37b2-43a0-ad9b-18ec293b4ccc" />


