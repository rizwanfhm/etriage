import { TriageDetails } from "@/model/triage/TriageDetails";
import { TriageResult, TriageResultStatus, TriageResultStep } from "./TriageResult";
import { TriageSex } from "@/model/triage/TriagePersonalDetails";

export class TriageDetailsService {
  async captureDetails(request: TriageDetails): Promise<TriageResult> {
    
    if (request.currentStep === TriageResultStep.RESULT) {
      return new TriageResult(TriageResultStatus.DETAILS, undefined, undefined, TriageResultStep.BOWEL);
    }

    if (request.currentStep === TriageResultStep.BOWEL) {
      return new TriageResult(TriageResultStatus.DETAILS, undefined, undefined, TriageResultStep.URINARY);
    }

    if (request.sex === TriageSex.FEMALE && request.currentStep === TriageResultStep.URINARY) {
      return new TriageResult(TriageResultStatus.DETAILS, undefined, undefined, TriageResultStep.GYNAECOLOGY);
    }

    return new TriageResult(TriageResultStatus.COMPLETE);
  }
}