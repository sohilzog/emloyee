import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AddEmployee from './pages/AddEmployee';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Register from './pages/Register';
import FormBuilder from './pages/FormBuilder';
import FormList from './pages/FormList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './bootstrap.min.css'
import Header from './pages/Header';
import Profile from './pages/Profile';


function App() {
  const [count, setCount] = useState(0)

  return (

  
     <>
     <Header />

     <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/profile" element={<Profile />} />


        <Route path="/formbuilder" element={<FormBuilder />} />
        <Route path="/formlist" element={<FormList />} />






      </Routes>
    <ToastContainer />
    </>
      
  )
}

export default App
