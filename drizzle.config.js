import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_t5Upy4NsbScK@ep-wispy-paper-a2aucp1k-pooler.eu-central-1.aws.neon.tech/ai-content-genarator?sslmode=requirepostgresql://neondb_owner:npg_t5Upy4NsbScK@ep-wispy-paper-a2aucp1k-pooler.eu-central-1.aws.neon.tech/ai-content-genarator?sslmode=require",
  },
});
