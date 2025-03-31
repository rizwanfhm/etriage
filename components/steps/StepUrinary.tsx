import { StepAttendanceProps } from "@/model/QuestionModel";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import { useState } from "react";

export default function StepUrinary({ data, onChange }: StepAttendanceProps) {

  const [selectedConditions, setSelectedConditions] = useState<string[]>(data.urinarySymptoms);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Urinary Symptoms</h2>

        <CheckboxGroup label="Do any of the following apply?" onValueChange={setSelectedConditions} onChange={(value) => onChange("urinarySymptoms", value)} value={selectedConditions}>        
          <Checkbox value="U1">Pain when I pass water</Checkbox>
          <Checkbox value="U2">Blood in my urine</Checkbox>
          <Checkbox value="U3">I’m going to the toilet very often to pass water</Checkbox>
          <Checkbox value="U4">I feel like I need to go to the toilet to pass water but only drops come out</Checkbox>
          <Checkbox value="U5">I have severe pain on going to the toilet to pass water</Checkbox>
          <Checkbox value="U6">I have dribbling at the end of passing water</Checkbox>
          <Checkbox value="U7">I have a catheter in which is not draining properly</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  )
}