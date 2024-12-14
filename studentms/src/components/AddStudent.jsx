import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const AddStudent = () => {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        debt: '',
        image: '',
        category_id: '',  
        classname: '',  
        class_id: '',
    })

    //state for storing classrooms from the useEffect below
    const [classroom, setClassroom] = useState([])
    //state for storing categories/genders from the useEffect below
    const [category, setCategory] = useState([])

    const navigate = useNavigate()

    //get the categories/genders in the select
    useEffect(() => {
        axios.get('http://localhost:3000/teacher/category')
            .then(result => {
                if(result.data.Result){
                    setCategory(result.data.Result)
                }else{
                    alert(result.data.error)
                }
            }).catch(err => console.log(err))
    }, [])

    //get the classes in the select fields
    useEffect(() => {
        axios.get('http://localhost:3000/teacher/classroom')
            .then(result => {
                if(result.data.Result){
                    setClassroom(result.data.Result)
                }else{
                    alert(result.data.error)
                }
            }).catch(err => console.log(err))
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        
        formData.append('name', student.name);
        formData.append('email', student.email);
        formData.append('password', student.password);
        formData.append('address', student.address);
        formData.append('debt', student.debt);
        formData.append('image', student.image);
        formData.append('category_id', student.category_id);
        formData.append('classname', student.classname);
        formData.append('class_id', student.class_id);
        
        axios.post('http://localhost:3000/teacher/add_student', formData)
            .then(result => {
                if(result.data.Status){
                    navigate('/dashboard/student')
                }else{
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-75'>
            <div className='p-3 rounded w-50 border'>
                <h2 className='text-center'>Add Student </h2>
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
                            onChange={e => setStudent({...student, name: e.target.value})}
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
                            onChange={e => setStudent({...student, email: e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputPassword' className='form-label'>Password</label>
                        <input 
                            type='password' 
                            className='form-control rounded-0' 
                            id='inputPassword' 
                            placeholder='Enter Password'
                            onChange={e => setStudent({...student, password: e.target.value})}  
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
                            onChange={e => setStudent({...student, address: e.target.value})}
                        />
                    </div>
                    
                    <div className='col-12'>
                        <label htmlFor='inputdebt' className='form-label'>debt</label>
                        <input 
                            type='number' 
                            className='form-control rounded-0' 
                            id='inputdebt' 
                            placeholder='Enter debt'
                            onChange={e => setStudent({...student, debt: e.target.value})} 
                        />
                    </div>
                    <div className='col-12 mb-3'>
                        <label className='form-label' htmlFor='inputGroupFile01'>Select Image</label>
                        <input
                            type='file'
                            className='form-control rounded-0'
                            id='inputGroupFile01'
                            name='image'
                            onChange={e => setStudent({...student, image: e.target.files[0]})}
                        />
                    </div> 
                    <div className='col-12'>
                        <label htmlFor='category' className='form-lablel'>Category</label>
                        <select
                            name='category' 
                            id='category'
                            className='form-select '
                            onChange={e => setStudent({...student, category_id: e.target.value})}
                        >
                            {category.map(c => {
                                return <option key={c.id} value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='classname' className='form-lablel'>Classroom</label>
                        <select
                            name='classname' 
                            id='classname'
                            className='form-select '
                            onChange={e => setStudent({...student, classname: e.target.value})}
                        >
                            {classroom.map(c => {
                                return <option key={c.class_id} value={c.classname}>{c.classname}</option>
                            })}
                        </select>
                    </div>

                    <div className='col-12'>
                        <label htmlFor='classroom' className='form-lablel'>Classroom Code</label>
                        <select
                            name='classcode' 
                            id='classcode'
                            className='form-select '
                            onChange={e => setStudent({...student, class_id: e.target.value})}
                        >
                            {classroom.map(c => {
                                return <option key={c.class_id} value={c.class_id}>{c.class_id}</option>
                            })}
                        </select>
                    </div>
                    
                    <div className='col-12'>
                        <button type='submit' className='btn btn-primary w-100'>Add Student</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddStudent 
