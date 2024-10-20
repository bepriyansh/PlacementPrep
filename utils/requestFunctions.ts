"use server";
import path from "path";
import fs from "fs";

import csvParser from "csv-parser";

import { CompanyQuestion } from "@/types/interfaces";

// // Discontinued this implementation
// const getQuestions = async (company: string): Promise<CompanyQuestion[]> => {
//   try {
//     const res = await fetch("/api/getquestions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(company),
//     });

//     if (!res.ok) {
//       return [];
//     }
//     const data = await res.json();

//     return data.questions;
//   } catch (error) {
//     return [];
//   }

//   return [];
// };

const validateNumberString = (num: string): Boolean => {
  for (let i = 0; i < num.length; i++) {
    if (num[i] < "0" || num[i] > "9") return false;
  }

  return true;
};

// using server functions directly for fetching the questions
// instead of implementing apis
const getQuestions = async (name: String) => {
  const companyName = name + ".csv";
  const difficulty = ["Medium", "Easy", "Hard", ""];

  try {
    const questionsDirectory = path.join(process.cwd(), "config", "questions");

    const filePath = path.join(questionsDirectory, companyName);

    const results: CompanyQuestion[] = [];

    await new Promise<CompanyQuestion[]>((resolve, reject) => {
      let index = 1;

      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (data) => {
          data.difficulty = data.difficulty.trim();
          if (!difficulty.includes(data.difficulty)) data.difficulty = "";
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
    });

    return results;
  } catch (error) {
    return [];
  }
};

export { getQuestions };
