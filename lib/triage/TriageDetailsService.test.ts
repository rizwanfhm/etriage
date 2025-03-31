import { TriageDetails } from "@/model/triage/TriageDetails";
import { TriageDetailsService } from "./TriageDetailsService";
import { TriageResultStep, TriageResultStatus } from "./TriageResult";

describe('TriageDetailsService', () => {

  describe('workflow', () => {

    it('should return BOWEL step after RESULT step', async () => {
      const request = {
        currentStep: TriageResultStep.RESULT,
      } as unknown as TriageDetails;

      const service = new TriageDetailsService();
      const result = await service.captureDetails(request);

      expect(result.result).toEqual(TriageResultStatus.DETAILS);
      expect(result.nextStep).toEqual(TriageResultStep.BOWEL);
    });

    it('should return URINARY step after BOWEL step', async () => {
      const request = {
        currentStep: TriageResultStep.BOWEL,
      } as unknown as TriageDetails;

      const service = new TriageDetailsService();
      const result = await service.captureDetails(request);

      expect(result.result).toEqual(TriageResultStatus.DETAILS);
      expect(result.nextStep).toEqual(TriageResultStep.URINARY);
    });

  });

});