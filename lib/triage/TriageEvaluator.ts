import { TriageRequest } from "./TriageRequest";
import { TriageResult } from "./TriageResult";

export interface TriageEvaluator {

  evaluate(request: TriageRequest): Promise<TriageResult>;

}