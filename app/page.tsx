"use client";
import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Input } from "@nextui-org/input";

import QuestionList from "@/components/questionList";
import { CompaniesData } from "@/config/companies";
import { SearchIcon } from "@/components/icons";

const Page = () => {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter companies based on search query
  const filteredCompanies = CompaniesData.filter((company) =>
    company.name.toLowerCase().includes(searchQuery),
  );

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0 mr-1" />
      }
      type="search"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );

  return (
    <div>
      <div className="flex justify-end w-full">
        <div className="w-full max-w-[400px] mb-5">{searchInput}</div>
      </div>
      <Accordion selectionMode="multiple" variant="bordered">
        {filteredCompanies.map((company, i) => (
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
