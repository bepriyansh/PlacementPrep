"use client";
import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { getCompanies } from "@/utils/requestFunctions";
import QuestionList from "@/components/questionList";

const Page = () => {
  const [companies, setCompanies] = useState<string[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        const data = await getCompanies();

        setCompanies(data.companies);
      };

      fetchData();
    }
  }, []);

  return (
    <div>
      {companies.length > 0 ? (
        <Accordion variant="bordered">
          {companies.map((company, i) => (
            <AccordionItem key={i} aria-label={company} title={company}>
              <QuestionList name={company} />
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
