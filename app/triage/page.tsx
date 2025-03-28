"use client";

import RowSteps from "@/components/RowSteps";
import StepAttendance from "@/components/steps/StepAttendance";
import { Button, Link } from "@heroui/react";
import { useEffect, useState } from "react";
import StepPersonal from "@/components/steps/StepPersonal";
import StepBody from "@/components/steps/StepBody";
import StepConditions from "@/components/steps/StepConditions";
import StepPain from "@/components/steps/StepPain";
import StepVitals from "@/components/steps/StepVitals";
import StepReview from "@/components/steps/StepReview";
import StepResult from "@/components/steps/StepResult";
import { TriageResult, TriageResultStatus, TriageResultStep } from "@/lib/triage/TriageResult";
import { TriageData } from "@/model/triage/TriageData";

export default function Page() {

  enum Steps {
    ATTENDANCE = 0,
    PERSONAL = 1,
    BODY = 2,
    CONDITIONS = 3,
    VITALS = 4,
    PAIN = 5,
    RESULT = 6,
  }

  const STEP_MAPPING = new Map<Steps, string>();
  STEP_MAPPING.set(Steps.PERSONAL, TriageResultStep.PERSONAL);
  STEP_MAPPING.set(Steps.PERSONAL, TriageResultStep.PERSONAL);
  STEP_MAPPING.set(Steps.BODY, TriageResultStep.BODY);
  STEP_MAPPING.set(Steps.ATTENDANCE, TriageResultStep.ADDTENDANCE);
  STEP_MAPPING.set(Steps.VITALS, TriageResultStep.VITALS);
  STEP_MAPPING.set(Steps.CONDITIONS, TriageResultStep.CONDITIONS);
  STEP_MAPPING.set(Steps.PAIN, TriageResultStep.PAIN);
  STEP_MAPPING.set(Steps.RESULT, TriageResultStep.RESULT);

  const INITIAL_FORM_DATA = new TriageData();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [hasResult, setHasResult] = useState(false);
  const [steps, setSteps] = useState<number[]>([Steps.ATTENDANCE]);

  const renderStep = () => {

      switch (currentStep) {
        case Steps.ATTENDANCE:
          return <StepAttendance data={formData} onChange={handleChange} />;
        case Steps.PERSONAL:
          return <StepPersonal data={formData} onChange={handleChange} />;
        case Steps.BODY:
          return <StepBody data={formData} onChange={handleChange} />;
        case Steps.CONDITIONS:
          return <StepConditions data={formData} onChange={handleChange} />
        case Steps.VITALS:
          return <StepVitals data={formData} onChange={handleChange} />;
        case Steps.PAIN:
          return <StepPain data={formData} onChange={handleChange} />;
        case Steps.RESULT:
          if (result) {
            return <StepResult result={result} />;
          }
          return <></>;
        default:
          return <></>;
      }

    return <></>;
  }

  const handleNext = () => {
    if (currentStep < Steps.CONDITIONS && currentStep < Steps.RESULT) {
      const nextStep = currentStep + 1;
      formData.currentStep = STEP_MAPPING.get(nextStep) || TriageResultStep.UNKNOWN;
      setFormData(formData)
      setCurrentStep((prev) => nextStep);
      steps.push(nextStep);
      setSteps(steps => steps);
    }
    else {
      fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setResult(data.body);
          setHasResult(true);

          if (data.body.result === TriageResultStatus.COMPLETE) {
            steps.push(Steps.RESULT);
          }
          else if (data.body.result !== TriageResultStatus.MISSING_DATA) {

            switch (data.body.nextStep) {
              case TriageResultStep.VITALS:
                steps.push(Steps.VITALS);
                break;
              case TriageResultStep.PAIN:
                steps.push(Steps.PAIN);
                break;
              default:
                break;
            }
          }

          const currentStep = steps[steps.length - 1];
          formData.currentStep = STEP_MAPPING.get(currentStep) || TriageResultStep.UNKNOWN;
          setCurrentStep(prev => currentStep);
          setSteps(steps => steps);
          setFormData(formData)

        })
        .catch((error) => console.error(error));
    }
  };

  const handlePrevious = () => {
    if (currentStep > Steps.ATTENDANCE && steps.length > 1) {
      steps.pop();  // remove the last step
      const currentStep = steps[steps.length - 1];
      formData.currentStep = STEP_MAPPING.get(currentStep) || TriageResultStep.UNKNOWN;
      setCurrentStep((prev) => currentStep);      
      setSteps(steps => steps);
      setFormData(formData)
    }
  };

  const handleChange = (key: keyof TriageData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
        <div className="w-full max-w-[800px] space-y-8">


          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">eTriage</h1>
            <p className="text-lg">Welcome to eTriage. Please click the button below to start the triage process.</p>
          </div>

          {/* <div className="space-y-8 rounded-xl bg-white p-6">
            <div className="flex justify-center">
              <RowSteps
                color="primary"
                currentStep={currentStep}
                steps={STEPS}
                onStepChange={setCurrentStep}
              />
            </div>
          </div> */}

          <div>currentStep: {currentStep}</div>
          <div>steps: {steps.map(s => s)}</div>
          <div>step: {formData.currentStep}</div>

          <div className="min-h-[400px]">{renderStep()}</div>

          <div className="flex justify-between pt-4">
            <Button
              className="min-w-[120px]"
              isDisabled={currentStep === 0}
              variant="flat"
              onPress={handlePrevious}
            >
              Previous
            </Button>

            <Button className="min-w-[120px]" color="secondary" onPress={handleNext}>
              Next
            </Button>

          </div>

          <StepReview data={formData} />


        </div>
      </div>
    </>
  )
}
