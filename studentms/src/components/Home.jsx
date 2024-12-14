import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [teacherTotal, setTeacherTotal] = useState(0)
  const [studentTotal, setStudentTotal] = useState(0)
  const [debtTotal, setdebtTotal] = useState(0)
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    teacherCount();
    studentCount();
    debtCount();
    TeacherRecords();
  }, [])

  const teacherCount = () => {
    axios.get("http://localhost:3000/teacher/teacher_count")
      .then(result => {
        if (result.data.Status) {
          setTeacherTotal(result.data.Result[0].teacher)
        }
      })
  }

  const studentCount = () => {
    axios.get("http://localhost:3000/teacher/student_count")
      .then(result => {
        if (result.data.Status) {
          setStudentTotal(result.data.Result[0].student)
        }
      })
  }

  const debtCount = () => {
    axios.get("http://localhost:3000/teacher/debt_count")
      .then(result => {
        if (result.data.Status) {
          setdebtTotal(result.data.Result[0].debtOfStudent)
        }
      })
  }

  const TeacherRecords = () => {
    axios.get('http://localhost:3000/teacher/teacher_records')
      .then(result => {
        if (result.data.Status) {
          setTeachers(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
  }

  return (
    <div>
      <div><h2>Stats: </h2></div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Teachers</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{teacherTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>My Students</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{studentTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Total Debt(NGN)</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{debtTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of all Teachers</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Classroom</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(t => (
              <tr key={t.email}>
                <td>{t.email}</td>
                <td>{t.classroom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home


