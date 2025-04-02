import { TriageStep } from "@/model/triage/TriageStep";

export interface TriageRequest extends TriageStep {

  behavingStrangely: boolean;

  conditions: string[] | null;

  heartRate: number | null;
  systolicBloodPressure: number | null;
  diastolicBloodPressure: number | null;
  temperature: number | null;

  pain: number | null;
  
  presentingComplaints: string[];
  presentingComplaintsQuestions: string[];
}