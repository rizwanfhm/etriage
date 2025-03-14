import { StepAttendanceProps } from "@/model/QuestionModel";
import { Checkbox, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";

export default function StepAttendance({ data, onChange }: StepAttendanceProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Attendance</h2>
        <p className="text-default-500 text-large">Why are you here?</p>
        <div className="pt-2">
          <RadioGroup name="attendance" label="Reason for attendance" isRequired>
            <Radio size='md' value="1" onChange={e => onChange("attendanceReason", e.target.value)}>I am here for myself</Radio>
            <Radio size='md' value="2" onChange={e => onChange("attendanceReason", e.target.value)}>I am here with someone else</Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}