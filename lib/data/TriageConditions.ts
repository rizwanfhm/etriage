import { TriageCondition } from './TriageCondition';

export class TriageConditions {

  public static async conditions(codes: string[]): Promise<TriageCondition[]> {

    return await fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        const conditionsData = data.body;
        const conditionMap: Map<string, TriageCondition> = new Map<string, TriageCondition>();

        conditionsData?.conditions.forEach(
          (item: { code: string; condition: string }) => {
            const condition = new TriageCondition(item.code, item.condition);
            conditionMap.set(item.code, condition);
          }
        );

        return conditionMap;
      })
      .then((conditionMap) => {
        const result: TriageCondition[] = [];
        codes.forEach(code => {
          const condition = conditionMap.get(code);
          if (condition) {
            result.push(condition);
          }
        });
        return result;
      });
  }

  public static async matchConditions(prefix: string): Promise<TriageCondition[]> {
    const result: TriageCondition[] = []

    return await fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        const conditionsData = data.body;
        const conditionMap: Map<string, TriageCondition> = new Map<string, TriageCondition>();

        conditionsData?.conditions.forEach(
          (item: { code: string; condition: string }) => {
            if (item.code.startsWith(prefix)) {
              const condition = new TriageCondition(item.code, item.condition);
              conditionMap.set(item.code, condition);
            }
          }
        );

        return conditionMap;
      })
      .then((conditionMap) => {

        const result: TriageCondition[] = [];

        conditionMap.forEach(c => {
          const condition = conditionMap.get(c.code);
          if (condition) {
            result.push(condition);
          }
        });

        return result
      });
  }

  public static async presentingComplaints(): Promise<TriageCondition[]> {
    return await fetch("/api/data")
      .then((res) => res.json())
      .then((data) => { 
        const complaintsData = data.body;
        const result: TriageCondition[] = []

        complaintsData?.presentingComplaints?.body.forEach(
          (item: { code: string; condition: string }) => {            
              const condition = new TriageCondition(item.code, item.condition);
              result.push(condition);            
          }
        );

        return result;
      });
  }

  public static async presentingComplaintsQuestions(questions: string[]): Promise<TriageCondition[]> {
    return await fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        const conditionsData = data.body;
        const result: TriageCondition[] = [];
        const qns = new Set<string>(questions);

        conditionsData?.presentingComplaints?.questions.forEach(
          (item: { code: string; condition: string }) => {

            if (qns.has(item.code)) {
              const condition = new TriageCondition(item.code, item.condition);
              result.push(condition);
            }
          }
        );

        return result;
      });
  }

}