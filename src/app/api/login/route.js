import dbConnect from "@/utils/connection";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  const cookieStore = cookies();
  await dbConnect();
  const data = await req.json();
  const { email, password } = data;
  // const token = cookies().get("next-auth.csrf-token");
  const token = "sudiota";
  return NextResponse.json({ email: email, password, token }, { status: 200 });
}
