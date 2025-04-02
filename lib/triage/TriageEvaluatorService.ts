import { AdultAbdominalPain } from "./AdultAbdominalPain";
import { TriageRequest } from "./TriageRequest";
import { TriageResult, TriageResultStatus, TriageResultEvaluation, TriageResultStep } from "./TriageResult";

export class TriageEvaluatorService {

  async evaluate(request: TriageRequest): Promise<TriageResult> {

    // check if any conditions are set
    if (request?.conditions && request.conditions.length > 0) {
      return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.RED);
    }

    if (request.currentStep === TriageResultStep.CONDITIONS) {
      return new TriageResult(TriageResultStatus.INPROGRESS, TriageResultEvaluation.UNKNOWN, undefined, TriageResultStep.VITALS);
    }

    const missingVitals = request.heartRate == null || request.systolicBloodPressure == null || request.diastolicBloodPressure == null;

    // if there are missing vitals and on the vitals step, then return missing data
    if (missingVitals && request.currentStep === TriageResultStep.VITALS) {
      return new TriageResult(TriageResultStatus.MISSING_DATA, TriageResultEvaluation.UNKNOWN, undefined, TriageResultStep.VITALS);
    }

    // if vitals are set then evaluate them
    if (!this.evaluateVitals(request)) {
      return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.RED);
    }    

    switch (request.currentStep) {
      case TriageResultStep.VITALS:
        return new TriageResult(TriageResultStatus.INPROGRESS, TriageResultEvaluation.UNKNOWN, undefined, TriageResultStep.PAIN);        
      case TriageResultStep.PAIN:
        if (AdultAbdominalPain.isApplicable(request)) {
          return new TriageResult(TriageResultStatus.INPROGRESS, TriageResultEvaluation.UNKNOWN, undefined, TriageResultStep.ABDOMINAL_PAIN);        
        }
        else {
          return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.UNKNOWN, undefined, TriageResultStep.UNKNOWN);
        }
      case TriageResultStep.PRESENTING_QUESTIONS:
        const adultAbdominalPain = new AdultAbdominalPain();
        const evaluation = await adultAbdominalPain.evaluate(request);
        return evaluation;
      default:
        return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.UNKNOWN, undefined, TriageResultStep.UNKNOWN);
    }

  }

  private evaluateVitals(request: TriageRequest): boolean{
    if (request.heartRate == null) {
      return false;
    }

    if (request.heartRate <= 40 || request.heartRate >= 120) {
      return false
    }

    if (request.systolicBloodPressure == null) {
      return false;
    }

    if (request.systolicBloodPressure <= 90 || request.systolicBloodPressure >= 180) {
      return false;
    }

    if (request.diastolicBloodPressure == null) {
      return false;
    }

    if (request.diastolicBloodPressure <= 60 || request.diastolicBloodPressure >= 110) {
      return false;
    }

    // Default return value if no conditions are met
    return true;
  }
}