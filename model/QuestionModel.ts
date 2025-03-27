import { TriageResult } from "@/lib/triage/TriageResult";
import { TriageData } from "./triage/TriageData";

export interface Q1 {
  attendance: string;
}

// export interface TriageData {

//   attendanceReason: string;

//   firstName: string;
//   lastName: string;
//   dob: string;
//   sex: string;

//   behavingStrangely: boolean;

//   conditions: boolean[];

//   heartRate: number;
//   systolicBloodPressure: number;
//   diastolicBloodPressure: number;
//   temperature: number;

//   pain: number;
// }

// export interface TriageData {

//   attendanceReason: string | null;

//   firstName: string | null;
//   lastName: string | null;
//   dob: string | null;
//   sex: string | null;

//   behavingStrangely: boolean;

//   conditions: boolean[];

//   heartRate: number | null;
//   systolicBloodPressure: number | null;
//   diastolicBloodPressure: number | null;
//   temperature: number | null;

//   pain: number | null;
// }
export interface StepAttendanceProps {
  data: TriageData;
  onChange: (key: keyof TriageData, value: any) => void;
}

export interface ReviewProps {
  data: TriageData;
}

export interface StepResultProps {
  result: TriageResult;
}