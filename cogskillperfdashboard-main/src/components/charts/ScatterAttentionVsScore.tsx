"use client";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export type ScatterPoint = { attention: number; assessment_score: number; name?: string };

export default function ScatterAttentionVsScore({ data }: { data: ScatterPoint[] }) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="attention" name="Attention" domain={[0, 100]} />
          <YAxis type="number" dataKey="assessment_score" name="Score" domain={[0, 100]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="hsl(var(--chart-2))" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}