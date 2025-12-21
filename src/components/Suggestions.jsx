import { Card, CardContent } from "@mui/material";

export default function Suggestions({ tips }) {
  return (
    <Card className="p-3">
      <CardContent>
        <h4 className="font-semibold mb-2">Improvement Suggestions</h4>

        {tips.length === 0 ? (
          <p className="text-gray-500">Upload resume to get suggestions</p>
        ) : (
          <ul className="list-disc ps-4">
            {tips.map((tip, index) => (
              <li key={index} className="mb-2 text-gary-700">
                🚀 {tip}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
