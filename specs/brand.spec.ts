import * as supertest from "supertest";
const request = supertest('https://practice-react.sdetunicorns.com/api/test');

describe('Fetch Brands', () => {
    it('GET /brand', async  () => {
        const res = await request.get('/brands');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(1);
        expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
    })

    it('GET /brand/:id', async  () => {
        const res = await request.get('/brands/64b41f5949e85607248e2895');
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Ni Sa');
    })
})

describe.only('Create /brands', () => {
    it('POST /brands', async () => {
        const data = {
            'name': 'Test Brand ' + Math.floor(Math.random() * 100000),
            'description': 'Test Brand Description'
        };

        const res = await request
            .post('/brands')
            .send(data);

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(data.name);
        expect(res.body).toHaveProperty('createdAt');
    });
});

describe('Update brands', () => {
    it('PUT /brands', async () => {
        const data = {
            'name': 'Honeywells'
        };

        const res = await request
            .put('/brands/67457fa2986188d4dce539ea')
            .send(data);

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(data.name);
    });
});

describe('Delete Brands', () => {
    it('DEL /brands', async () => {
       const res = await request.del('/brands/67457fa2986188d4dce539ea')

        expect(res.statusCode).toEqual(200);
    });
});
