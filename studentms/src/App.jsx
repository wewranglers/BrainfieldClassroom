import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Student from './components/Student';
import StudentLogin from './components/StudentLogin'
import ClassStudent from './components/ClassStudent';
import Category from './components/Category';
import Classroom from './components/Classroom';
import Profile from './components/Profile';
import AddCategory from './components/AddCategory';
import AddClassroom from './components/AddClassroom';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import Start from './components/Start';
import StudentDetail from './components/StudentDetail';
import SelectClassroom from './components/SelectClassroom';
import PrivateRoute from './components/PrivateRoute';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />}></Route>
        <Route path='/teacherlogin' element={<Login />}></Route>
        <Route path='/studentlogin' element={<StudentLogin />}></Route>
        <Route path='/studentdetail/:id' element={<PrivateRoute><StudentDetail /></PrivateRoute>}></Route>
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/student' element={<Student />}></Route>
          <Route path='/dashboard/classlist/:class_id' element={<ClassStudent />}></Route>
          <Route path='/dashboard/select_classroom' element={<SelectClassroom />}></Route>
          <Route path='/dashboard/category' element={<Category />}></Route>
          <Route path='/dashboard/classroom' element={<Classroom />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
          <Route path='/dashboard/add_classroom' element={<AddClassroom />}></Route>
          <Route path='/dashboard/add_student' element={<AddStudent />}></Route>
          <Route path='/dashboard/edit_student/:id' element={<EditStudent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
