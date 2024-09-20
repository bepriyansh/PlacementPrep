"use client";
import React, { useEffect, useRef, useState } from "react";
import { SiLeetcode } from "react-icons/si";
import { Spinner } from "@nextui-org/spinner";
import { Link } from "@nextui-org/link";
import { FcCollapse, FcExpand } from "react-icons/fc";
import { Input } from "@nextui-org/input";

import { SearchIcon } from "./icons";

import { getQuestions } from "@/utils/requestFunctions";
import { CompanyInterface, CompanyQuestion } from "@/types/interfaces";

const QuestionList = (props: CompanyInterface) => {
  const cols = ["", "Index", "Question", "Difficulty", "Link", "Occurrence"];
  const [questions, setQuestions] = useState<CompanyQuestion[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CompanyQuestion;
    direction: "asc" | "desc";
  } | null>(null);

  const initialized = useRef(false);
  const localStorageKey = "solvedQuestions";
  const [checkedQuestions, setCheckedQuestions] = useState<string[]>([]);

  useEffect(() => {
    const action = async () => {
      const data = await getQuestions(props.name);

      setQuestions(data);
    };

    if (!initialized.current) {
      initialized.current = true;
      action();
      setCheckedQuestions(
        JSON.parse(localStorage.getItem(localStorageKey) || "[]"),
      );
    }
  }, [props.name]);

  const sortQuestions = (key: keyof CompanyQuestion) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    const difficultyOrder: { [key: string]: number } = {
      Hard: 3,
      Medium: 2,
      Easy: 1,
    };

    const sortedData = [...questions].sort((a, b) => {
      let aValue: any = a[key];
      let bValue: any = b[key];

      if (key === "difficulty") {
        aValue = difficultyOrder[a.difficulty] || 0;
        bValue = difficultyOrder[b.difficulty] || 0;
      } else if (key === "num_occur") {
        aValue = Number(a[key]);
        bValue = Number(b[key]);
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;

      return 0;
    });

    setSortConfig({ key, direction });
    setQuestions(sortedData);
  };

  const isSaved = (problemLink: string): boolean => {
    return checkedQuestions.includes(problemLink);
  };

  const handleLinks = (problemLink: string) => {
    if (isSaved(problemLink)) {
      setCheckedQuestions(
        checkedQuestions.filter((link) => link !== problemLink),
      );
    } else {
      setCheckedQuestions([...checkedQuestions, problemLink]);
    }
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(checkedQuestions));
  }, [checkedQuestions]);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const filteredQuestions = questions.filter((question) =>
    question.problem_name.toLowerCase().includes(searchQuery),
  );
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search by question name..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0 mr-1" />
      }
      type="search"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );

  return (
    <div className="bg-default-50 p-4 rounded-xl max-h-[600px] overflow-y-auto">
      <div className="flex justify-end gap-2 w-full">
        <div className="w-full max-w-[400px] mb-5">{searchInput}</div>
      </div>
      <div className="w-full min-w-[600px]">
        <div className="grid items-center grid-cols-[minmax(40px,auto),minmax(90px,auto),minmax(150px,1fr),minmax(90px,auto),minmax(90px,auto),minmax(90px,auto)] px-4 bg-default-100 text-center sticky top-0 rounded-lg shadow-lg mb-1 py-1 z-20">
          {cols.map((col, i) => (
            <button
              key={i}
              className="text-sm py-2 cursor-pointer hover:text-gray-700 duration-200 flex justify-center items-center gap-1"
              onClick={() => {
                if (i === 1) sortQuestions("index");
                else if (i === 2) sortQuestions("problem_name");
                else if (i === 3) sortQuestions("difficulty");
                else if (i === 5) sortQuestions("num_occur");
              }}
            >
              {col}
              {sortConfig?.key ===
                (i === 1
                  ? "index"
                  : i === 2
                    ? "problem_name"
                    : i === 3
                      ? "difficulty"
                      : i === 5
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

        {filteredQuestions.map((question, i) => (
          <Link
            key={question.index}
            isExternal
            className={`grid items-center grid-cols-[minmax(40px,auto),minmax(90px,auto),minmax(150px,1fr),minmax(90px,auto),minmax(90px,auto),minmax(90px,auto)]  ${i % 2 === 1 ? "bg-gray-700/5 dark:bg-slate-100/5" : ""} hover:bg-gray-700/10 hover:dark:bg-slate-100/10 text-inherit hover:text-blue-600 py-1 px-4 rounded-lg`}
            href={question.problem_link}
          >
            <div className="text-center flex items-center justify-center">
              <input
                checked={isSaved(question.problem_link)}
                className="h-4 w-4 text-blue-600"
                type="checkbox"
                onChange={() => handleLinks(question.problem_link)}
              />
            </div>
            <div className="text-center">{question.index}</div>
            <Link
              isExternal
              className="text-inherit"
              href={question.problem_link}
            >
              {question.problem_name}
            </Link>
            <div className="text-center">{question.difficulty}</div>
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
