import path from "path";
import fs from "fs";

import csvParser from "csv-parser";
import { NextRequest, NextResponse } from "next/server";

import { CompanyQuestion } from "@/types/interfaces";

const validateNumberString = (num: string): Boolean => {
  for (let i = 0; i < num.length; i++) {
    if (num[i] < "0" || num[i] > "9") return false;
  }

  return true;
};

export async function POST(req: NextRequest) {
  const companyName = (await req.json()) + ".csv";

  try {
    const questionsDirectory = path.join(process.cwd(), "config", "questions");

    const filePath = path.join(questionsDirectory, companyName);

    const results: CompanyQuestion[] = [];

    const parsedData = await new Promise<CompanyQuestion[]>(
      (resolve, reject) => {
        let index = 1;

        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (data) => {
            if (!validateNumberString(data.num_occur)) {
              data.num_occur = "1";
            }
            results.push({ ...data, index: index++ });
          })
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
