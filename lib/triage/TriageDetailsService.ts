import { TriageDetails } from "@/model/triage/TriageDetails";
import { TriageResult, TriageResultStatus, TriageResultStep } from "./TriageResult";

export class TriageDetailsService {
  async captureDetails(request: TriageDetails): Promise<TriageResult> {
    
    if (request.currentStep === TriageResultStep.RESULT) {
      return new TriageResult(TriageResultStatus.DETAILS, undefined, undefined, TriageResultStep.BOWEL);
    }

    if (request.currentStep === TriageResultStep.BOWEL) {
      return new TriageResult(TriageResultStatus.DETAILS, undefined, undefined, TriageResultStep.URINARY);
    }

    return new TriageResult(TriageResultStatus.COMPLETE);
  }
}