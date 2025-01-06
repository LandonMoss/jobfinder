const request = require('supertest');
const express = require('express');
const app = express();

// Mock route for testing
app.get('/jobs', (req, res) => {
  res.status(200).json([
    { title: 'Software Engineer', company: 'Google', location: 'Mountain View, CA', salary: 120000 },
    { title: 'Product Manager', company: 'Amazon', location: 'Seattle, WA', salary: 130000 }
  ]);
});

describe('GET /jobs', () => {
  it('should return a list of jobs', async () => {
    const response = await request(app).get('/jobs');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('title', 'Software Engineer');
  });
});