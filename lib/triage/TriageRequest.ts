import { TriageStep } from "@/model/triage/TraigeStep";

export interface TriageRequest extends TriageStep {

  firstName: string;
  lastName: string;
  dob: string;
  sex: string;

  behavingStrangely: boolean;

  conditions: string[] | null;

  heartRate: number | null;
  systolicBloodPressure: number | null;
  diastolicBloodPressure: number | null;
  temperature: number | null;

  pain: number | null;
  
  presentingComplaints: string[];
}