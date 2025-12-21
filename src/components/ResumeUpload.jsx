// Resume Upload (MUI Card + Tailwind)

import { Card, CardContent, Button } from "@mui/material";

export default function ResumeUpload({ onUpload }) {
  return (
    <Card className="p-4 shadow-lg">
      <CardContent className="text-center">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => onUpload(e.target.files[0])}
          className="mb-3"
        />
        <Button variant="contained">Upload Resume</Button>
      </CardContent>
    </Card>
  );
}
