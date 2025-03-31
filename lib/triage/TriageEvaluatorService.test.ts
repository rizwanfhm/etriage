import exp from "constants";
import { TriageEvaluatorService } from "./TriageEvaluatorService";
import { TriageRequest } from "./TriageRequest";
import { TriageResultStatus, TriageResultEvaluation, TriageResultStep } from "./TriageResult";

describe('TriageEvaluatorService', () => {

  describe('workflow', () => {

    it('should return the VITALS step when no conditions are set', async () => {
      const request = {
        conditions: [],
        presentingComplaints: [],
        currentStep: TriageResultStep.CONDITIONS,
      } as unknown as TriageRequest;
  
      const service = new TriageEvaluatorService();
      const result = await service.evaluate(request);
  
      expect(result.result).toEqual(TriageResultStatus.INPROGRESS);
      expect(result.nextStep).toEqual(TriageResultStep.VITALS);
    });

    it('should return VITALS when no conditions are set and no vitals are set', async () => {
      const request = {
        conditions: [],
        heartRate: null,
        systolicBloodPressure: null,
        diastolicBloodPressure: null,
        currentStep: TriageResultStep.CONDITIONS,
      } as unknown as TriageRequest;
  
      const service = new TriageEvaluatorService();
      const result = await service.evaluate(request);
  
      expect(result.result).toEqual(TriageResultStatus.INPROGRESS);
      expect(result.nextStep).toEqual(TriageResultStep.VITALS);
    });


    it('should return VITALS when no conditions are set and vitals are set', async () => {
      const request = {
        conditions: [],
        heartRate: 70,
        systolicBloodPressure: 120,
        diastolicBloodPressure: 70,
        currentStep: TriageResultStep.CONDITIONS,
      } as unknown as TriageRequest;
  
      const service = new TriageEvaluatorService();
      const result = await service.evaluate(request);
  
      expect(result.result).toEqual(TriageResultStatus.INPROGRESS);
      expect(result.nextStep).toEqual(TriageResultStep.VITALS);
    });

    it('should return the PAIN step if vitals are normal', async () => {
      const request = {
        heartRate: 70,
        systolicBloodPressure: 120,
        diastolicBloodPressure: 70,
        currentStep: TriageResultStep.VITALS,
      } as unknown as TriageRequest;

      const service = new TriageEvaluatorService();
      const result = await service.evaluate(request);

      expect(result.result).toEqual(TriageResultStatus.INPROGRESS);
      expect(result.nextStep).toEqual(TriageResultStep.PAIN);
    });

  });

  it('should return RED when any CONDITIONS are set', async () => {
    const request = {
      conditions: ["1"],
      presentingComplaints: []
    } as unknown as TriageRequest;

    const service = new TriageEvaluatorService();
    const result = await service.evaluate(request);

    expect(result.result).toEqual(TriageResultStatus.COMPLETE);
    expect(result.evaluation).toEqual(TriageResultEvaluation.RED);
  });

  describe('vitals', () => {
    it.each([
      ["Heart rate above range", 120, 120, 70, TriageResultStatus.COMPLETE, TriageResultEvaluation.RED],
      ["Heart rate below range", 40, 120, 70, TriageResultStatus.COMPLETE, TriageResultEvaluation.RED],
      ["Systolic blood pressure above range", 70, 180, 70, TriageResultStatus.COMPLETE, TriageResultEvaluation.RED],
      ["Systolic blood pressure below range", 70, 90, 70, TriageResultStatus.COMPLETE, TriageResultEvaluation.RED],
      ["Diastolic blood pressure above range", 70, 120, 110, TriageResultStatus.COMPLETE, TriageResultEvaluation.RED],
      ["Diastolic blood pressure below range", 70, 120, 50, TriageResultStatus.COMPLETE, TriageResultEvaluation.RED],
      ["Normal vitals", 70, 120, 70, TriageResultStatus.INPROGRESS, TriageResultEvaluation.UNKNOWN],
    ])('%s', async (_, heartRate, systolicBloodPressure, diastolicBloodPressure, status, evaluation) => {
      const request = {
        heartRate: heartRate,
        systolicBloodPressure: systolicBloodPressure,
        diastolicBloodPressure: diastolicBloodPressure,
        currentStep: TriageResultStep.VITALS,
      } as unknown as TriageRequest;

      const service = new TriageEvaluatorService();
      const result = await service.evaluate(request);

      expect(result.result).toEqual(status);
      expect(result.evaluation).toEqual(evaluation);
    });

    it('should return MISSING_DATA if vitals are not set and on the vitals step', async () => {
      const request = {
        condtions: [],
        heartRate: null,
        currentStep: TriageResultStep.VITALS
      } as unknown as TriageRequest;

      const service = new TriageEvaluatorService();
      const result = await service.evaluate(request);

      expect(result.result).toEqual(TriageResultStatus.MISSING_DATA);
    });
    

  });

});