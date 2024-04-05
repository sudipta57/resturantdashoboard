import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Corrected import

export function middleware(request) {
  const cookieStore = cookies(request); // Pass the request to the cookies function
  const path = request.nextUrl.pathname;

  // Check if the authtoken cookie exists
  const tokenCookie = cookieStore.get("authtoken");
  const token = tokenCookie ? tokenCookie.value : null;

  // Secret key used to sign the token
  const secretKey = "IAMSUDIPTA8293";

  // Function to verify the token
  const verifyToken = (token) => {
    try {
      return token == secretKey;
    } catch (error) {
      // Handle the error appropriately
      console.error("Token verification failed:", error);
      return false;
    }
  };

  // Verify the token if it exists
  const isTokenVerified = token ? verifyToken(token) : false;

  // Redirect to sign-in if the token is not verified
  if (!isTokenVerified) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Continue with the request if the token is valid
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/addItem"], // Define the routes you want to protect
};
