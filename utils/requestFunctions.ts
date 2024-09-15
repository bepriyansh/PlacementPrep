import {  CompanyQuestion } from "@/types/interfaces";

const getQuestions = async (company: string): Promise<CompanyQuestion[]> => {
  try {
    const res = await fetch("/api/getquestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(company),
    });

    if (!res.ok) {
      return [];
    }
    const data = await res.json();

    return data.questions;
  } catch (error) {
    return [];
  }

  return [];
};

export {  getQuestions };
