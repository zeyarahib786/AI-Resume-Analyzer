import axios from "axios";

const USE_AI = import.meta.env.VITE_USE_AI === "true";

export async function getSuggestions(missingSkills) {
  if (missingSkills.length === 0) {
    return ["Your resume already matches the job role well."];
  }

  // AI suggestions (After Deploy : production)
  if (USE_AI) {
    const res = await axios.post("/api/analyzeResume", {
      missingSkills,
    });
    return res.data.suggestions;
  }

  // Local fallback
  return missingSkills.map(
    (skill) => `Improve your ${skill} by building 1–2 small projects`
  );
}
