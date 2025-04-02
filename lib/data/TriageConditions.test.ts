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

    const codes = ["F.1", "M.1", "H.1"];
    const expectedConditions = [      
      new TriageCondition("F.1", "PCOS"),
      new TriageCondition("M.1", "Enlarged prostate"),
      new TriageCondition("H.1", "Bowel cancer"),
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

  it('should return presenting complaints', async () => {

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

    const complaints = await TriageConditions.presentingComplaints();
    expect(complaints).toBeDefined();
    expect(complaints.length).toBeGreaterThan(0);
    expect(complaints[0]).toBeInstanceOf(TriageCondition);
    expect(complaints[0].code).toBeDefined();
    expect(complaints[0].condition).toBeDefined();
  });

  it('should return presenting complaints questions', async () => {

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

    const questions = await TriageConditions.presentingComplaintsQuestions(["PQ.1", "PQ.2", "PQ.10"]);
    expect(questions).toBeDefined();
    expect(questions.length).toBe(3);
    expect(questions[0]).toBeInstanceOf(TriageCondition);
    expect(questions[0].code).toBe("PQ.1");
    expect(questions[1].code).toBe("PQ.2");
    expect(questions[2].code).toBe("PQ.10");
  });

});