import { StepAttendanceProps } from "@/model/QuestionModel";
import { Checkbox, Input, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";

export default function StepVitals({ data, onChange }: StepAttendanceProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Vitals</h2>
        <p className="text-default-500 text-large">Enter your measurements</p>
        
          <Input
            isRequired
            label="Heart Rate"
            placeholder="Enter your heart rate"
            radius="sm"
            value={data.address}
            variant="flat"
            classNames={{
              input: "bg-default-100",
              inputWrapper: "bg-default-100",
            }}
            onValueChange={(value) => onChange("address", value)}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            isRequired
            label="Blood Pressure"
            placeholder="Systolic"
            radius="sm"
            value={data.address}
            variant="flat"
            classNames={{
              input: "bg-default-100",
              inputWrapper: "bg-default-100",
            }}
            onValueChange={(value) => onChange("address", value)}
          />
          <Input
            isRequired
            label="Blood Pressure"
            placeholder="Diaostolic"
            radius="sm"
            value={data.address}
            variant="flat"
            classNames={{
              input: "bg-default-100",
              inputWrapper: "bg-default-100",
            }}
            onValueChange={(value) => onChange("address", value)}
          />
        </div>
      </div>
    </div>
  )
}