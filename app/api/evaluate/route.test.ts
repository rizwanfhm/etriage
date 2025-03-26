
import { POST } from './route';
import { NextRequest, NextResponse } from 'next/server';
import { describe, it, expect, jest } from '@jest/globals';
import { TriageResultEvaluation, TriageResultStatus } from '@/lib/triage/TriageResult';

describe('/evaluate', () => {

	it('should return a successful response', async () => {

		const request = new NextRequest("http://localhost:3000/api/evaluate", {
			method: "POST",
			body: JSON.stringify({
				attendanceReason: "1",
				firstName: "John",
				lastName: "Doe",
			})
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(200);
	});

});