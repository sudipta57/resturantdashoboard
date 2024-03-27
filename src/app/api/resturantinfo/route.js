import ResturantInfo from "@/models/resturantinfo";
import dbConnect from "@/utils/connection";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await dbConnect();
  const body = await req.json();
  const { resturantName, email, password } = body;

  try {
    const saving = await ResturantInfo.create({
      resturantname: resturantName,
      email,
      password,
    });
    if (!saving) {
      return NextResponse.json(
        {
          error: "Problem in database",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Signed Up successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
