import { TriageResult } from "@/lib/triage/TriageResult";
import { TriageData } from "./triage/TriageData";

export interface StepProps {
  data: TriageData;
  onChange: (key: keyof TriageData, value: any) => void;
}
export interface ReviewProps {
  data: TriageData;
}

export interface StepResultProps {
  result: TriageResult;
}