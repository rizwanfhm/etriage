"use client";

import QuestionNavigation from '@/components/QuestionNavigation';
import QuestionResponses from '@/components/QuestionResponses';
import { Form, Input } from '@heroui/react';
import { useEffect, useState } from 'react';

export default function Page() {
  return (
    <>
      <div>
        <h1>triage 2</h1>
      </div>

      <div>
        <Form
          className="w-full max-w-xs flex flex-col gap-4">
          <Input
            isRequired
            className="max-w-xs"
            label="Name"
            labelPlacement='outside-left'
            type="text"
            variant="bordered"
          />
          <Input
            isRequired
            className="max-w-xs"
            label="DOB"
            labelPlacement='outside-left'
            type="date"
            variant="bordered"
          />
          <Input
            isRequired
            className="max-w-xs"
            label="Sex"
            labelPlacement='outside-left'
            type="text"
            variant="bordered"
          />
        </Form>
      </div>

      <QuestionResponses />

      <QuestionNavigation prev="/triage/1" next="/triage/3" />
    </>

  );
}