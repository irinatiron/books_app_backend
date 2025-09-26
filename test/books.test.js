import request from 'supertest';
import { app, server } from '../app.js';
import db_connection from '../database/db_connection.js';
import BookModel from '../models/bookModel.js';
import UserModel from '../models/userModel.js';

describe('test book crud', () => {
    beforeAll(async () => {
        await db_connection.authenticate();
    })

    // GET all books
    describe('GET /books', () => {
        let response;
        beforeEach(async () => {
            response = await request(app).get('/books').send()
        })
        test('Should return a response with status 200 and type json', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
        test('Should return array of books', async () => {
            expect(response.body).toBeInstanceOf(Array);
        })
    })

    // POST (create)
    describe('POST /books', () => {
        let testUser;
        let createdBook;
        const userData = {
            username: "post-testuser",
            email: "test@post.com",
            password: "testpassword"
        }
        const newBookData = {
            title: "Create Book Test",
            writer: "Create Book Test",
            book_description: "Create Book Test"
        }
        test('Should return a response with status 201 and type json', async () => {
            testUser = await UserModel.create(userData);
            const newBook = { ...newBookData, id_user: testUser.id };
            const response = await request(app).post('/books').send(newBook)
            expect(response.status).toBe(201)
            expect(response.headers['content-type']).toContain('json')
            createdBook = response.body;
        });
        afterAll(async () => {
            if (createdBook?.id) {
                await BookModel.destroy({ where: { id: createdBook.id } });
            }
            if (testUser?.id) {
                await UserModel.destroy({ where: { id: testUser.id } });
            }
        });
    });

    // DELETE book by id
    describe('DELETE /books/:id', () => {
        let response;
        let createdBook;
        let testUser;
        beforeEach(async () => {
            testUser = await UserModel.create({
                username: "delete-testuser",
                email: "test@delete.com",
                password: "testpassword"
            });
            createdBook = await BookModel.create({
                title: "Book to be deleted",
                writer: "Delete Test Book Author",
                book_description: "Delete Test Book Description",
                id_user: testUser.id
            });
            response = await request(app).delete(`/books/${createdBook.id}`).send();
        });
        test('Should return a response with status 200 and type json', async () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        test('Should return a message book deleted successfully', async () => {
            expect(response.body.message).toContain("The book has been deleted successfully!");
            const foundBook = await BookModel.findOne({ where: { id: createdBook.id } });
            expect(foundBook).toBeNull();
        });
        afterEach(async () => {
            if (testUser?.id) {
                await UserModel.destroy({ where: { id: testUser.id } });
                testUser = null;
            }
        });
    });

    afterAll(async () => {
        await db_connection.close()
        server.close()
    })
})