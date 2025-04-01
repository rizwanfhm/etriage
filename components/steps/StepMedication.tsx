import { StepProps } from "@/model/QuestionModel";
import { Textarea } from "@heroui/react";

export default function StepMedication({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Medication</h2>
        <p className="text-default-500 text-large">Enter any medication you are currently taking</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Textarea
            label="First Name"
            placeholder="Enter medication"
            radius="sm"
            value={data.firstName}
            variant="flat"
            className="max-w-xs"
            onValueChange={(value) => onChange("medication", value)}
          />         
        </div>
      </div>
    </div>
  )
}