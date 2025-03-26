import { AdultAbdominalPain } from "./AdultAbdominalPain";
import { TriageRequest } from "./TriageRequest";
import { TriageResult, TriageResultStatus, TriageResultEvaluation, TriageResultStep } from "./TriageResult";

export class TriageEvaluatorService {

  async evaluate(request: TriageRequest): Promise<TriageResult> {

    // check if any conditions are set
    if (request?.conditions && request.conditions.length > 0) {
      return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.RED);
    }

    // if no vitals are set then get request them next
    if (request.heartRate == null || request.systolicBloodPressure == null || request.diastolicBloodPressure == null) {
      return new TriageResult(TriageResultStatus.INPROGRESS, TriageResultEvaluation.UNKNOWN, undefined, TriageResultStep.VITALS);
    }

    // if vitals are set then evaluate them
    if (!this.evaluateVitals(request)) {
      return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.RED);
    }    

    // not got to pain yet
    if (request.pain == null) {
      return new TriageResult(TriageResultStatus.INPROGRESS, TriageResultEvaluation.UNKNOWN, undefined, TriageResultStep.PAIN);
    }

    const pain = request?.pain || 0;

    if (pain >= 0) {
      return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.RED);
    }

    // default to BLUE
    if (pain === 0) {
      return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.BLUE);
    }

    const adultAbdominalPain = new AdultAbdominalPain();
    const evaluation = await adultAbdominalPain.evaluate(request);

    return evaluation
  }

  private evaluateVitals(request: TriageRequest): boolean{
    if (request.heartRate === null) {
      return false;
    }

    if (request.heartRate <= 40 || request.heartRate >= 120) {
      return false
    }

    if (request.systolicBloodPressure === null) {
      return false;
    }

    if (request.systolicBloodPressure <= 90 || request.systolicBloodPressure >= 180) {
      return false;
    }

    if (request.diastolicBloodPressure === null) {
      return false;
    }

    if (request.diastolicBloodPressure <= 60 || request.diastolicBloodPressure >= 110) {
      return false;
    }

    // Default return value if no conditions are met
    return true;
  }
}