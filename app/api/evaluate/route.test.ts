
import { POST } from './route';
import { NextRequest, NextResponse } from 'next/server';
import { describe, it, expect, jest } from '@jest/globals';

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
		expect(data.body.result).toEqual("SUCCESS");
	});


	describe('no action needed', () => {

		it('should return BLUE when pain is equal to 0', async () => {

			const request = new NextRequest("http://localhost:3000/api/evaluate", {
				method: "POST",
				body: JSON.stringify({
					attendanceReason: "1",
					firstName: "John",
					lastName: "Doe",
					pain: 0
				})
			});

			const response = await POST(request);
			const data = await response.json();

			expect(response.status).toBe(200);
			expect(data.body.evaluation).toEqual("BLUE");
		});

	});

	describe('when presenting with pain', () => {

		it(('should return RED when criteria met'), async () => {
			const request = new NextRequest("http://localhost:3000/api/evaluate", {
				method: "POST",
				body: JSON.stringify({
					attendanceReason: "1",
					firstName: "John",
					lastName: "Doe",
					pain: 8,
					conditions: ["C1", "C2"]
				})
			});

			const response = await POST(request);
			const data = await response.json();

			expect(response.status).toBe(200);
			expect(data.body.evaluation).toEqual("RED");
		});

		it(('should return ORANGE when criteria met'), async () => {
			const request = new NextRequest("http://localhost:3000/api/evaluate", {
				method: "POST",
				body: JSON.stringify({
					attendanceReason: "1",
					firstName: "John",
					lastName: "Doe",
					pain: 8,
					conditions: ["C3"]
				})
			});

			const response = await POST(request);
			const data = await response.json();

			expect(response.status).toBe(200);
			expect(data.body.evaluation).toEqual("ORANGE");
		});

		it(('should return YELLOW when criteria met'), async () => {
			const request = new NextRequest("http://localhost:3000/api/evaluate", {
				method: "POST",
				body: JSON.stringify({
					attendanceReason: "1",
					firstName: "John",
					lastName: "Doe",
					pain: 8,
					conditions: ["C4"]
				})
			});

			const response = await POST(request);
			const data = await response.json();

			expect(response.status).toBe(200);
			expect(data.body.evaluation).toEqual("YELLOW");
		});

		it(('should return GREEN when criteria met'), async () => {
			const request = new NextRequest("http://localhost:3000/api/evaluate", {
				method: "POST",
				body: JSON.stringify({
					attendanceReason: "1",
					firstName: "John",
					lastName: "Doe",
					pain: 8,
					conditions: ["C5"]
				})
			});

			const response = await POST(request);
			const data = await response.json();

			expect(response.status).toBe(200);
			expect(data.body.evaluation).toEqual("GREEN");
		});

	});

});