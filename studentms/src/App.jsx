import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Student from './components/Student';
import Category from './components/Category';
import Profile from './components/Profile';
import AddCategory from './components/AddCategory';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/teacherlogin' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/student' element={<Student />}></Route>
          <Route path='/dashboard/category' element={<Category />}></Route>
          <Route path='/dashboard/profile' element={<Profile />}></Route>
          <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
          <Route path='/dashboard/add_student' element={<AddStudent />}></Route>
          <Route path='/dashboard/edit_student/:id' element={<EditStudent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
