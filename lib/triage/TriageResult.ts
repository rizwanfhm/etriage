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
  ADDTENDANCE = "ATTENDANCE",
  PERSONAL = "PERSONAL",
  BODY = "BODY",
  CONDITIONS = "CONDITIONS",
  VITALS = "VITALS",
  PAIN = "PAIN",
  RESULT = "RESULT",
  UNKNOWN = "UNKNOWN"
}

export class TriageResult {

  // workflow state
  result: TriageResultStatus;
  nextStep: TriageResultStep | null;

  // rating
  evaluation: TriageResultEvaluation | null;
  evaluationDetails?: string | null;
  

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