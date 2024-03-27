import ResturantInfo from "@/models/resturantinfo";
import dbConnect from "@/utils/connection";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await dbConnect();

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
      res.status(200).json({
        message: "User Logged in Successful",
      });
    } else {
      res.status(401).json({
        error: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error(error);
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
