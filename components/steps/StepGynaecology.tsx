import { TriageCondition } from "@/lib/data/TriageCondition";
import { TriageConditions } from "@/lib/data/TriageConditions";
import { StepProps } from "@/model/QuestionModel";
import { Checkbox, CheckboxGroup, Input } from "@heroui/react";
import { useEffect, useState } from "react";

export default function StepGynaecology({ data, onChange }: StepProps) {

  const [selectedConditions, setSelectedConditions] = useState<string[]>(data.gynaecologyConditions);
  const [sourceConditions, setSourceConditions] = useState<TriageCondition[]>([]);

  useEffect(() => {
    const fetchConditions = async () => {
      const conditions = await TriageConditions.matchConditions("G.");
      setSourceConditions(conditions);
    };

    fetchConditions();
  });

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
            {sourceConditions.map((condition) => (
              <Checkbox value={condition.code}>{condition.condition}</Checkbox>
            ))}
          </CheckboxGroup>

        </div>
      </div>

    </div>
  )
}