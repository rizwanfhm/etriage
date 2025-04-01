import path from "path";
import fs from "fs";
import { TriageConditions } from "./TriageConditions";
import { TriageCondition } from "./TriageCondition";

global.fetch = jest.fn();

describe('TriageConditions', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return the correct conditions for given codes', async () => {

    const filePath = path.join(process.cwd(), 'lib/data/conditions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const conditionsData = JSON.parse(fileContent);
    const mockResponse = {
      status: 200,
      body: conditionsData
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: async () => mockResponse
    });

    const codes = ["C1", "F1", "M.1", "H1"];
    const expectedConditions = [
      new TriageCondition("C1", "Abdominal pain in adults"),
      new TriageCondition("F1", "Very heavy bleeding"),
      new TriageCondition("M.1", "Enlarged prostate"),
      new TriageCondition("H1", "Bowel cancer"),
    ];

    const service = new TriageConditions();
    const result = await TriageConditions.conditions(codes);

    expect(result).toEqual(expectedConditions);
  });

  it('should return corect conditions for given prefix', async () => {

    const filePath = path.join(process.cwd(), 'lib/data/conditions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const conditionsData = JSON.parse(fileContent);
    const mockResponse = {
      status: 200,
      body: conditionsData
    };

    (fetch as jest.Mock).mockResolvedValue({
      json: async () => mockResponse
    });

    const prefix = "M.";
    const expectedConditions = [
      new TriageCondition("M.1", "Enlarged prostate"),
      new TriageCondition("M.2", "Testicular cancer"),
      new TriageCondition("M.3", "Prostate cancer"),
    ];

    const service = new TriageConditions();
    const result = await TriageConditions.matchConditions(prefix);

    expect(result).toEqual(expectedConditions);
  });

});