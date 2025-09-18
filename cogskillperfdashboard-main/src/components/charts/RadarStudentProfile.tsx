"use client";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis, Tooltip } from "recharts";

export type RadarDatum = { metric: string; value: number };

export default function RadarStudentProfile({ data, title }: { data: RadarDatum[]; title?: string }) {
  return (
    <div className="w-full h-80">
      {title ? <h3 className="text-sm font-medium mb-2">{title}</h3> : null}
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius={90}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Tooltip />
          <Radar dataKey="value" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}