import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer'
import path from 'path'

const router = express.Router()

router.post('/studentlogin', (req, res) => {
    const sql = "SELECT * FROM student WHERE email = ? AND class_id = ?"
    con.query(sql, [req.body.email, req.body.class_id], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Login Query Error" })
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "sToPEEEET ma fWEnd!!" })
                if (response) {
                    const email = result[0].email;
                    const class_id = result[0].class_id;
                    const token = jwt.sign(
                        { 
                            role: "student", 
                            email: email, 
                            class_id: class_id,
                            id: result[0].id
                        },
                        "jwt_secret_key",
                        { expiresIn: '1d' },
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: true, id: result[0].id })
                }
            })

            
        } else {
            return res.json({ loginStatus: false, Error: 'sToPEEEET ma fWEnd!' })
        }
    })
})

//to get individual student detail
router.get('/studentdetail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

//to make classroom dropdown list available in the frontend
router.get('/classroom', (req, res) => {
    const sql = "SELECT * FROM classroom"
    //const sql = "SELECT * FROM student WHERE class_id = ?";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Selection Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

export { router as studentRouter };