import path from "path";
import { promises as fs } from "fs";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const questionsDirectory = path.join(process.cwd(), "config", "questions");
    const files = await fs.readdir(questionsDirectory);
    const filenames = files.map((filename) => path.parse(filename).name);

    return NextResponse.json({ companies: filenames }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to list files" },
      { status: 500 },
    );
  }
}
