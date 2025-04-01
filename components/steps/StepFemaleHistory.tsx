import { TriageCondition } from "@/lib/data/TriageCondition";
import { TriageConditions } from "@/lib/data/TriageConditions";
import { StepProps } from "@/model/QuestionModel";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import { useEffect, useState } from "react";

export default function StepFemaleHistory({ data, onChange }: StepProps) {

  const [selectedConditions, setSelectedConditions] = useState<string[]>(data.femaleHistoryConditions);
  const [sourceConditions, setSourceConditions] = useState<TriageCondition[]>([]);

  useEffect(() => {
    const fetchConditions = async () => {
      const conditions = await TriageConditions.matchConditions("F.");
      setSourceConditions(conditions);
    };

    fetchConditions();    
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Female History</h2>

        <CheckboxGroup label="Do any of the following apply?" onValueChange={setSelectedConditions} onChange={(value) => onChange("femaleHistoryConditions", value)} value={selectedConditions}>

          {sourceConditions.map((condition) => (
            <Checkbox value={condition.code}>{condition.condition}</Checkbox>
          ))}
        </CheckboxGroup>

      </div>
    </div>
  )
}