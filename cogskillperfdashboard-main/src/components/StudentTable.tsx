"use client";
import { useMemo, useState } from "react";
import type { Student } from "@/lib/data";

function sortBy<T>(arr: T[], key: keyof T, dir: "asc" | "desc") {
  const mul = dir === "asc" ? 1 : -1;
  return [...arr].sort((a, b) => {
    const av = a[key] as any;
    const bv = b[key] as any;
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * mul;
    return String(av).localeCompare(String(bv)) * mul;
  });
}

export default function StudentTable({ students }: { students: Student[] }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Student>("assessment_score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const base = q
      ? students.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.student_id.toLowerCase().includes(q) ||
            s.class.toLowerCase().includes(q)
        )
      : students;
    return sortBy(base, sortKey, sortDir);
  }, [students, search, sortKey, sortDir]);

  const header = (
    key: keyof Student,
    label: string,
    numeric?: boolean
  ) => (
    <th
      className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground select-none cursor-pointer"
      onClick={() => {
        if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
        else {
          setSortKey(key);
          setSortDir(numeric ? "desc" : "asc");
        }
      }}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortKey === key ? (
          <span className="text-[10px]">{sortDir === "asc" ? "▲" : "▼"}</span>
        ) : null}
      </div>
    </th>
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="text-sm font-medium">Students</h3>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, id, class..."
          className="h-9 w-60 rounded-md border px-3 text-sm bg-background"
        />
      </div>
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {header("student_id", "ID")}
              {header("name", "Name")}
              {header("class", "Class")}
              {header("comprehension", "Compr.", true)}
              {header("attention", "Attention", true)}
              {header("focus", "Focus", true)}
              {header("retention", "Retention", true)}
              {header("engagement_time", "Eng. Time", true)}
              {header("assessment_score", "Score", true)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.student_id} className="even:bg-muted/30">
                <td className="px-3 py-2 whitespace-nowrap">{s.student_id}</td>
                <td className="px-3 py-2 whitespace-nowrap">{s.name}</td>
                <td className="px-3 py-2 whitespace-nowrap">{s.class}</td>
                <td className="px-3 py-2 text-right">{s.comprehension.toFixed(0)}</td>
                <td className="px-3 py-2 text-right">{s.attention.toFixed(0)}</td>
                <td className="px-3 py-2 text-right">{s.focus.toFixed(0)}</td>
                <td className="px-3 py-2 text-right">{s.retention.toFixed(0)}</td>
                <td className="px-3 py-2 text-right">{s.engagement_time.toFixed(0)}</td>
                <td className="px-3 py-2 text-right font-medium">{s.assessment_score.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}