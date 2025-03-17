import { AdultAbdominalPain } from "./AdultAbdominalPain";
import { TriageRequest } from "./TriageRequest";
import { TriageResult } from "./TriageReult";

export class TriageEvaluatorService {

  async evaluate(request: TriageRequest): Promise<TriageResult> {

    const pain = request?.pain;

    // default to BLUE
    if (pain === 0) {
      return new TriageResult("SUCCESS", "BLUE");
    }

    const adultAbdominalPain = new AdultAbdominalPain();
    const evaluation = await adultAbdominalPain.evaluate(request);

    return evaluation
  }
}