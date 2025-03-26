export interface TriageRequest {

  firstName: string;
  lastName: string;
  dob: string;

  conditions: string[] | null;

  heartRate: number | null;
  systolicBloodPressure: number | null;
  diastolicBloodPressure: number | null;
  temperature: number | null;

  pain: number | null;
  
  presentingComplaints: string[];
}