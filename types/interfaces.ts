interface CompanyData {
  companies: string[];
}

interface CompanyQuestion {
  index: string;
  problem_link: string;
  problem_name: string;
  num_occur: string;
}

interface CompanyInterface {
  name: string;
}

export type { CompanyInterface, CompanyData, CompanyQuestion };
