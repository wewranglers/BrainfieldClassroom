
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddClassroom = () => {
    const [classroom, setClassroom] = useState()
    const [class_id, setClassCode] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/teacher/add_classroom', { classroom, class_id })
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
                        <label htmlFor='class_id'><strong> Classroom Code: </strong></label>
                        <input
                            id='class_id'
                            type='text'
                            name='class_id'
                            placeholder='Enter Class Code'
                            className='form-control rounded-0'
                            onChange={e => setClassCode(e.target.value)}
                        />    
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0 mb-2'>Add Classroom</button>
                </form>
            </div>
        </div>
    )
}

export default AddClassroom
