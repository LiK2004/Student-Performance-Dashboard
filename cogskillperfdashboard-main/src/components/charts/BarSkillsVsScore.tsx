"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export type SkillBarDatum = { skill: string; correlation: number };

export default function BarSkillsVsScore({ data }: { data: SkillBarDatum[] }) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="skill" />
          <YAxis domain={[-1, 1]} />
          <Tooltip />
          <Bar dataKey="correlation" fill="hsl(var(--chart-3))" radius={6} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}