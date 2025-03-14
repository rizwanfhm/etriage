"use client";

import QuestionNavigation from '@/components/QuestionNavigation';
import QuestionResponses from '@/components/QuestionResponses';
import { Form, Input } from '@heroui/react';
import { useEffect, useState } from 'react';

export default function Page() {
  return (
    <>
      <div>
        <h1>triage 3</h1>
      </div>

      <QuestionResponses />

      <QuestionNavigation prev="/triage/2" next="/triage/4" />
    </>

  );
}