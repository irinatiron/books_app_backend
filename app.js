import express from 'express'
import db_connection from './database/db_connection.js'
import bookRouter from './routes/bookRoutes.js'
import BookModel from './models/BookModel.js'
export const app = express()

// app.get('/', (req, res)=>{
//     res.send('Hola API')
// })
// app.get('/', async (req, res) => {
//     try {
//         const books = await BookModel.findAll();
//         res.json(books);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
app.get('/', (req, res) => {
    res.json({ message: 'Books API is running', endpoints: ['/books'] });
});


app.use(express.json())
app.use('/books', bookRouter)
try{
    await db_connection.authenticate()
    console.log('Conected to database 🪐')
    await db_connection.sync()
    console.log('Models synchronised ✓')
    }catch(error){
    console.log(`Error: ${error}`)
    }
export const server = app.listen(8000, ()=>{
    console.log('🚀 Server up in http://localhost:8000/')
})
