import type { Student } from "./data";
import { toFeatureMatrix, toTarget } from "./data";
import * as ss from "simple-statistics";
import { kmeans } from "ml-kmeans";
import MLR from "ml-regression-multivariate-linear";

export type CorrelationResult = {
  variable: keyof Student;
  r: number;
};

export type RegressionModel = {
  coefficients: number[]; // includes intercept as last element
  features: (keyof Student)[];
  predict: (x: Record<keyof Student, number>) => number;
  r2: number;
};

export type ClusteringResult = {
  k: number;
  centroids: number[][];
  clusters: number[]; // cluster index per student
  features: (keyof Student)[];
};

export function computeCorrelations(data: Student[], targets: (keyof Student)[], against: keyof Student): CorrelationResult[] {
  const res: CorrelationResult[] = [];
  const y = data.map((d) => Number(d[against]));
  for (const key of targets) {
    if (key === against) continue;
    const x = data.map((d) => Number(d[key]));
    const r = ss.sampleCorrelation(x, y);
    res.push({ variable: key, r });
  }
  return res.sort((a, b) => Math.abs(b.r) - Math.abs(a.r));
}

export function trainRegression(data: Student[], featureKeys: (keyof Student)[], targetKey: keyof Student): RegressionModel {
  const X = toFeatureMatrix(data, featureKeys);
  const y = toTarget(data, targetKey).map((v) => [v]);
  const mlr = new MLR(X, y);
  const coeffs = [...mlr.weights.map((w) => w[0]), mlr.intercept[0]]; // flatten + intercept

  const predict = (x: Record<keyof Student, number>) => {
    const sum = featureKeys.reduce((acc, k, i) => acc + coeffs[i] * Number(x[k]), 0);
    return sum + coeffs[coeffs.length - 1];
  };

  // R^2 (manual to avoid ss.rSquared(data, func) signature)
  const yTrue = toTarget(data, targetKey);
  const yPred = data.map((row) => predict(row as any));
  const yMean = ss.mean(yTrue);
  const ssRes = yTrue.reduce((acc, yi, i) => acc + Math.pow(yi - yPred[i], 2), 0);
  const ssTot = yTrue.reduce((acc, yi) => acc + Math.pow(yi - yMean, 2), 0);
  const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;

  return { coefficients: coeffs, features: featureKeys, predict, r2 };
}

export function clusterStudents(data: Student[], featureKeys: (keyof Student)[], k = 3): ClusteringResult {
  const X = toFeatureMatrix(data, featureKeys);
  const result = kmeans(X, k, { initialization: "kmeans++" });
  const { clusters } = result;
  // Normalize centroids shape across ml-kmeans versions
  const rawCentroids: any[] = (result as any).centroids ?? [];
  const centers: number[][] = rawCentroids.map((c: any) => (Array.isArray(c) ? (c as number[]) : (c?.centroid as number[]))).filter(Array.isArray);
  return { k, centroids: centers, clusters, features: featureKeys };
}

export function summarizeClusters(result: ClusteringResult, featureKeys = result.features) {
  const centers = Array.isArray(result?.centroids) ? result.centroids : [];
  if (centers.length === 0) return [] as string[];
  return centers.map((center, idx) => {
    if (!Array.isArray(center)) return `Persona ${idx + 1}`;
    const top = center
      .map((v, i) => ({ key: featureKeys[i], v }))
      .filter((x) => typeof x.v === "number" && !Number.isNaN(x.v))
      .sort((a, b) => b.v - a.v)
      .slice(0, 2)
      .map((x) => x.key)
      .join(" & ");
    return `Persona ${idx + 1}: high ${top}`;
  });
}

export function computeAverages(data: Student[]) {
  const keys: (keyof Student)[] = [
    "assessment_score",
    "comprehension",
    "attention",
    "focus",
    "retention",
    "engagement_time",
  ];
  const sums: Record<string, number> = {};
  keys.forEach((k) => (sums[k] = 0));
  data.forEach((d) => keys.forEach((k) => (sums[k] += Number(d[k]))));
  const avg: Record<string, number> = {};
  keys.forEach((k) => (avg[k] = sums[k] / data.length));
  return avg;
}