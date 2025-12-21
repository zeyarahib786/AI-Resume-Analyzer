import axios from "axios";

const IS_LOCAL = import.meta.env.DEV;

export async function getSuggestions(missingSkills) {
  if (missingSkills.length === 0) {
    return ["Great! Your resume already matches the job role well."];
  }

  // LOCAL fallback (always works)
  if (IS_LOCAL) {
    return missingSkills.map(
      (skill) => `Improve your ${skill} by building 1–2 small projects`
    );
  }

  // REAL AI (after deploy)
  const res = await axios.post("/api/analyzeResume", {
    missingSkills,
  });

  return res.data.suggestions;
}
