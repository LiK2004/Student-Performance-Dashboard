export type Student = {
  student_id: string;
  name: string;
  class: string;
  comprehension: number; // 0-100
  attention: number; // 0-100
  focus: number; // 0-100
  retention: number; // 0-100
  engagement_time: number; // minutes 0-120
  assessment_score: number; // 0-100
};

const firstNames = [
  "Alex","Jordan","Taylor","Casey","Riley","Avery","Quinn","Morgan","Parker","Reese",
  "Jamie","Rowan","Skyler","Dakota","Emerson","Finley","Harper","Jules","Kai","Logan"
];
const lastNames = [
  "Smith","Johnson","Brown","Davis","Miller","Wilson","Moore","Taylor","Anderson","Thomas"
];
const classes = ["A", "B", "C", "D"];

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function randn() {
  // Box-Muller transform
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateStudents(count = 120, seed?: number): Student[] {
  if (seed !== undefined) {
    // simple LCG for reproducibility
    let s = seed;
    Math.random = (() => {
      return () => {
        s = (1664525 * s + 1013904223) % 4294967296;
        return s / 4294967296;
      };
    })();
  }

  const students: Student[] = [];
  for (let i = 0; i < count; i++) {
    const base = 55 + 15 * randn();
    const comprehension = clamp(base + 20 * Math.random());
    const attention = clamp(base + 15 * randn() + 10 * Math.random());
    const focus = clamp(base + 10 * randn() + 10 * Math.random());
    const retention = clamp((comprehension + focus) / 2 + 10 * randn());
    const engagement_time = clamp(60 + 20 * randn() + 0.3 * attention, 0, 120);

    // True weights for synthetic generation
    const trueW = { comp: 0.35, att: 0.2, foc: 0.25, ret: 0.3, eng: 0.05 };
    const noise = 8 * randn();
    const scoreRaw =
      trueW.comp * comprehension +
      trueW.att * attention +
      trueW.foc * focus +
      trueW.ret * retention +
      trueW.eng * (engagement_time / 1.2) +
      noise;
    const assessment_score = clamp(scoreRaw / 1.6); // normalize to ~0-100

    const name = `${pick(firstNames)} ${pick(lastNames)}`;
    const student: Student = {
      student_id: `S${(1000 + i).toString()}`,
      name,
      class: `Class ${pick(classes)}`,
      comprehension,
      attention,
      focus,
      retention,
      engagement_time,
      assessment_score,
    };
    students.push(student);
  }
  return students;
}

export function toFeatureMatrix(data: Student[], keys: (keyof Student)[]) {
  const X = data.map((d) => keys.map((k) => Number(d[k])));
  return X;
}

export function toTarget(data: Student[], key: keyof Student) {
  return data.map((d) => Number(d[key]));
}