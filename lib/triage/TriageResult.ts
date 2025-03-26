import exp from "constants";

export enum TriageResultStatus { 
  COMPLETE = "COMPLETE",
  INPROGRESS = "INPROGRESS",
  MISSING_DATA = "MISSING_DATA"
};

export enum TriageResultEvaluation {
  RED = "RED",
  ORANGE = "ORANGE",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
  BLUE = "BLUE",
  UNKNOWN = "UNKNOWN"
};

export enum TriageResultStep {
  VITALS = "VITALS",
  CONDITIONS = "CONDITIONS",
  PAIN = "PAIN",
  EVALUATION = "EVALUATION"
}

export class TriageResult {

  // workflow state
  result: TriageResultStatus;
  nextStep: TriageResultStep | null;

  // rating
  evaluation: TriageResultEvaluation | null;
  evaluationDetails: string | null;
  

  constructor(
    result: TriageResultStatus, 
    evaluation: TriageResultEvaluation | null = null, 
    evaluationDetails: string | null = null,
    nextStep: TriageResultStep | null = null) {
    this.result = result;
    this.nextStep = nextStep;
    this.evaluation = evaluation;
    this.evaluationDetails = evaluationDetails;
  }

}