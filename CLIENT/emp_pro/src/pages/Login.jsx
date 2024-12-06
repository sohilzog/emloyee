import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { userLogin } from '../services/fetchApi';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [logData, setLogData] = useState({
    username: '',
    password: '',
  });

  const formSubmit = () => {
    const { username, password } = logData;
    if (!username || !password) {
      toast.warning('Please enter both username and password');
      return;
    }

    userLogin(logData)
      .then((res) => {
        console.log(res.data.token);
        toast.success('Login Successful');
        sessionStorage.setItem('token', res.data.token);
        navigate('/');
      })
      .catch((err) => {
        console.error(err); // Log the error for debugging purposes
        toast.error('Invalid credentials. Please check and try again.');
      });
  };

  return (
    <div className="d-flex w-100 p-5 m-5 align-items-center justify-content-center">
      <div className="w-50 p-5">
        <h3 className="text-dark">Login To Your Account</h3>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="formBasicUsername"
            onChange={(e) => setLogData({ ...logData, username: e.target.value })}
          >
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setLogData({ ...logData, password: e.target.value })}
            />
          </Form.Group>
        </Form>
        <div>
          <button
            className="btn btn-success"
            onClick={(e) => {
              e.preventDefault(); // Prevent default form submission
              formSubmit();
            }}
          >
            Login
          </button>
          <Link to={'/register'}>New User? SignUp</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
