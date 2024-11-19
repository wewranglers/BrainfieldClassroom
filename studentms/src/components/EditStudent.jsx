import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Classroom from './Classroom';

const EditStudent = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [student, setStudent] = useState({
        name: '',
        email: '',
        debt: '',
        address: '',
        category_id: '',
        class_code: '',
    })

    const [category, setCategory] = useState([])
    const [classroom, setClassroom] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
        axios.get('http://localhost:3000/auth/student' + id)
            .then(result => {
                setStudent({
                    ...student,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    debt: result.data.Result[0].debt,
                    category_id: result.data.Result[0].category_id,
                    class_code: result.data.Result[0].class_code,
                })
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/auth/classroom')
            .then(result => {
                if (result.data.Status) {
                    setClassroom(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
        axios.get('http://localhost:3000/auth/student' + id)
            .then(result => {
                setStudent({
                    ...student,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    debt: result.data.Result[0].debt,
                    category_id: result.data.Result[0].category_id,
                    class_code: result.data.Result[0].class_code,
                })
            }).catch(err => console.log(err))
    }, [])

    const handleChange = (e) => {
        setStudent({ ...data, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/auth/edit_student/' + id, student)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/student')
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-75'>
            <div className='p-3 rounded w-50 border'>
                <h2 className='text-center'>Edit Student </h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='imputName' className='form-label'>
                            Name
                        </label>
                        <input
                            type='text'
                            className='form-control rounded-0'
                            id='inputName'
                            placeholder="Enter Student's name"
                            value={student.name}
                            //onChange={e => setStudent({ ...student, name: e.target.value })}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputAdmission' className='form-label'>
                            Email
                        </label>
                        <input
                            type='email'
                            className='form-control rounded-0'
                            id='inputEmail'
                            placeholder='Enter Email Address'
                            autoComplete='off'
                            value={student.email}
                            // onChange={e => setStudent({ ...student, email: e.target.value })}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='col-12'>
                        <label htmlFor='inputAddress' className='form-lablel'>Address</label>
                        <input
                            type='text'
                            className='form-control rounded-0'
                            id='inputAddress'
                            placeholder='200, Sagbinatu Road, Belembe, A/Egba, lagos'
                            autoComplete='off'
                            value={student.address}
                            // onChange={e => setStudent({ ...student, address: e.target.value })}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='col-12'>
                        <label htmlFor='inputdebt' className='form-label'>Debt</label>
                        <input
                            type='number'
                            className='form-control rounded-0'
                            id='inputdebt'
                            placeholder='Enter debt'
                            debt={student.debt}
                            // onChange={e => setStudent({ ...student, debt: e.target.value })}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className='col-12'>
                        <label htmlFor='category' className='form-lablel'>Gender</label>
                        <select
                            name='category'
                            id='category'
                            className='form-select '
                            // onChange={e => setStudent({ ...student, category_id: e.target.value })}
                            onChange={handleChange}
                        >
                            {category.map(c => {
                                return <option key={c.id} value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>

                    <div className='col-12'>
                        <label htmlFor='classroom' className='form-lablel'>Class Code</label>
                        <select
                            name='classroom'
                            id='classroom'
                            className='form-select '
                            // onChange={e => setStudent({ ...student, class_code: e.target.value })}
                            onChange={handleChange}
                        >
                            {
                                classroom.map(c => {
                                    return <option key={c.class_code} value={c.class_code}>{c.classname}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className='col-12'>
                        <button type='submit' className='btn btn-primary w-100'>Edit Student</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStudent
