import { StepProps } from "@/model/QuestionModel";
import { Checkbox, Input, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";

export default function StepPersonal({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Personal</h2>
        <p className="text-default-500 text-large">Enter your basic information</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            isRequired
            label="First Name"
            placeholder="Type your first name here"
            radius="sm"
            value={data.firstName}
            variant="flat"
            classNames={{
              input: "bg-default-100",
              inputWrapper: "bg-default-100",
            }}
            onValueChange={(value) => onChange("firstName", value)}
          />
          <Input
            isRequired
            label="Last Name"
            placeholder="Type your last name here"
            radius="sm"
            value={data.lastName}
            variant="flat"
            classNames={{
              input: "bg-default-100",
              inputWrapper: "bg-default-100",
            }}
            onValueChange={(value) => onChange("lastName", value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            isRequired
            label="Date of Birth"
            placeholder="Type your date of birth here"
            radius="sm"
            value={data.dob}
            variant="flat"
            type="date"
            classNames={{
              input: "bg-default-100",
              inputWrapper: "bg-default-100",
            }}
            onValueChange={(value) => onChange("dob", value)}
          />
          <RadioGroup label="Sex" orientation="horizontal" isRequired onChange={(e) => onChange("sex", e.target.value)}>
            <Radio value="M">Male</Radio>
            <Radio value="F">Female</Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}