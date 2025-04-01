import { TriageRequest } from '@/lib/triage/TriageRequest';
import { TriageDetails } from './TriageDetails';
import { TriagePersonalDetails } from './TriagePersonalDetails';

export class TriageData implements TriagePersonalDetails, TriageRequest, TriageDetails {

  currentStep!: string;

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

  lastPeriod!: string;
  gynaecologyConditions!: string[];
  femaleHistoryConditions!: string[];
  maleHistoryConditions!: string[];
  medicalHistoryConditions!: string[];
}