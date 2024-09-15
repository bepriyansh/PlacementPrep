"use client";
import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { FcDown, FcUp } from "react-icons/fc";

import QuestionList from "@/components/questionList";
import { CompaniesData } from "@/config/companies";
import { SearchIcon } from "@/components/icons";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredCompanies = CompaniesData.filter((company) =>
    company.name.toLowerCase().includes(searchQuery),
  );

  const sortedCompanies = filteredCompanies.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.questions - b.questions;
    } else if (sortOrder === "desc") {
      return b.questions - a.questions;
    } else {
      return 0; // No sorting
    }
  });

  const handleSortChange = () => {
    setSortOrder((prevOrder) => {
      if (prevOrder === "none") return "asc";
      if (prevOrder === "asc") return "desc";

      return "none";
    });
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-transparent border",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search by company..."
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
      <div className="flex justify-between w-full">
        <Button
          endContent={
            sortOrder === "asc" ? (
              <FcDown />
            ) : sortOrder === "desc" ? (
              <FcUp />
            ) : null
          }
          variant="bordered"
          onClick={handleSortChange}
        >
          Sort
        </Button>
        <div className="w-full max-w-[400px] mb-5">{searchInput}</div>
      </div>
      <Accordion selectionMode="multiple" variant="bordered">
        {sortedCompanies.map((company) => (
          <AccordionItem
            key={company.index}
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
