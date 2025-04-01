import { TriageRequest } from './TriageRequest';
import { TriageEvaluator } from './TriageEvaluator';
import { TriageResult, TriageResultEvaluation, TriageResultStatus } from './TriageResult';
import path from 'path';
import fs from "fs";


export class AdultAbdominalPain implements TriageEvaluator {

  private RED: Set<string>;
  private ORANGE: Set<string>;
  private YELLOW: Set<string>;
  private GREEN: Set<string>;
  
  constructor() {
    this.RED = new Set();
    this.ORANGE = new Set(["PQ.1", "PQ.2", "PQ.4", "PQ.5"]);
    this.YELLOW = new Set(["PQ.6", "PQ.7", "PQ.3", "PQ.9"]);
    this.GREEN = new Set(["PQ.10"]);
  }

  async evaluate(request: TriageRequest): Promise<TriageResult> {

    if (!this.isApplicable(request)) {
      return new TriageResult(TriageResultStatus.COMPLETE, TriageResultEvaluation.NOT_APPLICABLE);
    }
 
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

  private isApplicable(request: TriageRequest): boolean {

    // TODO: static load
    const filePath = path.join(process.cwd(), 'lib/data/conditions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const conditionsData = JSON.parse(fileContent);

    const painIds = conditionsData?.presentingComplaints.body
      .filter((item: { code: string, isPain: boolean }) => item.isPain)
      .map((item: { code: string }) => item.code) || [];

    return request?.presentingComplaints?.some(complaint => painIds.includes(complaint));
  }

}