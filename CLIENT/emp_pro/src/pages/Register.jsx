import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { userRegister } from '../services/fetchApi';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate=useNavigate()
    const [regUser,setUserRegister]=useState({
        username: "",email:"",password:""
    })
    console.log(regUser)
    const formSubmit=()=>{
        const {username,email,password}=regUser
        if(!username || !email ||!password){
            toast.warning("Invalid Output")
        }
        else{
            userRegister(regUser)
                toast.success("User Registered Successfully")
                navigate('/')
            


        }
    }





  return (
    <div className='d-flex w-100 p-5 m-5 align-items-center justify-content-center'> 
    <div className='w-50 p-5'>
        <h3 className='text-dark'>Register Your Account</h3>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername" >
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Username" onChange={(e)=>setUserRegister({...regUser,username:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setUserRegister({...regUser,email:e.target.value})} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setUserRegister({...regUser,password:e.target.value})} />
      </Form.Group>
      </Form>
      
      <div className='mt-5 d-flex justify-content-between' >
        <button className='btn btn-success' onClick={(e)=>{formSubmit()}}>Register</button>
        <Link to={'/login'} style={{textDecoration:"none"}}>Already have an account? SignIn here</Link>
      </div>
      </div>

    </div>
  )
}

export default Login  