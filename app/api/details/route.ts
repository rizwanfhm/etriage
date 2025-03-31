import { TriageDetailsService } from "@/lib/triage/TriageDetailsService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  
  try {

    const body = await req.json();

    const evaluator = new TriageDetailsService();
    const triageResult = await evaluator.captureDetails(body);

    return NextResponse.json({ status: 200, body: triageResult });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, body: { error: "Internal Server Error" } });
  }
  
}