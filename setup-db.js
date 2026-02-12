
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function setup() {
    console.log("Setting up database tables...");
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS roadmaps (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        content JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS latex_templates (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS user_latex_docs (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS portfolios (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        full_name TEXT,
        headline TEXT,
        about TEXT,
        profile_image TEXT,
        is_published BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS experiences (
        id SERIAL PRIMARY KEY,
        portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
        company TEXT,
        role TEXT,
        start_date TEXT,
        end_date TEXT,
        description TEXT,
        display_order INTEGER
      )
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY,
        portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
        name TEXT,
        level TEXT,
        category TEXT,
        display_order INTEGER
      )
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
        title TEXT,
        description TEXT,
        image_url TEXT,
        link TEXT,
        technologies TEXT,
        display_order INTEGER
      )
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
        institution TEXT,
        degree TEXT,
        field TEXT,
        start_date TEXT,
        end_date TEXT,
        display_order INTEGER
      )
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS activities (
        id SERIAL PRIMARY KEY,
        portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
        title TEXT,
        description TEXT,
        display_order INTEGER
      )
    `;

        console.log("Database tables setup complete.");
    } catch (error) {
        console.error("Error setting up database:", error);
    }
}

setup();
