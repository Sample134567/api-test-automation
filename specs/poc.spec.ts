import * as supertest from "supertest";
const request = supertest('https://jsonplaceholder.typicode.com/');

describe('POC Tests', () => {
    describe('GET requests', () => {
        it('GET /posts', async () => {
            const res = await request.get('/posts');
            console.log(res);
            expect(res.statusCode).toBe(200);
            expect(res.body[0].id).toBe(1)
        });

        it('GET /comments with query params', async () => {
            //const res = await request.get('/comments?postId=1')
            const res = await request.get('/comments').query({postId: 1, limit:10})
            console.log(res)
            expect(res.body[0].id).toBe(1)
        });
    })

    describe('POST requests', () => {
        it('POST /posts', async () => {
            const data = {
                title: 'My favorite food',
                body: 'Mango, Apple, Dragon Fruit',
                userId: 1
            }

            const res = await request
                .post('/posts')
                .send(data)
            expect(res.body.title).toBe(data.title)
        });
    });

    describe('Patch Request', () => {
        it('Patch /post/{id}', async () => {
            const data = {
                title: 'Updated Title'
            }
            const getResponse = await request.get('/posts/1');
            const beforeTitle = getResponse.body.title;

            const res = await request.patch('/posts/1').send(data)
            expect(res.body.title).not.toBe(beforeTitle)
            expect(res.body.title).toBe(data.title)
        })
    });

    describe('DELETE Request', () => {
        it('DELETE /post/{id}', async () => {
            const res = await request.delete('/posts/1');

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({});
        })
    });
})
