
import { POST } from './route';
import { NextRequest, NextResponse } from 'next/server';
import { describe, it, expect, jest } from '@jest/globals';

describe('Evaluate Route', () => {
	it('should return a successful response', async () => {

		const request = new NextRequest("http://localhost:3000/api/evaluate", {
			method: "POST",
			body: JSON.stringify({
				attendanceReason: "Test",
				firstName: "Test",
				lastName: "Test",
			})
		});

		// const url = new URL('http://localhost:3000/api/evaluate');
		// const request = new NextRequest(url, {
		// 	method: "POST",
		// 	body: JSON.stringify({
		// 		attendanceReason: "Test",
		// 		firstName: "Test",
		// 		lastName: "Test",
		// 	})
		// // });

		// const mockBody = {
    //   attendanceReason: "Test",
    //   firstName: "Test",
    //   lastName: "Test",
    // };

    // // Mock the NextRequest
    // const mockRequest = {
    //   json: jest.fn().mockResolvedValue(mockBody), // Mock the json() method
    // } ;

		const response = await POST(request);
		// let data;
		// if (response instanceof NextResponse) {
		const data = await response.json();
		// } else {
		// 	data = (response as NextResponse).body;
		// }

		// const data = JSON.parse(response.body?.toString() || '{}');
		expect(response.status).toBe(200);
		expect(data.message).toEqual("Success");


	});

});