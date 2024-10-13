import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const AddStudent = () => {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        height: '',
        image: '',
        category_id: '',    
    })

    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if(result.data.Result){
                    setCategory(result.data.Result)
                }else{
                    alert(result.data.error)
                }
            })
            .catch(err => console.log(err))
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', student.name);
        formData.append('email', student.email);
        formData.append('password', student.password);
        formData.append('address', student.address);
        formData.append('height', student.height);
        formData.append('image', student.image);
        formData.append('category_id', student.category_id);
        
        axios.post('http://localhost:3000/auth/add_student', formData)
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
                        <label htmlFor='inputHeight' className='form-label'>Height</label>
                        <input 
                            type='number' 
                            className='form-control rounded-0' 
                            id='inputHeight' 
                            placeholder='Enter height'
                            onChange={e => setStudent({...student, height: e.target.value})} 
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
                        <button type='submit' className='btn btn-primary w-100'>Add Student</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddStudent 
