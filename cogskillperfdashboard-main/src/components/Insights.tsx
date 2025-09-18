"use client";
import type { CorrelationResult, RegressionModel } from "@/lib/analysis";

export default function Insights({
  corrs,
  model,
  personas,
}: {
  corrs: CorrelationResult[];
  model: RegressionModel;
  personas: string[];
}) {
  const top = corrs.slice(0, 3);
  const bottom = [...corrs].sort((a, b) => Math.abs(a.r) - Math.abs(b.r)).slice(0, 1);

  return (
    <div className="w-full space-y-3">
      <h3 className="text-sm font-medium">Insights</h3>
      <ul className="list-disc pl-5 text-sm space-y-2">
        <li>
          Strongest correlations with performance: {top
            .map((c) => `${String(c.variable)} (${c.r.toFixed(2)})`)
            .join(", ")}
        </li>
        <li>Model R²: {model.r2.toFixed(2)}. Uses features: {model.features.join(", ")}</li>
        <li>Weakest signal: {bottom.map((c) => `${String(c.variable)} (${c.r.toFixed(2)})`).join(", ")}</li>
        <li>Personas: {personas.join("; ")}</li>
      </ul>
    </div>
  );
}