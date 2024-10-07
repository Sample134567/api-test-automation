import * as supertest from "supertest";
const request = supertest('https://jsonplaceholder.typicode.com/');

describe('POC Tests', () => {
    it('GET /posts', async () => {
        const res = await request.get('/posts');
        console.log(res);
        expect(res.statusCode).toBe(200);
        expect(res.body[0].id).toBe(1)
    })
})
