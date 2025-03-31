import { TriageStep } from "./TriageStep";

export interface TriageGynaecology extends TriageStep {
  lastPeriod: string;
  heavyBleeding: string;
  painfulPeriod: string;
  latePeriod: string;
  longerPeriod: string;
  unusualDischage: string;
}