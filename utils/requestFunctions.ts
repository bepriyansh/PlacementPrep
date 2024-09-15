import { CompanyData, CompanyQuestion } from "@/types/interfaces";

const getCompanies = async (): Promise<CompanyData[]> => {
  try {
    const res = await fetch("/api/getcompanies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return [];
    }

    const data: CompanyData[] = await res.json();

    return data;
  } catch (error) {
    return [];
  }
};

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

export { getCompanies, getQuestions };
