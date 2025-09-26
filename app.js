import express from 'express'
import db_connection from './database/db_connection.js'
import bookRouter from './routes/bookRoutes.js'
import authRouter from './routes/authRoutes.js'
export const app = express()

app.get('/', (req, res) => {
    res.json({ message: 'Books API is running', endpoints: ['/books', '/auth'] });
});

app.use(express.json())
app.use('/books', bookRouter)
app.use('/auth', authRouter)

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