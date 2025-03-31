import { TriageStep } from "./TraigeStep";

export interface TriageDetails extends TriageStep {
  bowelHabits: string[];
  urinarySymptoms: string[];
}