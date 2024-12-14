import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Start = () => {
    const navigator = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/verify')
            .then(result => {
                if (result.data.Status) {
                    if (result.data.role === 'teacher') {
                        navigator('/dashboard')
                    } else {
                        navigator('/studentdetail/' + result.data.id)
                    }
                }
            }).catch(err => console.log(err))
    }, [])


    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-50 border loginForm '>
                <h2 className='text-center'>Login as</h2>
                <div className='d-flex justify-content-between mt-5 mb-2'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => {
                            navigator('/studentlogin')
                        }}>
                        Student/Parent
                    </button>
                    <button
                        type='button'
                        className='btn btn-success'
                        onClick={() => {
                            navigator('/teacherlogin')
                        }}>
                        Teacher
                    </button>
                </div>


            </div>
        </div>
    )
}

export default Start
