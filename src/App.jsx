import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { extractText } from "./utils/pdfReader";
import { extractSkills, calculateMatch } from "./utils/skillMatcher";
import { jobRoles } from "./data/jobRoles";
import { getSuggestions } from "./services/suggestions";
// import "./App.css";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState([]);
  const [score, setScore] = useState(0);
  const [missing, setMissing] = useState([]);
  const [tips, setTips] = useState([]);

  // Resume Upload Handler
  const handleUpload = async (file) => {
    console.log("Uploaded file:", file.name);
    const text = await extractText(file);
    setResumeText(text);
  };

  //useEffect FLOW
  useEffect(() => {
    if (!resumeText) return;

    // 1️⃣ Resume-based skill extraction (LOCAL)
    const detectedSkills = extractSkills(resumeText);
    setSkills(detectedSkills);

    // 2️⃣ Missing skills (LOCAL)
    const jobSkills = jobRoles["Frontend Developer"];
    const missing = jobSkills.filter(
      (skill) => !detectedSkills.includes(skill)
    );
    setMissing(missing);

    // 3️⃣ Match score (LOCAL)
    const score = calculateMatch(detectedSkills, jobSkills);
    setScore(score);

    // 4️⃣ Suggestions (AI later, local now)
    getSuggestions(missing).then(setTips);
  }, [resumeText]);

  return (
    <Dashboard
      onUpload={handleUpload}
      skills={skills}
      score={score}
      missing={missing}
      tips={tips}
    />
  );
}

export default App;
