"use client";
import React from "react";

export default function OverviewCards({
  stats,
}: {
  stats: Record<string, number>;
}) {
  const items = [
    { key: "assessment_score", label: "Avg Score" },
    { key: "comprehension", label: "Avg Comprehension" },
    { key: "attention", label: "Avg Attention" },
    { key: "focus", label: "Avg Focus" },
    { key: "retention", label: "Avg Retention" },
    { key: "engagement_time", label: "Avg Engagement (min)" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
      {items.map((it) => (
        <div key={it.key} className="rounded-lg border p-3 bg-card">
          <div className="text-xs text-muted-foreground">{it.label}</div>
          <div className="text-2xl font-semibold">
            {typeof stats[it.key] === "number" ? stats[it.key].toFixed(1) : "-"}
          </div>
        </div>
      ))}
    </div>
  );
}