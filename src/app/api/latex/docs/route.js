import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

// GET: Fetch all user's LaTeX documents
export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const docs = await sql`
      SELECT * FROM user_latex_docs 
      WHERE user_id = ${session.user.id} 
      ORDER BY updated_at DESC
    `;

    return Response.json({ docs });
  } catch (error) {
    console.error("GET /api/latex/docs error:", error);
    return Response.json(
      { error: "Failed to fetch documents" },
      { status: 500 },
    );
  }
}

// POST: Create a new document
export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await request.json();

    if (!title || !content) {
      return Response.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO user_latex_docs (user_id, title, content)
      VALUES (${session.user.id}, ${title}, ${content})
      RETURNING *
    `;

    return Response.json({ doc: result[0] });
  } catch (error) {
    console.error("POST /api/latex/docs error:", error);
    return Response.json({ error: "Failed to save document" }, { status: 500 });
  }
}

// PUT: Update an existing document
export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, title, content } = await request.json();

    if (!id || !title || !content) {
      return Response.json(
        { error: "ID, title and content are required" },
        { status: 400 },
      );
    }

    const result = await sql`
      UPDATE user_latex_docs 
      SET title = ${title}, content = ${content}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND user_id = ${session.user.id}
      RETURNING *
    `;

    if (result.length === 0) {
      return Response.json({ error: "Document not found" }, { status: 404 });
    }

    return Response.json({ doc: result[0] });
  } catch (error) {
    console.error("PUT /api/latex/docs error:", error);
    return Response.json(
      { error: "Failed to update document" },
      { status: 500 },
    );
  }
}
