import ResumeUpload from "../components/ResumeUpload";
import MatchScore from "../components/MatchScore";
import SkillList from "../components/SkillList";
import SkillGap from "../components/SkillGap";
import Suggestions from "../components/Suggestions";

export default function Dashboard({ onUpload, skills, score, missing, tips }) {
  return (
    <div className="container mt-4">
      <h2 className="text-center text-2xl font-bold mb-4">
        AI Resume Analyzer
      </h2>

      <div className="row g-4">
        <div className="col-md-6">
          <ResumeUpload onUpload={onUpload} />
        </div>

        <div className="col-md-6">
          <MatchScore score={score} />
        </div>

        <div className="col-md-6">
          <SkillList skills={skills} />
        </div>

        <div className="col-md-6">
          <SkillGap missing={missing} />
        </div>

        <div className="col-12">
          <Suggestions tips={tips} />
        </div>
      </div>
    </div>
  );
}
