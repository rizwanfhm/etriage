export enum TriageResultStatus { 
  COMPLETE = "COMPLETE",
  INPROGRESS = "INPROGRESS",
  MISSING_DATA = "MISSING_DATA",
  DETAILS = "DETAILS",
};

export enum TriageResultEvaluation {
  RED = "RED",
  ORANGE = "ORANGE",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
  BLUE = "BLUE",
  UNKNOWN = "UNKNOWN",
  NOT_APPLICABLE = "NOT_APPLICABLE",
};

export enum TriageResultStep {
  ADDTENDANCE = "ATTENDANCE",
  PERSONAL = "PERSONAL",
  PRESENTING_COMPLAINTS = "PRESENTING_COMPLAINTS",
  PRESENTING_QUESTIONS = "PRESENTING_QUESTIONS",
  CONDITIONS = "CONDITIONS",
  VITALS = "VITALS",
  PAIN = "PAIN",
  RESULT = "RESULT",
  BOWEL = "BOWEL",
  URINARY = "URINARY",
  GYNAECOLOGY = "GYNAECOLOGY",
  FEMALE_HISTORY = "FEMALE_HISTORY",
  MALE_HISTORY = "MALE_HISTORY",
  MEDICAL_HISTORY = "MEDICAL_HISTORY",
  MEDICATION = "MEDICATION",
  OTHER = "OTHER",
  UNKNOWN = "UNKNOWN",

  ABDOMINAL_PAIN = "ABDOMINAL_PAIN",
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