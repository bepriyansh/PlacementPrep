interface CompanyData {
  companies: string[];
}

interface CompanyQuestion {
  problem_link: string;
  problem_name: string;
  num_occur: string;
}

interface CompanyInterface {
  name: string;
}

export type { CompanyInterface, CompanyData, CompanyQuestion };
