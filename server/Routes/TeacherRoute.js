import express from 'express'
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

const router = express.Router();

router.post('/teacherlogin', (req, res) => {
    const sql = "SELECT * FROM teachers WHERE email = ? AND password = ? AND class_id = ?"
    con.query(sql, [req.body.email, req.body.password, req.body.class_id], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: 'Login Query Error' })
        if (result.length > 0) {
            const email = result[0].email;
            const class_id = result[0].class_id;

            const token = jwt.sign(
                { role: "teacher", email: email, class_id: class_id, id: result[0].id},
                "jwt_secret_key",
                { expiresIn: '1d' },
            )

            res.cookie('token', token)
            return res.json({ loginStatus: true })
        } else {
            return res.json({ loginStatus: false, Error: 'sT0p j0nZing mA nIqqUr!' })
        }
    })
})


//to make category list available in the frontend
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Selection Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

//to make classroom list available in the frontend
router.get('/classroom', (req, res) => {
    const sql = "SELECT * FROM classroom"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Selection Query Error" })
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

/*
router.post('/add_classroom', (req, res) => {
    //const sql = "INSERT INTO classroom (`classname`) VALUES (?)"
    const sql = `INSERT INTO classroom (classname,class_id) VALUES (?)`
    con.query(sql, [req.body.classroom], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Bad Query Error" })
        return res.json({ Status: true })
    })
})
*/

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
    (name,email,password,address,debt,image,category_id,classname,class_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Hash Query Error" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.debt,
            req.file.filename,
            req.body.category_id,
            req.body.classname,
            req.body.class_id,
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

router.get('/classlist/:class_id', (req, res) => {
    const class_id = req.params.class_id;
    const sql = "SELECT * FROM student WHERE class_id = ?";
    con.query(sql, [class_id], (err, result) => {
        if(err) return res.json({Status: false})
        return res.json(result)
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
        SET name=?, email=?, address=?, debt=?, category_id=?, classname=?, class_id=? 
        WHERE id=?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.address,
        req.body.debt,
        req.body.category_id,
        req.body.classname,
        req.body.class_id,
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

router.get('/teacher_count', (req, res) => {
    const sql = "SELECT count(id) AS teacher FROM teachers"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/student_count', (req, res) => {
    const sql = "SELECT count(id) AS student FROM student"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/debt_count', (req, res) => {
    const sql = "SELECT sum(debt) AS debtOfStudent FROM student"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/teacher_records', (req, res) => {
    const sql = "SELECT * FROM teachers"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    //remove token from cookie
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as teacherRouter }
