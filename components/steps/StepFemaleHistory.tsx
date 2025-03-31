import { StepProps } from "@/model/QuestionModel";
import { Checkbox, CheckboxGroup, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export default function StepFemaleHistory({ data, onChange }: StepProps) {

  const [selectedConditions, setSelectedConditions] = useState<string[]>(data.femaleHistoryConditions);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Female History</h2>

        <CheckboxGroup label="Do any of the following apply?" onValueChange={setSelectedConditions} onChange={(value) => onChange("femaleHistoryConditions", value)} value={selectedConditions}>
          <Checkbox value="F7">PCOS</Checkbox>
          <Checkbox value="F8">Ovarian problems</Checkbox>
          <Checkbox value="F9">Endometriosis</Checkbox>
          <Checkbox value="F10">Irregular period</Checkbox>
          <Checkbox value="F11">Very heavy period</Checkbox>
          <Checkbox value="F12">Painful period</Checkbox>
          <Checkbox value="F13">Ectopic pregnancy</Checkbox>
          <Checkbox value="F14">Miscarriage</Checkbox>
        </CheckboxGroup>

      </div>
    </div>
  )
}