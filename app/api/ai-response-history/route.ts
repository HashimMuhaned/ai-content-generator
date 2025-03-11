import { NextRequest, NextResponse } from "next/server";
import { getAIResponses } from "@/utils/fetchAIoutput"; // Import fetch function
import { useUser } from "@clerk/nextjs";

export async function GET(req: NextRequest) {
  try {
    // Retrieve user information from Clerk
    const user: any = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      console.error("User email address is undefined.");
      return;
    }

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: User not logged in" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const templateSlug = searchParams.get("templateSlug");

    // Call fetch function with user's email (or userId, depending on your schema)
    const responses = await getAIResponses(templateSlug || undefined, email);

    return NextResponse.json(responses, { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI responses" },
      { status: 500 }
    );
  }
}
