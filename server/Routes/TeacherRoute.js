import express from 'express'
const router = express.Router();
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer'
import path from 'path'

router.post('/teacherlogin', (req, res) => {
    const sql = "SELECT * FROM teachers WHERE email = ? AND password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: 'Login Query Error' })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "teacher", email: email },
                "jwt_secret_key",
                { expiresIn: '1d' },
            )
            res.cookie('token', token)
            return res.json({ loginStatus: true })
        } else {
            return res.json({ loginStatus: false, Error: 'sT0p j0nZing niqqur!' })
        }
    })
})

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "SeelectionQuery Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/add_student', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO student 
    (name,email,password,address,height,image,category_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Hash Query Error" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.height,
            req.file.filename,
            req.body.category_id,
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })

    })
})

router.get('/student', (req, res) => {
    const sql = "SELECT * FROM student"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Get Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Get Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put('/edit_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE student 
        SET name=?, email=?, height=?, address=?, category_id=? 
        WHERE id=?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.height,
        req.body.address,
        req.body.category_id
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Get Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.delete('/delete_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM student WHERE id=?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({ Status: true, Result: result })
    })
})

export { router as teacherRouter }
