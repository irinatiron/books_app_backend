import express from 'express'
import { getAllBooks, getOneBook, createBook, updateBook, deleteBook } from '../controllers/BookController.js'
import { authMiddleware } from '../middlewares/AuthMiddleware.js'
import { checkRole } from '../middlewares/RoleMiddleware.js'
const bookRouter = express.Router()
bookRouter.get('/', getAllBooks)
bookRouter.get('/:id', getOneBook)
bookRouter.post('/', authMiddleware, checkRole(['admin']), createBook)
bookRouter.delete('/:id', deleteBook)
bookRouter.put('/:id', updateBook)
export default bookRouter