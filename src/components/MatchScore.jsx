import { LinearProgress } from "@mui/material";

export default function MatchScore({ score }) {
  return (
    <div>
      <h4 className="font-semibold">{score}% Match</h4>
      <LinearProgress variant="determinate" value={score} />
    </div>
  );
}
