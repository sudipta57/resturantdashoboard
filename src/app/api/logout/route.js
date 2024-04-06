import { signOut } from "next-auth/react";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  // Server-side handling of the sign-out event
  const signedout = await signOut({ req, res, callbackUrl: "/signin" });
  if (signedout) {
    return NextResponse.json(
      { message: "Loggedout successful" },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ error: "Eror in logout" }, { status: 400 });
  }
}
