import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const roadmaps = await sql`
      SELECT * FROM roadmaps WHERE id = ${id} LIMIT 1
    `;

    if (roadmaps.length === 0) {
      return Response.json({ error: "Roadmap not found" }, { status: 404 });
    }

    return Response.json({ roadmap: roadmaps[0] });
  } catch (error) {
    console.error("GET /api/roadmaps/[id] error:", error);
    return Response.json({ error: "Failed to fetch roadmap" }, { status: 500 });
  }
}
