import express from 'express'
import db_connection from './database/db_connection.js'
import bookRouter from './routes/bookRoutes.js'
import BookModel from './models/BookModel.js'
export const app = express()

app.get('/', (req, res)=>{
    res.send('Hola API')
})
app.use(express.json())
app.use('/books', bookRouter)
try{
    await db_connection.authenticate()
    console.log('conected to database 🪐')
    await db_connection.sync()
    console.log('models synchronised ✓')
    }catch(error){
    console.log(`error: ${error}`)
    }
export const server = app.listen(8000, ()=>{
    console.log('🚀server up in http://localhost:8000/')
})
