"use client";
import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { getCompanies } from "@/utils/requestFunctions";

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

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div>
      {companies.length > 0 ? (
        <Accordion variant="bordered">
          {companies.map((company, i) => (
            <AccordionItem
              key={i}
              aria-label={company}
              subtitle={<span>0/32</span>}
              title={company}
            >
              {defaultContent}
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
