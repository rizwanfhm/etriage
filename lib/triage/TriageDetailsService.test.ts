import { TriageDetails } from "@/model/triage/TriageDetails";
import { TriageDetailsService } from "./TriageDetailsService";
import { TriageResultStep, TriageResultStatus } from "./TriageResult";
import { TriageSex } from "@/model/triage/TriagePersonalDetails";
import { a } from "framer-motion/dist/types.d-B50aGbjN";

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

    it('should return GYNAECOLOGY after URINARY if female', async () => {
      const request = {
        sex: TriageSex.FEMALE,
        currentStep: TriageResultStep.URINARY,
      } as unknown as TriageDetails;

      const service = new TriageDetailsService();
      const result = await service.captureDetails(request);

      expect(result.result).toEqual(TriageResultStatus.DETAILS);
      expect(result.nextStep).toEqual(TriageResultStep.GYNAECOLOGY);
    });

    it(('should return FEMALE_HISTORY after GYNAECOLOGY if female'), async () => {
      const request = {
        sex: TriageSex.FEMALE,
        currentStep: TriageResultStep.GYNAECOLOGY,
      } as unknown as TriageDetails;

      const service = new TriageDetailsService();
      const result = await service.captureDetails(request);

      expect(result.result).toEqual(TriageResultStatus.DETAILS);
      expect(result.nextStep).toEqual(TriageResultStep.FEMALE_HISTORY);
    });

    it('should return MALE_HISTORY after URINARY if male', async () => {
      const request = {
        sex: TriageSex.MALE,
        currentStep: TriageResultStep.URINARY,
      } as unknown as TriageDetails;

      const service = new TriageDetailsService();
      const result = await service.captureDetails(request);

      expect(result.result).toEqual(TriageResultStatus.DETAILS);
      expect(result.nextStep).toEqual(TriageResultStep.MALE_HISTORY);
    });
  });

  it('should return MEDICAL_HISTORY after FEMALE_HISTORY', async () => { 
    const request = {
      sex: TriageSex.FEMALE,
      currentStep: TriageResultStep.FEMALE_HISTORY,
    } as unknown as TriageDetails;

    const service = new TriageDetailsService();
    const result = await service.captureDetails(request);

    expect(result.result).toEqual(TriageResultStatus.DETAILS);
    expect(result.nextStep).toEqual(TriageResultStep.MEDICAL_HISTORY);
  });

  it('should return MEDICAL_HISTORY after MALE_HISTORY', async () => { 
    const request = {
      sex: TriageSex.MALE,
      currentStep: TriageResultStep.MALE_HISTORY,
    } as unknown as TriageDetails;

    const service = new TriageDetailsService();
    const result = await service.captureDetails(request);

    expect(result.result).toEqual(TriageResultStatus.DETAILS);
    expect(result.nextStep).toEqual(TriageResultStep.MEDICAL_HISTORY);
  });


});