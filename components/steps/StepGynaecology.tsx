import { StepProps } from "@/model/QuestionModel";
import { Checkbox, CheckboxGroup, Input, Radio, RadioGroup } from "@heroui/react";
import { useState } from "react";

export default function StepGynaecology({ data, onChange }: StepProps) {

  const [selectedConditions, setSelectedConditions] = useState<string[]>(data.gynaecologyConditions);

  return (
    <div className="flex flex-col gap-6">

      <div className="space-y-3">
        <div className="space-y-2">

          <div className="flex items-center justify-between py-1">
            <div className="text-default-500">When was your last period?</div>
            <div>
              <Input
                radius="sm"
                value={data.lastPeriod}
                variant="flat"
                classNames={{
                  input: "bg-default-100",
                  inputWrapper: "bg-default-100",
                }}
                onValueChange={(value) => onChange("lastPeriod", value)}
              />
            </div>
            <span className="font-medium"></span>
          </div>

          <CheckboxGroup label="Do any of the following apply?" onValueChange={setSelectedConditions} onChange={(value) => onChange("gynaecologyConditions", value)} value={selectedConditions}>
            <Checkbox value="F1">Very heavy bleeding</Checkbox>
            <Checkbox value="F2">Very painful period</Checkbox>
            <Checkbox value="F3">No period for a long time than usual</Checkbox>
            <Checkbox value="F4">Period lasting longer than usual</Checkbox>
            <Checkbox value="F5">Unusual Discharge from the vagina</Checkbox>
            <Checkbox value="F6">Irregular periods</Checkbox>
          </CheckboxGroup>


        </div>
      </div>

    </div>
  )
}