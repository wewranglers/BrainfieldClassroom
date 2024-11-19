
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddClassroom = () => {
    const [classroom, setClassroom] = useState()
    const [class_code, setClassCode] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/auth/add_classroom', { classroom, class_code })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/classroom')
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-75'>
            <div className='p-3 rounded w-50 border'>
                <h2>Add Classroom</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='classroom'><strong> Classroom: </strong></label>
                        <input
                            id='classroom'
                            type='text'
                            name='classroom'
                            placeholder='Enter Classroom Name'
                            className='form-control rounded-0'
                            onChange={e => setClassroom(e.target.value)}
                        />    
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='class_code'><strong> Classroom Code: </strong></label>
                        <input
                            id='class_code'
                            type='text'
                            name='classroom'
                            placeholder='Enter Classroom Name'
                            className='form-control rounded-0'
                            onChange={e => setClassroom(e.target.value)}
                        />    
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0 mb-2'>Add Classroom</button>
                </form>
            </div>
        </div>
    )
}

export default AddClassroom
