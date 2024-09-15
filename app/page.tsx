"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import QuestionList from "@/components/questionList";
import { CompaniesData } from "@/config/companies";

const Page = () => {
  return (
    <div>
      <Accordion>
        {CompaniesData.map((company, i) => (
          <AccordionItem
            key={i}
            aria-label={company.name}
            startContent={
              <div className="border border-slate-500/50 py-2 px-4 rounded-xl mr-3">
                {company.index}
              </div>
            }
            subtitle={
              <p className="flex">
                <span className="text-primary mr-1">{company.questions}</span>{" "}
                questions asked
              </p>
            }
            title={company.name}
          >
            <QuestionList name={company.name} />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Page;
