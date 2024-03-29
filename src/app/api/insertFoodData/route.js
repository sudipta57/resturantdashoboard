import foodData from "@/models/fooditemschema";
import dbConnect from "@/utils/connection";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  await dbConnect();

  try {
    const body = await req.json();
    const { foodcat, foodname, image, pricehalf, description } = body;

    // Sample data to insert
    const sampleFoodData = {
      CategoryName: foodcat,
      name: foodname,
      img: image,
      description: description,
      pricehalf: pricehalf,
    };

    // Insert the sample data into the FoodData collection
    const result = await foodData.create(sampleFoodData);

    return NextResponse.json(
      { message: "File uploaded successfully", result },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
