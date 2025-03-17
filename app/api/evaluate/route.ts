import { TriageEvaluatorService } from "@/lib/triage/TriageEvaluatorService";
import { NextRequest, NextResponse } from "next/server";
// import { TriageEvaluator } from "@/lib/triage/TriageEvaluator";

export async function POST(req:NextRequest) {
  
  try {

    const body = await req.json();

    const evaluator = new TriageEvaluatorService();
    const triageResult = await evaluator.evaluate(body);

    return NextResponse.json({ status: 200, body: triageResult });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, body: { error: "Internal Server Error" } });
  }
  
}