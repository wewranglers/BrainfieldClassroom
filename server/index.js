import express from 'express';
import cors from 'cors'
import { teacherRouter } from './Routes/TeacherRoute.js'; 
import { studentRouter } from './Routes/StudentRoute.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: ['https://classroom-front-pi.vercel.app/'],
    //origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/teacher', teacherRouter)
app.use('/student', studentRouter)

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token){
        Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong token"})
            //const email = decoded.email;
            //const role = decoded.role;
            req.id = decoded.id;
            req.role = decoded.role
            next();
        })
    }else{
        return res.json({Status: false, Error: "Not authenticated!"})
    }
}

app.get('/verify', verifyUser, (req, res) => {
    return res.json({Status: true, role: req.role, id: req.id})
})


app.use(express.static('public'))

//server listens on port 3000
app.listen(3000, () => {
    console.log('express server is a running')
})