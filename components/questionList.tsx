"use client";
import React, { useEffect, useRef, useState } from "react";

import { getQuestions } from "@/utils/requestFunctions";
import { CompanyInterface, CompanyQuestion } from "@/interfaces/interfaces";

const QuestionList = (props: CompanyInterface) => {
  const [questions, setQuestions] = useState<CompanyQuestion[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchData = async () => {
        const data = await getQuestions(props.name);

        setQuestions(data);
      };

      fetchData();
    }
  }, []);

  return (
    <div>
      {questions.map((question, i) => (
        <div key={i}>{question.problem_name}</div>
      ))}
    </div>
  );
};

export default QuestionList;
