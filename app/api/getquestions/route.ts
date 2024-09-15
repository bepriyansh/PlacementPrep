import path from "path";
import fs from "fs";

import csvParser from "csv-parser";
import { NextRequest, NextResponse } from "next/server";

import { CompanyQuestion } from "@/interfaces/interfaces";

export async function POST(req: NextRequest) {
  const companyName = (await req.json()) + ".csv";

  try {
    const questionsDirectory = path.join(process.cwd(), "config", "questions");

    const filePath = path.join(questionsDirectory, companyName);

    const results: CompanyQuestion[] = [];

    const parsedData = await new Promise<CompanyQuestion[]>(
      (resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (data) => results.push(data))
          .on("end", () => {
            resolve(results);
          })
          .on("error", (error) => {
            reject(error);
          });
      },
    );

    return NextResponse.json({ questions: parsedData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to list questions" },
      { status: 500 },
    );
  }
}
