import { TriageRequest } from "./TriageRequest";
import { TriageResult } from "./TriageReult";

export interface TriageEvaluator {

  evaluate(request: TriageRequest): Promise<TriageResult>;

}