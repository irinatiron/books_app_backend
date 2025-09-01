import request from 'supertest';
import { app, server } from '../app.js';
import db_connection from '../database/db_connection.js';
describe('test book crud', () => {
    beforeAll(async () => { // Abrimos conexión
        await db_connection.authenticate()
    })
    describe('GET /books', () => {
        let response;
        beforeEach(async () => {
            response = await request(app).get('/books').send()
        })
        test('should return a response with status 200 and type json', async () => {
            // const response = await request(app).get('/books').send()
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
        test('should return array of books', async () => {
            expect(response.body).toBeInstanceOf(Array);
        })
    })
    afterAll(async () => { // Cerramos conexión
        await db_connection.close()
        server.close()
    })
})