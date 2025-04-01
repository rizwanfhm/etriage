import fs from 'fs';
import path from 'path';

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  try {

    const filePath = path.join(process.cwd(), 'lib/data/conditions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const conditionsData = JSON.parse(fileContent);

    return NextResponse.json({ status: 200, body: conditionsData });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, body: { error: "Internal Server Error" } });
  }

}