import { AdultAbdominalPain } from "./AdultAbdominalPain";
import { TriageRequest } from "./TriageRequest";
import { TriageResultStatus, TriageResultEvaluation } from "./TriageResult";

describe('abdominal pain', () => {

  it('should return ORANGE when inputs are met', async () => {
    const request = {
      pain: 8,
      conditions: ["C55", "C56", "C58", "C59"],
      temperature: 39
    } as unknown as TriageRequest;

    const service = new AdultAbdominalPain();
    const result = await service.evaluate(request);

    expect(result.result).toEqual(TriageResultStatus.COMPLETE);
    expect(result.evaluation).toEqual(TriageResultEvaluation.ORANGE);
  });

  it('should return YELLOW when inputs are met', async () => {
    const request = {
      pain: 5,
      conditions: ["C60", "C61", "C62", "C57", "C63"],
      temperature: 38
    } as unknown as TriageRequest;

    const service = new AdultAbdominalPain();
    const result = await service.evaluate(request);

    expect(result.result).toEqual(TriageResultStatus.COMPLETE);
    expect(result.evaluation).toEqual(TriageResultEvaluation.YELLOW);
  });

  it('should return GREEN when inputs are met', async () => {
    const request = {
      pain: 0,
      conditions: ["C64"],
      temperature: 37
    } as unknown as TriageRequest;

    const service = new AdultAbdominalPain();
    const result = await service.evaluate(request);

    expect(result.result).toEqual(TriageResultStatus.COMPLETE);
    expect(result.evaluation).toEqual(TriageResultEvaluation.GREEN);
  });


});