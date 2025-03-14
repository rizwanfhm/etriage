"use client";

import { Q1 } from '@/model/QuestionModel';
import { useEffect, useState } from 'react';

export default function QuestionResponses() {

  const [q1, setQ1] = useState<Q1>({ attendance: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setQ1(JSON.parse(sessionStorage.getItem("Q1") || '{}') as Q1);
  }, []);

  return (
    <>
      <div>q1 = {q1.attendance}</div>
    </>

  )
}