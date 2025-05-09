import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AIoutput = pgTable("AIoutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData").notNull(),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy"),
  createdAt: text("createdAt"),
});
