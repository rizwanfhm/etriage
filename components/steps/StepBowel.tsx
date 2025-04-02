import { TriageCondition } from "@/lib/data/TriageCondition";
import { TriageConditions } from "@/lib/data/TriageConditions";
import { StepProps } from "@/model/QuestionModel";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import { useEffect, useState } from "react";

export default function StepBowel({ data, onChange }: StepProps) {

  const [selectedConditions, setSelectedConditions] = useState<string[]>(data.bowelHabits);
  const [sourceConditions, setSourceConditions] = useState<TriageCondition[]>([]);

  useEffect(() => {
    const fetchConditions = async () => {
      const conditions = await TriageConditions.matchConditions("B.");
      setSourceConditions(conditions);
    };

    fetchConditions();
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Change in bowel habit</h2>

        <CheckboxGroup label="Do any of the following apply?" onValueChange={setSelectedConditions} onChange={(value) => onChange("bowelHabits", value)} value={selectedConditions}>
          {sourceConditions.map((condition) => (
            <Checkbox key={condition.code} value={condition.code}>{condition.condition}</Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    </div>
  )
}