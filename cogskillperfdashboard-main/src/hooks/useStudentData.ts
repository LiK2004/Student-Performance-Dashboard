"use client";
import { useMemo } from "react";
import { generateStudents, type Student } from "@/lib/data";
import { computeAverages, computeCorrelations, trainRegression, clusterStudents, summarizeClusters } from "@/lib/analysis";

export function useStudentData(count = 120) {
  return useMemo(() => {
    const students: Student[] = generateStudents(count, 42);

    const featureKeys: (keyof Student)[] = [
      "comprehension",
      "attention",
      "focus",
      "retention",
      "engagement_time",
    ];

    const averages = computeAverages(students);
    const corrs = computeCorrelations(students, featureKeys, "assessment_score");
    const model = trainRegression(students, featureKeys, "assessment_score");
    const clustering = clusterStudents(students, featureKeys, 3);
    const personas = summarizeClusters(clustering, featureKeys);

    return { students, featureKeys, averages, corrs, model, clustering, personas };
  }, [count]);
}