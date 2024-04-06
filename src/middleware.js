import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = request.nextUrl.pathname;

  if (token && path === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && ["/dashboard", "/addItem"].includes(path)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/dashboard", "/addItem"], // Include the login page in the matcher
};
