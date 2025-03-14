"use client";

import QuestionNavigation from '@/components/QuestionNavigation';
import { useEffect, useState } from 'react';
import { Radio, RadioGroup } from '@heroui/react';
import { Q1 } from '@/model/QuestionModel';

export default function Page() {

  const [selectedValue, setSelectedValue] = useState("1");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = sessionStorage.getItem("Q1");
      let q1: Q1 = { attendance: "" };
      if (storedValue) {
        q1 = JSON.parse(storedValue) as Q1;
        setSelectedValue(q1.attendance)
      }
      else {
        sessionStorage.setItem("Q1", JSON.stringify({ attendance: selectedValue }));
      }
    }
  })

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    sessionStorage.setItem("Q1", JSON.stringify({ attendance: value }));
  };

  return (
    <>
      <div>
        <h1>triage 1</h1>

        <RadioGroup value={selectedValue} onValueChange={handleRadioChange}>
          <Radio value="1">I am here for myself</Radio>
          <Radio value="2">I am here for someone else</Radio>
        </RadioGroup>

        <QuestionNavigation next="/triage/2" />
      </div>
    </>
  )

}