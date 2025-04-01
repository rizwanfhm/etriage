import { AdultAbdominalPain } from "./AdultAbdominalPain";
import { TriageRequest } from "./TriageRequest";
import { TriageResultStatus, TriageResultEvaluation } from "./TriageResult";

describe('abdominal pain', () => {

  it('should return NOT_APPLICABLE when presenting complaints are not met', async () => {
    const request = {
      presentingComplaints: [],
    } as unknown as TriageRequest;

    const service = new AdultAbdominalPain();
    const result = await service.evaluate(request);

    expect(result.result).toEqual(TriageResultStatus.COMPLETE);
    expect(result.evaluation).toEqual(TriageResultEvaluation.NOT_APPLICABLE);
  });

  it('should return an evaluation when presenting complaints are met', async () => {
    const request = {
      presentingComplaints: ["P.1"],
    } as unknown as TriageRequest;

    const service = new AdultAbdominalPain();
    const result = await service.evaluate(request);

    expect(result.result).toEqual(TriageResultStatus.COMPLETE);
    expect([
      TriageResultEvaluation.RED,
      TriageResultEvaluation.YELLOW,
      TriageResultEvaluation.GREEN,
      TriageResultEvaluation.BLUE,
    ]).toContain(result.evaluation);
      
  });

  it('should return ORANGE when inputs are met', async () => {
    const request = {
      presentingComplaints: ["P.17"],
      pain: 8,
      conditions: ["PQ.1", "PQ.2", "PQ.4", "PQ.5"],
      temperature: 39
    } as unknown as TriageRequest;

    const service = new AdultAbdominalPain();
    const result = await service.evaluate(request);

    expect(result.result).toEqual(TriageResultStatus.COMPLETE);
    expect(result.evaluation).toEqual(TriageResultEvaluation.ORANGE);
  });

  it('should return YELLOW when inputs are met', async () => {
    const request = {
      presentingComplaints: ["P.17"],
      pain: 5,
      conditions: ["PQ.6", "PQ.7", "PQ.3", "PQ.9"],
      temperature: 38
    } as unknown as TriageRequest;

    const service = new AdultAbdominalPain();
    const result = await service.evaluate(request);

    expect(result.result).toEqual(TriageResultStatus.COMPLETE);
    expect(result.evaluation).toEqual(TriageResultEvaluation.YELLOW);
  });

  it('should return GREEN when inputs are met', async () => {
    const request = {
      presentingComplaints: ["P.17"],
      pain: 0,
      conditions: ["PQ.10"],
      temperature: 37
    } as unknown as TriageRequest;

    const service = new AdultAbdominalPain();
    const result = await service.evaluate(request);

    expect(result.result).toEqual(TriageResultStatus.COMPLETE);
    expect(result.evaluation).toEqual(TriageResultEvaluation.GREEN);
  });


});