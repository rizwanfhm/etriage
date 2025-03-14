import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  
  const body = await req.json();

  try {
    return NextResponse.json({ status: 200, body: { message: "Success" } });
  }
  catch (error) {
    console.error(error);
    return { status: 500, body: { error: "Internal Server Error" } };
  }
  
}