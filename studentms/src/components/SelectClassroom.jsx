import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SelectClassroom = () => {
    const [values, setValues] = useState({ email: '', password: '', class_id: '' })
    const [error, setError] = useState(null)
    const [classroom, setClassroom] = useState([])

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3000/teacher/classroom')
            .then(result => {
                if (result.data.Result) {
                    setClassroom(result.data.Result)
                } else {
                    alert("error is", result.data.error)
                }
            }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get('http://localhost:3000/teacher/classlist/:class_id' + class_id + values)
            .then(result => {
                if (result.data.Status) {
                    //localStorage.setItem("valid", true)
                    navigate('/dashboard/class_student/')
                } else {
                    setError(result.data.Error)
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-50 border loginForm '>
                <div className='text-warning'>{error && error}</div>
                <h3>Take a Peek of a Classroom</h3>

                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='class_id'><strong>Pick a classroom from the list:  </strong></label>
                        <div className='col-12'>
                            <select
                                name='class_id'
                                id='class_id'
                                className='form-select '
                                onChange={e => setValues({ ...values, class_id: e.target.value })}
                            >
                                {classroom.map(c => {
                                    return <option key={c.class_id} value={c.class_id}>{c.classname}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0 mb-2'>Check it out!</button>
                    <div className='mb-1'>
                        <input type='checkbox' name='tick' id='tick' className='me-2' />
                        <label htmlFor='tick'><strong></strong>You agree with our terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SelectClassroom;
