import { TriageResult } from "@/lib/triage/TriageReult";
import { StepAttendanceProps } from "@/model/QuestionModel";
import { Checkbox, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";

export default function StepResult({ result, evaluation }: TriageResult) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Result</h2>
        <p className="text-default-500 text-large">{evaluation} </p>
        <div className="pt-2">          
        </div>
      </div>
    </div>
  )
}