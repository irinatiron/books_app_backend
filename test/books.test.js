import request from 'supertest';
import { app, server } from '../app.js';
import db_connection from '../database/db_connection.js';
import BookModel from '../models/BookModel.js';
describe('test book crud', () => {
    let createdBookId;
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
            // const response = await request(app).get('/books').send()
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })
        test('Should return array of books', async () => {
            expect(response.body).toBeInstanceOf(Array);
        })
    })
    // // POST (create)
    // describe('POST /books', () => {
    //     test('Should create a new book', async () => {
    //         const newBook = {
    //             title: 'Test Book',
    //             writer: 'Test Author',
    //             book_description: 'This is a test description'
    //         };
    //         const response = await request(app).post('/books').send(newBook);
    //         expect(response.status).toBe(201);
    //         expect(response.body).toHaveProperty('id');
    //         createdBookId = response.body.id;
    //     })
    // })
    // // GET one book by id
    // describe('GET /books/:id', () => {
    //     test('Should return the new book by id', async () => {
    //         const response = await request(app).get(`/books/${createdBookId}`).send();
    //         expect(response.status).toBe(200);
    //         expect(response.body).toHaveProperty('id', createdBookId);
    //     });
    // });
    // // PUT (update) book by id
    // describe('PUT /books/:id', () => {
    //     test('Should update the new book', async () => {
    //         const updatedData = { title: 'Updated Title' };
    //         const response = await request(app).put(`/books/${createdBookId}`).send(updatedData);
    //         expect(response.status).toBe(200);
    //         expect(response.body).toHaveProperty('title', 'Updated Title');
    //     });
    // });
    // // DELETE book by id
    // describe('DELETE /books/:id', () => {
    //     test('Should delete a book', async () => {
    //         const response = await request(app).delete(`/books/${createdBookId}`).send();
    //         expect(response.status).toBe(200);
    //         expect(response.body).toHaveProperty('message');
    //     });
    // });

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