import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const portfolios = await sql`
      SELECT * FROM portfolios WHERE user_id = ${userId} LIMIT 1
    `;

    if (portfolios.length === 0) {
      return Response.json({ portfolio: null });
    }

    const portfolio = portfolios[0];
    const portfolioId = portfolio.id;

    // Fetch related data
    const [experiences, skills, projects, education, activities] =
      await sql.transaction([
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
    console.error("GET /api/portfolio error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { username, full_name, headline, about, profile_image } = body;

    if (!username) {
      return Response.json({ error: "Username is required" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO portfolios (user_id, username, full_name, headline, about, profile_image)
      VALUES (${userId}, ${username}, ${full_name}, ${headline}, ${about}, ${profile_image})
      RETURNING *
    `;

    return Response.json({ portfolio: result[0] });
  } catch (error) {
    console.error("POST /api/portfolio error:", error);
    if (error.message.includes("unique constraint")) {
      return Response.json(
        { error: "Username already taken" },
        { status: 400 },
      );
    }
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const {
      id,
      username,
      full_name,
      headline,
      about,
      profile_image,
      is_published,
      experiences,
      skills,
      projects,
      education,
      activities,
    } = body;

    if (!id)
      return Response.json({ error: "Portfolio ID required" }, { status: 400 });

    // Update main portfolio
    await sql`
      UPDATE portfolios 
      SET 
        username = ${username}, 
        full_name = ${full_name}, 
        headline = ${headline}, 
        about = ${about}, 
        profile_image = ${profile_image},
        is_published = ${is_published},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} AND user_id = ${userId}
    `;

    // Handle nested data with delete and re-insert strategy
    // Delete existing entries
    await sql.transaction([
      sql`DELETE FROM experiences WHERE portfolio_id = ${id}`,
      sql`DELETE FROM skills WHERE portfolio_id = ${id}`,
      sql`DELETE FROM projects WHERE portfolio_id = ${id}`,
      sql`DELETE FROM education WHERE portfolio_id = ${id}`,
      sql`DELETE FROM activities WHERE portfolio_id = ${id}`,
    ]);

    // Insert new entries
    if (experiences && experiences.length > 0) {
      for (const exp of experiences) {
        await sql`
          INSERT INTO experiences (portfolio_id, company, role, start_date, end_date, description, display_order)
          VALUES (${id}, ${exp.company}, ${exp.role}, ${exp.start_date}, ${exp.end_date}, ${exp.description}, ${exp.display_order})
        `;
      }
    }

    if (skills && skills.length > 0) {
      for (const skill of skills) {
        await sql`
          INSERT INTO skills (portfolio_id, name, level, category, display_order)
          VALUES (${id}, ${skill.name}, ${skill.level}, ${skill.category}, ${skill.display_order})
        `;
      }
    }

    if (projects && projects.length > 0) {
      for (const proj of projects) {
        await sql`
          INSERT INTO projects (portfolio_id, title, description, image_url, link, technologies, display_order)
          VALUES (${id}, ${proj.title}, ${proj.description}, ${proj.image_url}, ${proj.link}, ${proj.technologies}, ${proj.display_order})
        `;
      }
    }

    if (education && education.length > 0) {
      for (const edu of education) {
        await sql`
          INSERT INTO education (portfolio_id, institution, degree, field, start_date, end_date, display_order)
          VALUES (${id}, ${edu.institution}, ${edu.degree}, ${edu.field}, ${edu.start_date}, ${edu.end_date}, ${edu.display_order})
        `;
      }
    }

    if (activities && activities.length > 0) {
      for (const act of activities) {
        await sql`
          INSERT INTO activities (portfolio_id, title, description, display_order)
          VALUES (${id}, ${act.title}, ${act.description}, ${act.display_order})
        `;
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("PUT /api/portfolio error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
