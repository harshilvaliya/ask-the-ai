import { NextRequest, NextResponse } from "next/server";

// Middleware to handle session cookies
export function middleware(req: NextRequest) {
  // Create a response object
  const res = NextResponse.next();

  // Retrieve the 'sessionId' cookie from the request
  const sessionId = req.cookies.get("sessionId");

  // If the 'sessionId' cookie does not exist, set a new one
  if (!sessionId) {
    // Generate a new UUID for the sessionId cookie
    const newSessionId = crypto.randomUUID();
    // Set the new sessionId cookie on the response
    res.cookies.set("sessionId", newSessionId);
  }

  // Return the response object
  return res;
}
