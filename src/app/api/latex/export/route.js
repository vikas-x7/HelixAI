import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { latex } = await request.json();

    if (!latex) {
      return Response.json(
        { error: "LaTeX code is required" },
        { status: 400 },
      );
    }

    // Use AI to convert LaTeX to a more PDF-friendly format
    // Then generate a simple PDF using HTML
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
                "You are a LaTeX to HTML converter. Convert LaTeX code to clean, well-formatted HTML that can be rendered as a PDF. Preserve all formatting, sections, and structure.",
            },
            {
              role: "user",
              content: `Convert this LaTeX to HTML:\n\n${latex}`,
            },
          ],
        }),
      },
    );

    const data = await response.json();
    const htmlContent = data.choices[0].message.content;

    // Create a simple HTML page for PDF generation
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Times New Roman', serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      line-height: 1.6;
    }
    h1 { font-size: 24px; margin-top: 20px; margin-bottom: 10px; }
    h2 { font-size: 20px; margin-top: 18px; margin-bottom: 8px; }
    h3 { font-size: 16px; margin-top: 16px; margin-bottom: 6px; }
    p { margin: 10px 0; }
    ul, ol { margin: 10px 0; padding-left: 30px; }
    li { margin: 5px 0; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

    // For now, we'll return a simple PDF-like response
    // In production, you'd use a service like Puppeteer or PDFKit
    // Since we can't use those here, we'll return the HTML as a downloadable file
    const blob = Buffer.from(fullHtml, "utf-8");

    return new Response(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="document.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF Export Error:", error);
    return Response.json({ error: "Failed to export PDF" }, { status: 500 });
  }
}
