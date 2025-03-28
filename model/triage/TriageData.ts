import { TriageRequest } from '@/lib/triage/TriageRequest';

export class TriageData implements TriageRequest {
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
  
  currentStep!: string;
}