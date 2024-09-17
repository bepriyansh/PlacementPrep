interface CompanyData {
  company: string;
  index: string;
}

interface CompanyQuestion {
  index: string;
  problem_link: string;
  problem_name: string;
  num_occur: string;
  difficulty: string;
}

interface CompanyInterface {
  name: string;
}

export type { CompanyInterface, CompanyData, CompanyQuestion };
