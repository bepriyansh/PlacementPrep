"use client";
import React, { useState } from "react";
import { SiLeetcode } from "react-icons/si";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { Link } from "@nextui-org/link";
import { useAsyncList } from "@react-stately/data";

import { CompanyInterface, CompanyQuestion } from "@/types/interfaces";
import { getQuestions } from "@/utils/requestFunctions";
type CompanyQuestionKey = keyof CompanyQuestion;

const QuestionList = (props: CompanyInterface) => {
  const colsNames = [
    { key: "index", label: "Index" },
    { key: "problem_name", label: "Question" },
    { key: "problem_link", label: "Link" },
    { key: "num_occur", label: "Occurrence" },
  ];

  const [isLoading, setIsLoading] = useState(true);

  const list = useAsyncList<CompanyQuestion>({
    async load() {
      const data = await getQuestions(props.name);

      setIsLoading(false);

      return {
        items: data || [],
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column as CompanyQuestionKey];
          let second = b[sortDescriptor.column as CompanyQuestionKey];
          const cmp =
            (parseInt(first as string) || first) <
            (parseInt(second as string) || second)
              ? -1
              : 1;

          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        }),
      };
    },
  });

  return (
    <div>
      <Table
        isHeaderSticky
        isStriped
        aria-label="Example table with client-side sorting"
        classNames={{ base: "max-h-[600px] overflow-y-auto" }}
        color="danger"
        selectionMode="single"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          {colsNames.map((col) => (
            <TableColumn key={col.key} allowsSorting>
              {col.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.problem_name}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "problem_link" ? (
                    <Link
                      isExternal
                      href={item[columnKey as CompanyQuestionKey] as string}
                    >
                      <SiLeetcode size={20} />
                    </Link>
                  ) : (
                    item[columnKey as CompanyQuestionKey]
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuestionList;
