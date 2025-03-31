import { TriageRequest } from '@/lib/triage/TriageRequest';
import { TriageDetails } from './TriageDetails';
import { TriageStep } from './TraigeStep';

export class TriageData implements TriageRequest, TriageDetails {
  
  attendanceReason!: string;

  firstName!: string;
  lastName!: string;
  dob!: string;
  sex!: string;

  behavingStrangely!: boolean;

  conditions!: string[];

  heartRate!: number;
  systolicBloodPressure!: number;
  diastolicBloodPressure!: number;
  temperature!: number;

  pain!: number;

  presentingComplaints!: string[];

  bowelHabits!: string[];
  urinarySymptoms!: string[];

  currentStep!: string;
}