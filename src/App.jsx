import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { extractText } from "./utils/pdfReader";
import { extractSkills, calculateMatch } from "./utils/skillMatcher";
import { jobRoles } from "./data/jobRoles";
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

    // Resume-based skill extraction (LOCAL)
    const detectedSkills = extractSkills(resumeText);
    setSkills(detectedSkills);

    // Missing skills (LOCAL)
    const jobSkills = jobRoles["Frontend Developer"];
    const missing = jobSkills.filter(
      (skill) => !detectedSkills.includes(skill)
    );
    setMissing(missing);

    // Match score (LOCAL)
    const score = calculateMatch(detectedSkills, jobSkills);
    setScore(score);

    // Suggestions (AI later, local now)
    if (!missing.length) {
      setTips(["Your resume already matches the job role well."]);
    } else {
      setTips(
        missing.map(
          (skill) => `Improve your ${skill} by building 1–2 real-world projects`
        )
      );
    }
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
