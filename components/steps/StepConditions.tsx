import { StepAttendanceProps } from "@/model/QuestionModel";
import { Checkbox, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";

export default function StepConditions({ data, onChange }: StepAttendanceProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Conditions</h2>
        <p className="text-default-500 text-large">Do any of the following apply?</p>
        <div className="pt-2">
          <Checkbox
            color="primary"
            size="md"
          >
            Drowsy, unconscious, hard to rouse
          </Checkbox>
        </div>
        <div className="pt-2">
          <Checkbox
            color="primary"
            size="md"
          >
            Bleeding that is not rapidly controlled by the application of sustained direct pressure, and in which blood continues to flow heavily or soak through large dressings quickly
          </Checkbox>
        </div>
        <div className="pt-2">
          <Checkbox
            color="primary"
            size="md"
          >
            Blocked airway, not able to breathe, unusual noisy breathing, unable to catch your breath, drooling
          </Checkbox>
        </div>
        <div className="pt-2">
          <Checkbox
            color="primary"
            size="md"
          >
            Feel very hot, pale, sweating profusely
          </Checkbox>
        </div>
        <div className="pt-2">
          <Checkbox
            color="primary"
            size="md"
          >
            Currently fitting
          </Checkbox>
        </div>
      </div>
    </div>
  )
}