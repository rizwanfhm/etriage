export class TriageResult {

  evaluation: string;
  result: string;

  constructor(result: string, evaluation: string) {
    this.result = result;
    this.evaluation = evaluation;
  }

}