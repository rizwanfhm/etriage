import { StepAttendanceProps } from "@/model/QuestionModel";
import { Checkbox, CheckboxGroup, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";

export default function StepConditions({ data, onChange }: StepAttendanceProps) {

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Conditions</h2>

        <CheckboxGroup label="Do any of the following apply?" onChange={(value) => onChange("conditions", value)}>
          <Checkbox value="C1">Drowsy, unconscious, hard to rouse</Checkbox>
          <Checkbox value="C2">Bleeding that is not rapidly controlled by the application of sustained direct pressure, and in which blood continues to flow heavily or soak through large dressings quickly</Checkbox>
          <Checkbox value="C3">Blocked airway, not able to breathe, unusual noisy breathing, unable to catch your breath, drooling</Checkbox>
          <Checkbox value="C4">Feel very hot, pale, sweating profusely</Checkbox>
          <Checkbox value="C5">Currently fitting</Checkbox>
        </CheckboxGroup>

      </div>
    </div>
  )
}