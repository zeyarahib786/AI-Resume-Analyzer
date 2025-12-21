import { Card, CardContent } from "@mui/material";

export default function SkillList({ skills }) {
  return (
    <Card className="p-3">
      <CardContent>
        <h4 className="font-semibold mb-2">Detected Skills</h4>

        {skills.length === 0 ? (
          <p className="text-gray-500">No skills detected yet</p>
        ) : (
          <ul className="list-disc ms-4">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
