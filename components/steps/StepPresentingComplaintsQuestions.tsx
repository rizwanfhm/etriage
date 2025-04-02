import { TriageCondition } from "@/lib/data/TriageCondition";
import { TriageConditions } from "@/lib/data/TriageConditions";
import { TriageResultStep } from "@/lib/triage/TriageResult";
import { StepProps } from "@/model/QuestionModel";
import { AdultAbdominalPainQuestions } from "@/model/triage/TriageQuestions";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import { useEffect, useState } from "react";

export interface StepPresentingComplaintsQuestionsProps extends StepProps {
  triageStep: TriageResultStep;
}

export default function StepPresentingComplaintsQuestions({ data, onChange, triageStep }: StepPresentingComplaintsQuestionsProps) {

  // const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<TriageCondition[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>(data.presentingComplaintsQuestions);
  
  switch (triageStep) {
    case TriageResultStep.ABDOMINAL_PAIN:
    //  setTitle("Abdominal Pain");

     useEffect(() => {
      const fetchQuestions = async () => {
        const questions = await TriageConditions.presentingComplaintsQuestions(AdultAbdominalPainQuestions);
        setQuestions(questions);
      };
      fetchQuestions();
     }, []);

      break
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        {/* <h2 className="text-2xl font-bold">{title}</h2> */}

        <CheckboxGroup label="Do any of the following apply?" onValueChange={setSelectedConditions}
         onChange={(value) => onChange("presentingComplaintsQuestions", value)} value={selectedConditions}>
          {questions.map((q) => (
            <Checkbox key={q.code} value={q.code}>{q.condition}</Checkbox>
          ))}
        </CheckboxGroup>

      </div>
    </div>
  )
}