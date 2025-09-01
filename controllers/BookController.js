import BookModel from "../models/BookModel.js"
export const getAllBooks = async(req, res)=> {
    try {
        const books = await BookModel.findAll()
        res.status(200).json(books)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// get one book by id

export const getOneBook = async (req, res) => {
  try {
    const book = await BookModel.findByPk(req.params.id)
    if (!book) return res.status(404).json({ message: "Book not found" })
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
    
// delete a book by id
    
export const deleteBook = async (req, res) => {
  try {
    const book = await BookModel.findByPk(req.params.id)
    if (!book) return res.status(404).json({ message: "Book not found" })

    await book.destroy()
    res.status(200).json({ message: "Book deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// update a book by id

export const updateBook = async (req, res) => {
  try {
    const book = await BookModel.findByPk(req.params.id)
    if (!book) return res.status(404).json({ message: "Book not found" })

    await book.update(req.body)
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
    

// create a new book
    
export const createBook = async (req, res) => {
  try {
    const newBook = await BookModel.create(req.body)
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
