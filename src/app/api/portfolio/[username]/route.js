import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  const { username } = params;

  try {
    const portfolios = await sql`
      SELECT * FROM portfolios WHERE username = ${username} AND is_published = TRUE LIMIT 1
    `;

    if (portfolios.length === 0) {
      return Response.json({ error: "Portfolio not found" }, { status: 404 });
    }

    const portfolio = portfolios[0];
    const portfolioId = portfolio.id;

    const [experiences, skills, projects, education, activities] =
      await Promise.all([
        sql`SELECT * FROM experiences WHERE portfolio_id = ${portfolioId} ORDER BY display_order ASC`,
        sql`SELECT * FROM skills WHERE portfolio_id = ${portfolioId} ORDER BY display_order ASC`,
        sql`SELECT * FROM projects WHERE portfolio_id = ${portfolioId} ORDER BY display_order ASC`,
        sql`SELECT * FROM education WHERE portfolio_id = ${portfolioId} ORDER BY display_order ASC`,
        sql`SELECT * FROM activities WHERE portfolio_id = ${portfolioId} ORDER BY display_order ASC`,
      ]);

    return Response.json({
      portfolio: {
        ...portfolio,
        experiences,
        skills,
        projects,
        education,
        activities,
      },
    });
  } catch (error) {
    console.error("GET /api/portfolio/[username] error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
