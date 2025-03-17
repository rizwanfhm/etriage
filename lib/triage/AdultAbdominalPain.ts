import { TriageRequest } from './TriageRequest';
import { TriageEvaluator } from './TriageEvaluator';
import { TriageResult } from './TriageReult';

import { promises as fs } from 'fs';

export class AdultAbdominalPain implements TriageEvaluator {

  private RED: Set<string>;
  private ORANGE: Set<string>;
  private YELLOW: Set<string>;
  private GREEN: Set<string>;
  
  constructor() {
    this.RED = new Set(["C1", "C2"]);
    this.ORANGE = new Set(["C3"]);
    this.YELLOW = new Set(["C4"]);
    this.GREEN = new Set(["C5"]);
  }

  async evaluate(request: TriageRequest): Promise<TriageResult> {

    // const complaintsFile = await fs.readFile(process.cwd() + '/lib/data/painComplaints.json', 'utf-8');
    // const complaints = JSON.parse(complaintsFile);

    if (this.evaluateComplaints(new Set(request.conditions), this.RED)) {
      return new TriageResult("SUCCESS", "RED");
    }
    else if (this.evaluateComplaints(new Set(request.conditions), this.ORANGE)) {
      return new TriageResult("SUCCESS", "ORANGE");
    }
    else if (this.evaluateComplaints(new Set(request.conditions), this.YELLOW)) {
      return new TriageResult("SUCCESS", "YELLOW");
    }
    else if (this.evaluateComplaints(new Set(request.conditions), this.GREEN)) {
      return new TriageResult("SUCCESS", "GREEN");
    }

    return new TriageResult("SUCCESS", "BLUE");
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