"use client";

import RowSteps from "@/components/RowSteps";
import StepAttendance from "@/components/steps/StepAttendance";
import { Button, Link } from "@heroui/react";
import { useState } from "react";
import { TriageData } from "@/model/QuestionModel";
import StepPersonal from "@/components/steps/StepPersonal";
import StepAbdominal from "@/components/steps/StepResult";
import StepBody from "@/components/steps/StepBody";
import StepConditions from "@/components/steps/StepConditions";
import StepPain from "@/components/steps/StepPain";
import StepVitals from "@/components/steps/StepVitals";
import StepReview from "@/components/steps/StepReview";
import StepResult from "@/components/steps/StepResult";
import { TriageResult } from "@/lib/triage/TriageReult";

export default function Page() {

  const STEPS = [
    { label: "Start" },
    { label: "Personal" },
    { label: "Body" },
    { label: "Conditions" },
    { label: "Vitals" },
    { label: "Pain" },
    // { label: "Abdominal" },
  ]

  const INITIAL_FORM_DATA: TriageData = {
    attendanceReason: "",
    firstName: "",
    lastName: "",
    dob: "",
    sex: "",
    behavingStrangely: false,
    conditions: [],
    heartRate: 0,
    systolicBloodPressure: 0,
    diastolicBloodPressure: 0,
    pain: 0
  }

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [hasResult, setHasResult] = useState(false);

  const renderStep = () => {

    if (result && hasResult) {
      const {result: triageResult, evaluation} = result;
      // setHasResult(false);
      return <StepResult result={triageResult} evaluation={evaluation} />;
    }

    switch (currentStep) {
      case 0:
        return <StepAttendance data={formData} onChange={handleChange} />;
      case 1:
        return <StepPersonal data={formData} onChange={handleChange} />;
      case 2:
        return <StepBody data={formData} onChange={handleChange} />;
      case 3:
        return <StepConditions data={formData} onChange={handleChange} />;
      case 4:
        return <StepVitals data={formData} onChange={handleChange} />;
      case 5:
        return <StepPain data={formData} onChange={handleChange} />;
      default:
        return <></>;
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {

    fetch("/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data.body);
        setHasResult(true);
        renderStep();
      })
      .catch((error) => console.error(error));
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
            {currentStep === STEPS.length - 1 ? (
              <Button className="min-w-[120px]" color="secondary" onPress={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Button className="min-w-[120px]" color="secondary" onPress={handleNext}>
                Next
              </Button>
            )}
          </div>

          <StepReview data={formData} />


        </div>
      </div>
    </>
  )
}
