interface CompanyData {
  companies: string[];
}

const getCompanies = async (): Promise<CompanyData> => {
  try {
    const res = await fetch("/api/getcompanies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return { companies: [] };
    }

    const data: CompanyData = await res.json();

    return data;
  } catch (error) {
    return { companies: [] };
  }
};

export { getCompanies };
