import { TriageRequest } from './TriageRequest';
import { TriageEvaluator } from './TriageEvaluator';
import { TriageResult, TriageResultEvaluation, TriageResultStatus } from './TriageResult';

import { promises as fs } from 'fs';

export class AdultAbdominalPain implements TriageEvaluator {

  private RED: Set<string>;
  private ORANGE: Set<string>;
  private YELLOW: Set<string>;
  private GREEN: Set<string>;
  
  constructor() {
    this.RED = new Set();
    this.ORANGE = new Set(["C55", "C56", "C58", "C59"]);
    this.YELLOW = new Set(["C60", "C61", "C62", "C57", "C63"]);
    this.GREEN = new Set(["C64"]);
  }

  async evaluate(request: TriageRequest): Promise<TriageResult> {

    // const complaintsFile = await fs.readFile(process.cwd() + '/lib/data/painComplaints.json', 'utf-8');
    // const complaints = JSON.parse(complaintsFile);

    

    if (this.evaluateOrange(request)) {
      return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.ORANGE);
    }
    else if (this.evaluateYellow(request)) {
      return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.YELLOW);
    }
    else if (this.evaluateComplaints(new Set(request.conditions), this.GREEN)) {
      return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.GREEN);
    }

    return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.BLUE);
  }

  private evaluateOrange(request: TriageRequest): boolean {
    const pain = request?.pain || 0;
    const temp = request?.temperature || 0;

    return this.evaluateComplaints(new Set(request.conditions), this.ORANGE) &&
      pain >= 8 &&  //  severe pain
      temp >= 39;   //  very hot
  }

  private evaluateYellow(request: TriageRequest): boolean {
    const pain = request?.pain || 0;
    const temp = request?.temperature || 0;

    return this.evaluateComplaints(new Set(request.conditions), this.YELLOW) &&
      pain >= 5 && pain <= 7 && // moderate pain
      temp >= 38; // hot
  }

  private evaluateGreen(request: TriageRequest): boolean {
    const pain = request?.pain || 0;

    return this.evaluateComplaints(new Set(request.conditions), this.GREEN) &&
      pain >= 0 && pain <= 4; // mild pain
  }

  private evaluateComplaints(presentingComplaints: Set<string>, criteria: Set<string>): boolean {

    if (presentingComplaints.size !== criteria.size) {
      return false;
    }

    let match = true;

    criteria.forEach(complaint => {
      match &&= presentingComplaints.has(complaint)
    });

    return match;
  }

}