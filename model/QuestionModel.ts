export interface Q1 {
  attendance: string;
}

export interface TriageData {

}

export interface StepAttendanceProps {
  data: TriageData;
  onChange: (key: keyof TriageData, value: any) => void;
}
