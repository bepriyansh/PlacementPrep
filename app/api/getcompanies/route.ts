import path from "path";
import { promises as fs } from "fs";

import { NextResponse } from "next/server";

const capitalizeFirstLetter = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export async function GET() {
  try {
    const questionsDirectory = path.join(process.cwd(), "config", "questions");
    const files = await fs.readdir(questionsDirectory);
    const filenames = files
      .map((filename) => capitalizeFirstLetter(path.parse(filename).name))
      .sort();

    return NextResponse.json({ companies: filenames }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to list files" },
      { status: 500 },
    );
  }
}
