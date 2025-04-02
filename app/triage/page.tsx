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
import StepBowel from "@/components/steps/StepBowel";
import StepUrinary from "@/components/steps/StepUrinary";
import StepGynaecology from "@/components/steps/StepGynaecology";
import StepFemaleHistory from "@/components/steps/StepFemaleHistory";
import StepMaleHistory from "@/components/steps/StepMaleHistory";
import StepHistory from "@/components/steps/StepMedicalHistory";
import StepMedication from "@/components/steps/StepMedication";
import StepPresentingComplaintsQuestions from "@/components/steps/StepPresentingComplaintsQuestions";

export default function Page() {

  enum Steps {
    ATTENDANCE = 0,
    PERSONAL = 1,
    PRESENTING_COMPLAINTS = 2,
    CONDITIONS = 3,
    VITALS = 4,
    PAIN = 5,
    PRESENTING_QUESTIONS = 6,
    RESULT = 7,
    BOWEL = 8,
    URINARY = 9,
    GYNAECOLOGY = 10,
    FEMALE_HISTORY = 11,
    MALE_HISTORY = 12,
    MEDICAL_HISTORY = 13,
    MEDICATION = 14,
    OTHER = 15,
  }

  // map the displayed step to the state in the service
  const STEP_MAPPING = new Map<Steps, string>();
  STEP_MAPPING.set(Steps.PERSONAL, TriageResultStep.PERSONAL);
  STEP_MAPPING.set(Steps.PRESENTING_COMPLAINTS, TriageResultStep.PRESENTING_COMPLAINTS);
  STEP_MAPPING.set(Steps.PRESENTING_QUESTIONS, TriageResultStep.PRESENTING_QUESTIONS);
  STEP_MAPPING.set(Steps.ATTENDANCE, TriageResultStep.ADDTENDANCE);
  STEP_MAPPING.set(Steps.VITALS, TriageResultStep.VITALS);
  STEP_MAPPING.set(Steps.CONDITIONS, TriageResultStep.CONDITIONS);
  STEP_MAPPING.set(Steps.PAIN, TriageResultStep.PAIN);
  STEP_MAPPING.set(Steps.RESULT, TriageResultStep.RESULT);
  STEP_MAPPING.set(Steps.BOWEL, TriageResultStep.BOWEL);
  STEP_MAPPING.set(Steps.URINARY, TriageResultStep.URINARY);
  STEP_MAPPING.set(Steps.GYNAECOLOGY, TriageResultStep.GYNAECOLOGY);
  STEP_MAPPING.set(Steps.FEMALE_HISTORY, TriageResultStep.FEMALE_HISTORY);
  STEP_MAPPING.set(Steps.MALE_HISTORY, TriageResultStep.MALE_HISTORY);
  STEP_MAPPING.set(Steps.MEDICAL_HISTORY, TriageResultStep.MEDICAL_HISTORY);
  STEP_MAPPING.set(Steps.MEDICATION, TriageResultStep.MEDICATION);

  const INITIAL_FORM_DATA = new TriageData();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [steps, setSteps] = useState<number[]>([Steps.ATTENDANCE]);
  const [triageResultStep, setTriageResultStep] = useState<TriageResultStep>(TriageResultStep.UNKNOWN);

  const renderStep = () => {

    // render the component based on the current step
    switch (currentStep) {
      case Steps.ATTENDANCE:
        return <StepAttendance data={formData} onChange={handleChange} />;
      case Steps.PERSONAL:
        return <StepPersonal data={formData} onChange={handleChange} />;
      case Steps.PRESENTING_COMPLAINTS:
        return <StepBody data={formData} onChange={handleChange} />;
      case Steps.PRESENTING_QUESTIONS:
        return <StepPresentingComplaintsQuestions data={formData} onChange={handleChange} triageStep={triageResultStep} />;
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
      case Steps.BOWEL:
        return <StepBowel data={formData} onChange={handleChange} />;
      case Steps.URINARY:
        return <StepUrinary data={formData} onChange={handleChange} />;
      case Steps.GYNAECOLOGY:
        return <StepGynaecology data={formData} onChange={handleChange} />;
      case Steps.FEMALE_HISTORY:
        return <StepFemaleHistory data={formData} onChange={handleChange} />;
      case Steps.MALE_HISTORY:
        return <StepMaleHistory data={formData} onChange={handleChange} />;
      case Steps.MEDICAL_HISTORY:
        return <StepHistory data={formData} onChange={handleChange} />;
      case Steps.MEDICATION:
        return <StepMedication data={formData} onChange={handleChange} />;
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
    else if (currentStep >= Steps.RESULT) {
      fetch("/api/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {

          switch (data.body.nextStep) {
            case TriageResultStep.BOWEL:
              steps.push(Steps.BOWEL);
              break;
            case TriageResultStep.URINARY:
              steps.push(Steps.URINARY);
              break;
            case TriageResultStep.GYNAECOLOGY:
              steps.push(Steps.GYNAECOLOGY);
              break;
            case TriageResultStep.FEMALE_HISTORY:
              steps.push(Steps.FEMALE_HISTORY);
              break;
            case TriageResultStep.MALE_HISTORY:
              steps.push(Steps.MALE_HISTORY);
              break;
            case TriageResultStep.MEDICAL_HISTORY:
              steps.push(Steps.MEDICAL_HISTORY);
            case TriageResultStep.MEDICATION:
              steps.push(Steps.MEDICATION);
              break;
            default:
              break;
          }

          const currentStep = steps[steps.length - 1];
          formData.currentStep = STEP_MAPPING.get(currentStep) || TriageResultStep.UNKNOWN;
          setCurrentStep(prev => currentStep);
          setSteps(steps => steps);
          setFormData(formData)

        })
        .catch((error) => console.error(error));
    }
    else if (currentStep <= Steps.RESULT) {
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
              case TriageResultStep.ABDOMINAL_PAIN:
                setTriageResultStep(TriageResultStep.ABDOMINAL_PAIN);
                steps.push(Steps.PRESENTING_QUESTIONS);
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
