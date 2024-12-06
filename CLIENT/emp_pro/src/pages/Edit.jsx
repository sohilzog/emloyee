import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { detailEmployee, empUpdate } from '../services/fetchApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Edit() {
  const [emdetail, setEmpdetail] = useState({
    name: "",
    email: "",
    phone_number: "",
    place: ""
  });
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const header = {
      "Authorization": `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": 'application/json'
    };
    
    detailEmployee(id, header).then((res) => {
      console.log(res.data);
      setEmpdetail(res.data);
    }).catch((error) => {
      console.error("Error fetching employee details:", error);
      toast.error("Failed to fetch employee details.");
    });
  }, [id]);

  const updateData = () => {
    const header = {
      "Authorization": `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": 'application/json'
    };

    empUpdate(id, emdetail, header).then((res) => {
      console.log(res.data);
      toast.success("Data Updated");
      navigate('/');
    }).catch((error) => {
      console.error("Error updating data:", error);
      toast.error("Failed to update data. Please try again.");
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Form style={{ width: '500px' }} onSubmit={(e) => { e.preventDefault(); updateData(); }}>
        <h2>Update Employee</h2>
        <FloatingLabel controlId="floatingName" label="Customer Name" className='mb-3'>
          <Form.Control 
            type="text" 
            placeholder="Name" 
            style={{ height: '50px' }} // Increase height
            onChange={(e) => { setEmpdetail({ ...emdetail, name: e.target.value }) }}  
            value={emdetail.name}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingEmail" label="Email" className='mb-3'>
          <Form.Control 
            type="email" 
            placeholder="Email" 
            style={{ height: '50px' }} // Increase height
            onChange={(e) => { setEmpdetail({ ...emdetail, email: e.target.value }) }} 
            value={emdetail.email}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPhone" label="Phone" className='mb-3'>
          <Form.Control 
            type="text" 
            placeholder="Phone" 
            style={{ height: '50px' }} // Increase height
            onChange={(e) => { setEmpdetail({ ...emdetail, phone_number: e.target.value }) }} 
            value={emdetail.phone_number}
          />
        </FloatingLabel> 
        <FloatingLabel controlId="floatingPlace" label="Place" className='mb-3'>
          <Form.Control 
            type="text" 
            placeholder="Place" 
            style={{ height: '50px' }} // Increase height
            onChange={(e) => { setEmpdetail({ ...emdetail, place: e.target.value }) }} 
            value={emdetail.place}
          />
        </FloatingLabel>
        <Button type="submit" variant="primary" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
          Save
        </Button>
      </Form>
    </div>
  );
}

export default Edit;