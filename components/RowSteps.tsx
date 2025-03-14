import { ComponentProps } from "react";

export default function RowSteps({
  color,
  currentStep,
  steps,
  onStepChange,
}: {
  color: string;
  currentStep: number;
  steps: string[];
  onStepChange: (step: number) => void;
}) {

  function CheckIcon(props: ComponentProps<"svg">) {
    return (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <m.path
          animate={{pathLength: 1}}
          d="M5 13l4 4L19 7"
          initial={{pathLength: 0}}
          strokeLinecap="round"
          strokeLinejoin="round"
          transition={{
            delay: 0.2,
            duration: 0.3,
            ease: "easeOut",
            type: "tween",
          }}
        />
      </svg>
    );
  }


  return (
    <>
    </>
  )
}