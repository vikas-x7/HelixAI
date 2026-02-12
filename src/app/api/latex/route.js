import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const templates = await sql`SELECT * FROM latex_templates`;
    return Response.json({ templates });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch templates" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content } = await request.json();
    const result = await sql`
      INSERT INTO user_latex_docs (user_id, title, content)
      VALUES (${session.user.id}, ${title}, ${content})
      RETURNING *
    `;
    return Response.json({ doc: result[0] });
  } catch (error) {
    return Response.json({ error: "Failed to save document" }, { status: 500 });
  }
}
