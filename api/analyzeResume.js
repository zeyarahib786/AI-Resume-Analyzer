import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { missingSkills } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a resume expert. Respond ONLY with valid JSON. No explanation.",
        },
        {
          role: "user",
          content: `
Give resume improvement suggestions for these skills:
${missingSkills.join(", ")}

Return JSON only:
{
  "suggestions": []
}
          `,
        },
      ],
    });

    const raw = completion.choices[0].message.content;
    const parsed = safeJsonParse(raw);

    //fallback safety
    if (!parsed || !parsed.suggestions) {
      return res.status(200).json({
        suggestions: missingSkills.map(
          (s) => `Improve your ${s} by building real-world projects`
        ),
      });
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI suggestion failed" });
  }
}
