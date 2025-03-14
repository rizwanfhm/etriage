import { StepAttendanceProps } from "@/model/QuestionModel";
import { useState } from "react"; // Added useState
import { Checkbox, Radio, RadioGroup, Select, SelectItem } from "@heroui/react";

export default function StepPain({ data, onChange }: StepAttendanceProps) {
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null); // State to track selected block

  const handleBlockClick = (index: number) => {
    setSelectedBlock(index === selectedBlock ? null : index); // Toggle block size
    onChange("pain", index); // Update pain value
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Pain</h2>
        <p className="text-default-500 text-large">Are you experiencing any pain? Select from the scale below:</p>
        {/* Scale from 0 to 10 */}
        <div className="flex items-center mt-4">
          {[...Array(11)].map((_, i) => { // Include block 0
            let color;
            if (i === 0) {
              color = 'white'; // Block 0 white
            } else if (i === 4) {
              color = 'yellow'; // Block 5 yellow
            } else if (i < 4) {
              color = `rgb(${i * 51}, 255, 0)`; // Green to yellow
            } else {
              color = `rgb(${255}, ${255 - (i - 4) * 51}, 0)`; // Yellow to red
            }
            const isSelected = selectedBlock === i; // Check if block is selected
            return (
              <div
                key={i}
                className={`flex items-center justify-center border border-black transition-all duration-300 ${
                  isSelected ? "w-28 h-28" : "w-20 h-20"
                }`} // Adjust size based on selection
                style={{ backgroundColor: color }}
                onClick={() => handleBlockClick(i)} // Handle click
              >
                {i}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}