export interface Q1 {
  attendance: string;
}

export interface TriageData {

  attendanceReason: string;

  firstName: string;
  lastName: string;
  dob: string;
  sex: string;

  behavingStrangely: boolean;

  conditions: boolean[];

  heartRate: number;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  temperature: number;

  pain: number;
}

export interface StepAttendanceProps {
  data: TriageData;
  onChange: (key: keyof TriageData, value: any) => void;
}

export interface ReviewProps {
  data: TriageData;
}