import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { code, action } = await request.json(); // action: 'fix' | 'generate'

    let prompt = "";
    if (action === "fix") {
      prompt = `Fix any LaTeX errors in the following code and return only the corrected LaTeX code:\n\n${code}`;
    } else {
      prompt = `Generate a LaTeX block for the following request. Return ONLY the LaTeX code:\n\n${code}`;
    }

    const response = await fetch(
      `${process.env.APP_URL}/integrations/chat-gpt/conversationgpt4`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a LaTeX expert. Return only pure LaTeX code without markdown formatting.",
            },
            { role: "user", content: prompt },
          ],
        }),
      },
    );

    const data = await response.json();
    const result = data.choices[0].message.content;

    return Response.json({ result });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return Response.json({ error: "AI Assistant failed" }, { status: 500 });
  }
}
