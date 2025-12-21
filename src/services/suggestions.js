export async function getSuggestions(missingSkills) {
  if (!missingSkills || missingSkills.length === 0) {
    return ["Great! Your resume already matches the job role well."];
  }

  const prompt = `
Give short, practical resume improvement suggestions
for these missing skills:

${missingSkills.join(", ")}

Return 1 suggestion per skill in bullet points.
`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      throw new Error("OpenAI request failed");
    }

    const data = await res.json();

    return data.choices[0].message.content
      .split("\n")
      .map((line) => line.replace(/^[-•]\s*/, "").trim())
      .filter(Boolean);
  } catch (error) {
    console.error("AI failed, using fallback", error);
    return missingSkills.map(
      (skill) => `Improve your ${skill} by building small projects`
    );
  }
}
