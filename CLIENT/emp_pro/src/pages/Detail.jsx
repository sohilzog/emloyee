import React from 'react'
import { detailEmployee } from '../services/fetchApi';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { empDelete } from '../services/fetchApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function Detail() {

    const[empl,setEee]=useState({})
    const navigate=useNavigate()


    
    


    const {id}=useParams()
    console.log(id);

    useEffect(()=>{
        const header={
            "Authorization":`Token ${sessionStorage.getItem("token")}`,
            "Content-Type":'application/json'
          }
        detailEmployee(id,header).then((res)=>{
            console.log(res.data);
            setEee(res.data)
        })
    },[])
    console.log(setEee);

 

    const delEmpl = () => {
        const header = {
            "Authorization": `Token ${sessionStorage.getItem("token")}`,
            "Content-Type": 'application/json'
        };
    
        empDelete(id, header).then((res) => {
            console.log(res); // Check the response
            toast.warning("Employee deleted successfully");
            navigate('/');
        }).catch((error) => {
            console.error("Error deleting employee:", error);
            toast.error("Failed to delete employee");
        });
    };

  

    
  return (
    <div>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
  <Card style={{ width: '50rem',height:"30rem", backgroundColor: '#f8f9fa', borderRadius: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <Card.Body style={{ padding: '20px' }}>
      <Card.Title style={{ textAlign: 'center', color: '#007bff', fontSize: '2rem', fontWeight: 'bold' }}>
        <h1>Employee Details</h1>
      </Card.Title>
      <Card.Text style={{ lineHeight: '1.6', color: '#343a40' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}> ID: {empl.id}</h2>
        <h4 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>NAME: {empl.name}</h4>
        <h5 style={{ fontSize: '2.5rem', marginBottom: '6px' }}>MOBILE: {empl.phone_number}</h5>
        <h5 style={{ fontSize: '2.5rem', marginBottom: '6px' }}>PLACE: {empl.place}</h5>



      </Card.Text>
      
    </Card.Body>
    <button className='btn btn-danger' onClick={delEmpl}>Delete</button>
  </Card>
</div>
</div>




  )
}

export default Detail