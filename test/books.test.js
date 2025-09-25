import request from 'supertest';
import { app, server } from '../app.js';
import db_connection from '../database/db_connection.js';
import BookModel from '../models/bookModel.js';

describe('test book crud', () => {
    beforeAll(async () => {
        await db_connection.authenticate()
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
        const newBook = {
            title: "Test",
            writer: "Test",
            book_description: "Test"
        }
        test('Should return a response with status 201 and type json', async () => {
            const response = await request(app).post('/books').send(newBook)
            expect(response.status).toBe(201)
            expect(response.headers['content-type']).toContain('json')
        });
        afterAll(async () => {
            await BookModel.destroy({
                where:{
                    title: "Test"
                }
            })
        })
    });

    // DELETE book by id
    describe('DELETE /books/:id', () => {
        let response;
        let createdBook = {};
        beforeEach(async () => {
            createdBook = await BookModel.create({
                title: "Book to be deleted",
                writer: "Author",
                book_description: "Description"
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
    });
    afterAll(async () => {
        await db_connection.close()
        server.close()
    })
})