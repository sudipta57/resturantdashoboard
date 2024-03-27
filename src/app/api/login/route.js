import ResturantInfo from "@/models/resturantinfo";
import dbConnect from "@/utils/connection";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  dbConnect();

  const body = await req.json();
  const { email, password } = body;

  try {
    const userExist = await ResturantInfo.findOne({
      email: email,
    });
    if (!userExist) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        {
          status: 401,
        }
      );
    }

    if (userExist.password === password) {
      return NextResponse.json(
        {
          message: "User Logged in Successful",
        },
        {
          status: 200,
        }
      );
    } else {
      // Password doesn't match
      return NextResponse.json(
        { error: "Invalid email or password" },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
