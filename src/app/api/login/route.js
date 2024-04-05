"use server";
import { cookies } from "next/headers";
import ResturantInfo from "@/models/resturantinfo";
import dbConnect from "@/utils/connection";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  await dbConnect();
  const body = await req.json();
  const { email, password } = body;
  try {
    const userExist = await ResturantInfo.findOne({ email });
    if (!userExist) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (userExist.password === password) {
      const token = "IAMSUDIPTA8293";
      //save the token to the cookie
      cookies().set("authtoken", token);
      return NextResponse.json(
        { message: "User Logged in Successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 401 }
    );
  }
}
