import { db } from "@/utils/PostgressDB";
import { AIoutput } from "@/utils/schema";
import { and, eq } from "drizzle-orm";

// Fetch AI responses (optionally filter by templateSlug or createdBy)
export const getAIResponses = async (
  templateSlug?: string,
  createdBy?: string
) => {
  try {
    let query: any = db.select().from(AIoutput);

    // Apply filters conditionally
    if (templateSlug && createdBy) {
      query = query.where(
        and(
          eq(AIoutput.templateSlug, templateSlug),
          eq(AIoutput.createdBy, createdBy)
        )
      );
    } else if (createdBy) {
      query = query.where(eq(AIoutput.createdBy, createdBy));
    } else if (templateSlug) {
      query = query.where(eq(AIoutput.templateSlug, templateSlug));
    }

    const responses = await query;
    return responses;
  } catch (error) {
    console.error("Error fetching AI responses:", error);
    throw error;
  }
};
