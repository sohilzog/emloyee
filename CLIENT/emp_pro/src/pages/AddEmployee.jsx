import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addEmployee } from '../services/fetchApi'; // Ensure this function is correctly defined in your fetchApi file

function AddEmployee() {
    const [addEmp, setAddEmp] = useState({
        name: '', email: "", phone_number: "", place: ""
    });

    const navigate = useNavigate();

    const submitData = () => {
        const header = {
            "Authorization": `Token ${sessionStorage.getItem("token")}`,
            "Content-Type": 'application/json'
        };

        const { name, email, phone_number, place } = addEmp;

        if (!name || !email || !phone_number || !place) {
            toast.warning("Invalid output");
            return; // Exit if validation fails
        }

        addEmployee(addEmp, header).then((res) => {
            console.log(res.data);
            toast.success("Customer added successfully");
            navigate("/");
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to add customer");
        });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Form style={{ width: '500px' }} onSubmit={(e) => { e.preventDefault(); submitData(); }}>
                <h2>Add Customer</h2>
                <FloatingLabel controlId="floatingName" label="Customer Name" className='mb-3'>
                    <Form.Control 
                        type="text" 
                        placeholder="Name" 
                        style={{ height: '50px' }} // Increase height
                        onChange={(e) => { setAddEmp({ ...addEmp, name: e.target.value }) }} 
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmail" label="Email" className='mb-3'>
                    <Form.Control 
                        type="email" 
                        placeholder="Email" 
                        style={{ height: '50px' }} // Increase height
                        onChange={(e) => { setAddEmp({ ...addEmp, email: e.target.value }) }} 
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPhone" label="Phone" className='mb-3'>
                    <Form.Control 
                        type="text" 
                        placeholder="Phone" 
                        style={{ height: '50px' }} // Increase height
                        onChange={(e) => { setAddEmp({ ...addEmp, phone_number: e.target.value }) }} 
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPlace" label="Place" className='mb-3'>
                    <Form.Control 
                        type="text" 
                        placeholder="Place" 
                        style={{ height: '50px' }} // Increase height
                        onChange={(e) => { setAddEmp({ ...addEmp, place: e.target.value }) }} 
                    />
                </FloatingLabel>
                <Button type="submit" variant="primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                    Save
                </Button>
            </Form>
        </div>
    );
}

export default AddEmployee;