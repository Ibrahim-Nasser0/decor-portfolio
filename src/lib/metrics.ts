/**
 * Architectural metrics & monograph calculations
 * Pure utility functions safe for both Client and Server Components
 */

export function calculateYearsOfExperience(experience: Array<{ period?: string }> = []): string {
  if (!experience || experience.length === 0) return "07+";
  const years: number[] = [];
  experience.forEach((item) => {
    if (item?.period) {
      const matches = item.period.match(/\b(19\d\d|20\d\d)\b/g);
      if (matches) {
        matches.forEach((m) => {
          const y = parseInt(m, 10);
          if (y > 1900 && y < 2100) years.push(y);
        });
      }
    }
  });
  if (years.length === 0) return "07+";
  const startYear = Math.min(...years);
  const currentYear = new Date().getFullYear();
  // Active calendar years inclusive (e.g. 2020 through 2026 inclusive = 7 active years)
  const yearsCount = Math.max(1, currentYear - startYear + 1);
  return `${String(yearsCount).padStart(2, "0")}+`;
}

export function calculateBuiltWorks(projectsCount: number, offset: number = 80): { total: number; formatted: string } {
  const count = (Number.isFinite(projectsCount) && projectsCount >= 0) ? projectsCount : 5;
  const off = Number.isFinite(offset) ? offset : 80;
  const total = count + off;
  return {
    total,
    formatted: `${total}+`,
  };
}
