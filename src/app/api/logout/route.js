"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const deleteCookie = cookies().delete("authtoken");
  console.log(deleteCookie);
  if (!deleteCookie) {
    return NextResponse.json(
      { message: "Log out successfull" },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ error: "error in logout" }, { status: 401 });
  }
}
