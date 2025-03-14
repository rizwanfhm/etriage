import { StepAttendanceProps } from "@/model/QuestionModel";
import { Checkbox, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";

export default function StepAbdominal({ data, onChange }: StepAttendanceProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Abdominal</h2>
        <p className="text-default-500 text-large">Why are you here?</p>
        <div className="pt-2">          
        </div>
      </div>
    </div>
  )
}