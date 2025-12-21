// Skill Extraction Logic

const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Bootstrap",
  "Tailwind",
  "Git",
  "API",
];

export function extractSkills(text) {
  if (!text) return [];

  return SKILLS.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
}

export function calculateMatch(userSkills, jobSkills) {
  if (!userSkills.length || !jobSkills.length) return 0;

  const matched = userSkills.filter((skill) => jobSkills.includes(skill));

  return Math.round((matched.length / jobSkills.length) * 100);
}
