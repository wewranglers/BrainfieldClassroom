import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Category from './Category'
import axios from 'axios'

const Student = () => {
  const [student, setStudent] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/student/')
      .then(result => {
        if (result.data.Status) {
          setStudent(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_student/'+id)
    .then(result => {
      if(result.data.Status){
        //navigate('/dashboard/student')
        window.location.reload()
      }else{
        alert(result.data.Error)
      }
    })
  }

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Primary X, Salolo</h3>
      </div>
      <Link to='/dashboard/add_student' className='btn btn-success'>
        Add Student
      </Link>
      <div className='mt-3'>
        <table className='mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Addreess</th>
              <th>Height(cm)</th>
              <th>Action</th>
              {/* <th>Category</th> */}
            </tr>
          </thead>
          <tbody>
            {
              student.map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>
                    <img src={"http://localhost:3000/images/" + s.image} className="student_image" alt="student_image" />
                  </td>
                  <td>{s.email}</td>
                  <td>{s.address}</td>
                  <td>{s.height}</td>
                  <td>
                    <Link 
                      to={`/dashboard/edit_student/` + s.id} 
                      className='btn btn-info btn-sm me-2'
                    >
                      Edit
                    </Link>
                    <button 
                      className='btn 
                      btn-warning btn-sm' 
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Student
