import { StepProps } from "@/model/QuestionModel";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import { useState } from "react";

export default function StepBowel({ data, onChange }: StepProps) {

  const [selectedConditions, setSelectedConditions] = useState<string[]>(data.bowelHabits);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Change in bowel habit</h2>

        <CheckboxGroup label="Do any of the following apply?" onValueChange={setSelectedConditions} onChange={(value) => onChange("bowelHabits", value)} value={selectedConditions}>        
          <Checkbox value="B1">Diarrhoea</Checkbox>
          <Checkbox value="B2">Constipation</Checkbox>
          <Checkbox value="B3">Alternating between both constipation and diarrhoea</Checkbox>
          <Checkbox value="B4">Pale stools</Checkbox>
          <Checkbox value="B5">Dark urine</Checkbox>
          <Checkbox value="B6">Weight losts </Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  )
}