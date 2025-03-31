import { StepProps } from "@/model/QuestionModel";
import { Input, Radio, RadioGroup } from "@heroui/react";
import { useState } from "react";

export default function StepGynaecology({ data, onChange }: StepProps) {

  const [selectedConditions, setSelectedConditions] = useState<string>(data.heavyBleeding);

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

          <div className="flex items-center justify-between py-1">
            <div className="text-default-500">Very heavy bleeding?</div>
            <div>
              <RadioGroup orientation="horizontal" onValueChange={setSelectedConditions} value={selectedConditions} onChange={(e) => onChange("heavyBleeding", e.target.value)}>
                <Radio value="Y">Yes</Radio>
                <Radio value="N">No</Radio>
              </RadioGroup>
            </div>
            <span className="font-medium"></span>
          </div>


        </div>
      </div>

    </div>
  )
}