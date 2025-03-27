import { TriageResult } from "@/lib/triage/TriageResult";
import { StepAttendanceProps, StepResultProps } from "@/model/QuestionModel";
import { Checkbox, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";

export default function StepResult({ result }: StepResultProps) {

  const { result: stepResult, evaluation } = result;

  const resultColour = (() => {
    switch (evaluation) {
      case "RED":
        return "red";
      case "ORANGE":
        return "orange";
      case "YELLOW":
        return "yellow";
      case "GREEN":
        return "green";
      default:
        return "blue";
    };
  })();


  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Result</h2>      
        <div className="flex justify-center items-center">
            <div className="w-20 h-20 flex items-center justify-center" style={{ backgroundColor: resultColour }}></div>
        </div>
      </div>
    </div>
  )
}