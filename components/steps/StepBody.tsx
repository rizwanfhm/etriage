import { StepAttendanceProps } from "@/model/QuestionModel";
import { Checkbox, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";

export default function StepBody({ data, onChange }: StepAttendanceProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Body</h2>
        <p className="text-default-500 text-large">Where you having issues?</p>
        <div className="pt-2">
          {/* Human body outline */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-2"></div> {/* Head */}
            <div className="flex items-center">
              <div className="w-8 h-24 bg-gray-300 mr-2"></div> {/* Left Arm */}
              <div className="w-24 h-32 bg-gray-300"></div> {/* Torso */}
              <div className="w-8 h-24 bg-gray-300 ml-2"></div> {/* Right Arm */}
            </div>
            <div className="flex justify-between w-24 mt-2">
              <div className="w-8 h-24 bg-gray-300"></div> {/* Left Leg */}
              <div className="w-8 h-24 bg-gray-300"></div> {/* Right Leg */}
            </div>
          </div>
        </div>
        <div className="pt-2">
          <Checkbox
            color="primary"
            size="md"
            onChange={(e) => onChange("behavingStrangely", e.target.checked)}
          >
            Patient is behaving strangely
          </Checkbox>
        </div>
      </div>
    </div>
  )
}