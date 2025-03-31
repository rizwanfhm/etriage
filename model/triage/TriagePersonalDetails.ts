export enum TriageSex {
  MALE = "M",
  FEMALE = "F",
}

export interface TriagePersonalDetails {
  firstName: string;
  lastName: string;
  dob: string;
  sex: string;
};