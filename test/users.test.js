import request from 'supertest';
import { app, server } from '../app.js';
import db_connection from '../database/db_connection.js';
import UserModel from '../models/userModel.js';

describe('User API tests', () => {
    beforeAll(async () => {
        await db_connection.authenticate();
    });
    // POST /auth/register
    describe('POST /auth/register', () => {
        let testUser;
        const userData = {
            username: "testuser_register",
            email: `test_register_${Date.now()}@test.com`, // email único
            password: "123456"
        };
        test('Should register a new user and return 201', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Usuario creado');
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user.username).toBe(userData.username);
            expect(response.body.user.email).toBe(userData.email);
            testUser = response.body.user; // guardar para cleanup
        });
        afterEach(async () => {
            if (testUser?.id) {
                await UserModel.destroy({ where: { id: testUser.id } });
                testUser = null;
            }
        });
    });

    afterAll(async () => {
        await db_connection.close();
        server.close();
    });
});
