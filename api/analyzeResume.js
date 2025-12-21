import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { missingSkills } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Give short resume improvement suggestions.",
        },
        {
          role: "user",
          content: `
Give 1 practical resume improvement suggestion for each skill:

${missingSkills.join(", ")}

Return ONLY JSON:
{
  "suggestions": []
}
          `,
        },
      ],
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ error: "AI suggestion failed" });
  }
}
