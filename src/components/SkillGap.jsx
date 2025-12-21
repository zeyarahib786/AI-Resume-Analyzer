import { Card, CardContent } from "@mui/material";

export default function SkillGap({ missing }) {
  return (
    <Card className="p-3">
      <CardContent>
        <h4 className="font-semibold mb-2">Missing Skills</h4>

        {missing.length === 0 ? (
          <p className="text-green-600">Great! No major skill gaps 🎉</p>
        ) : (
          <ul className="list-disc ms-4 text-red-500">
            {missing.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
