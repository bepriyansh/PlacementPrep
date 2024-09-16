"use client";
import React, { useEffect, useRef, useState } from "react";
import { SiLeetcode } from "react-icons/si";
import { Spinner } from "@nextui-org/spinner";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import { FcCollapse, FcExpand } from "react-icons/fc";

import { getQuestions } from "@/utils/requestFunctions";
import { CompanyInterface, CompanyQuestion } from "@/types/interfaces";

const QuestionList = (props: CompanyInterface) => {
  const cols = ["", "Index", "Question", "Link", "Occurrence"];
  const [questions, setQuestions] = useState<CompanyQuestion[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CompanyQuestion;
    direction: "asc" | "desc";
  } | null>(null);

  const initialized = useRef(false);

  useEffect(() => {
    const action = async () => {
      const data = await getQuestions(props.name);

      setQuestions(data);
    };

    if (!initialized.current) {
      initialized.current = true;
      action();
    }
  }, [props.name]);

  // Sorting function
  const sortQuestions = (key: keyof CompanyQuestion) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    const sortedData = [...questions].sort((a, b) => {
      const aValue = key === "num_occur" ? Number(a[key]) : a[key];
      const bValue = key === "num_occur" ? Number(b[key]) : b[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;

      return 0;
    });

    setSortConfig({ key, direction });
    setQuestions(sortedData);
  };

  return (
    <div className="bg-default-50 p-4 rounded-xl max-h-[600px] overflow-y-auto">
      <div className="w-full">
        <div className="grid items-center grid-cols-[minmax(40px,auto),minmax(90px,auto),minmax(150px,1fr),minmax(90px,auto),minmax(90px,auto)] px-4 bg-default-100 text-center sticky top-0 rounded-lg shadow-lg mb-1 py-1 z-20">
          {cols.map((col, i) => (
            <button
              key={i}
              className="text-sm py-2 cursor-pointer hover:text-gray-700 duration-200 flex justify-center items-center gap-1"
              onClick={() => {
                if (i === 1) sortQuestions("index");
                else if (i === 2) sortQuestions("problem_name");
                else if (i === 4) sortQuestions("num_occur");
              }}
            >
              {col}
              {sortConfig?.key ===
                (i === 1
                  ? "index"
                  : i === 2
                    ? "problem_name"
                    : i === 4
                      ? "num_occur"
                      : "") && (
                <>
                  {sortConfig.direction === "asc" ? (
                    <FcCollapse size={10} />
                  ) : (
                    <FcExpand size={10} />
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        {questions.map((question, i) => (
          <Link
            key={question.index}
            isExternal
            className={`grid items-center grid-cols-[minmax(40px,auto),minmax(90px,auto),minmax(150px,1fr),minmax(90px,auto),minmax(90px,auto)]  ${i % 2 === 1 ? "bg-gray-700/5 dark:bg-slate-100/5" : ""} hover:bg-gray-700/10 hover:dark:bg-slate-100/10 text-inherit hover:text-blue-600 py-1 px-4 rounded-lg`}
            href={question.problem_link}
          >
            <div className="text-center">
              <Checkbox />
            </div>
            <div className="text-center">{question.index}</div>
            <Link
              isExternal
              className="text-inherit"
              href={question.problem_link}
            >
              {question.problem_name}
            </Link>
            <div className="text-center">
              <Link isExternal href={question.problem_link}>
                <SiLeetcode size={25} />
              </Link>
            </div>
            <div className="text-center">{question.num_occur}</div>
          </Link>
        ))}
      </div>

      {questions.length === 0 ? (
        <div className="flex w-full justify-center items-center h-32">
          <Spinner label="Loading..." />
        </div>
      ) : null}
    </div>
  );
};

export default QuestionList;
