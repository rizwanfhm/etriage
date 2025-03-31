import { TriagePersonalDetails } from './TriagePersonalDetails';
import { TriageStep } from './TriageStep';

export interface TriageDetails extends TriageStep, TriagePersonalDetails {
  bowelHabits: string[];
  urinarySymptoms: string[];
}