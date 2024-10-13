import express from 'express';
import cors from 'cors'
import { teacherRouter } from './Routes/TeacherRoute.js'; 

const app = express()
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json())
app.use('/auth', teacherRouter)
app.use(express.static('public'))

//server listens on port 3000
app.listen(3000, () => {
    console.log('server is a running')
})