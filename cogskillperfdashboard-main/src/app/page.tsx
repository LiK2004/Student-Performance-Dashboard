"use client";
import React, { useMemo, useState } from "react";
import OverviewCards from "@/components/OverviewCards";
import BarSkillsVsScore from "@/components/charts/BarSkillsVsScore";
import ScatterAttentionVsScore from "@/components/charts/ScatterAttentionVsScore";
import RadarStudentProfile from "@/components/charts/RadarStudentProfile";
import StudentTable from "@/components/StudentTable";
import Insights from "@/components/Insights";
import { useStudentData } from "@/hooks/useStudentData";

export default function HomePage() {
  const { students, averages, corrs, model, personas } = useStudentData(140);
  const [selectedId, setSelectedId] = useState<string | null>(students[0]?.student_id ?? null);

  const barData = useMemo(
    () => corrs.map((c) => ({ skill: String(c.variable), correlation: c.r })),
    [corrs]
  );
  const scatterData = useMemo(
    () => students.map((s) => ({ attention: s.attention, assessment_score: s.assessment_score, name: s.name })),
    [students]
  );

  const selected = useMemo(() => students.find((s) => s.student_id === selectedId) ?? students[0], [students, selectedId]);

  const radarData = useMemo(() => {
    if (!selected) return [];
    return [
      { metric: "Comprehension", value: selected.comprehension },
      { metric: "Attention", value: selected.attention },
      { metric: "Focus", value: selected.focus },
      { metric: "Retention", value: selected.retention },
      { metric: "Engagement", value: selected.engagement_time },
    ];
  }, [selected]);

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Cognitive Skills & Student Performance</h1>
          <p className="text-sm text-muted-foreground">Synthetic dataset · Interactive dashboard</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1523246191273-4a1121188589?q=80&w=1200&auto=format&fit=crop"
          alt="Classroom"
          className="hidden md:block w-32 h-20 object-cover rounded-md border"
        />
      </header>

      <OverviewCards stats={averages as any} />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border p-4 bg-card">
          <h3 className="text-sm font-medium mb-2">Skill Correlation with Assessment Score</h3>
          <BarSkillsVsScore data={barData} />
        </div>
        <div className="rounded-lg border p-4 bg-card">
          <h3 className="text-sm font-medium mb-2">Attention vs Performance</h3>
          <ScatterAttentionVsScore data={scatterData} />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-lg border p-4 bg-card lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Student Profile</h3>
            <select
              className="h-9 rounded-md border bg-background px-2 text-sm"
              value={selectedId ?? ""}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {students.slice(0, 50).map((s) => (
                <option key={s.student_id} value={s.student_id}>
                  {s.name} ({s.student_id})
                </option>
              ))}
            </select>
          </div>
          <RadarStudentProfile data={radarData} title={selected ? `${selected.name}` : undefined} />
        </div>
        <div className="rounded-lg border p-4 bg-card lg:col-span-2">
          <Insights corrs={corrs} model={model} personas={personas} />
        </div>
      </section>

      <section className="rounded-lg border p-4 bg-card">
        <StudentTable students={students} />
      </section>

      <footer className="text-xs text-muted-foreground pt-4">
        <p>
          Demo dataset generated on the fly. For analysis code, see notebooks/analysis.ipynb and src/lib/analysis.ts.
        </p>
      </footer>
    </div>
  );
}