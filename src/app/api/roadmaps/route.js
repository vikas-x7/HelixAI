import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const roadmaps = await sql`SELECT * FROM roadmaps`;
    return Response.json({ roadmaps });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch roadmaps" },
      { status: 500 },
    );
  }
}
