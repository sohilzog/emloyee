import Header from './Header';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { listEmp } from '../services/fetchApi';
import '../css/home.css'; 

function Home() {
    const [emp, setEmp] = useState([]);

    useEffect(() => {
        const header = {
            "Authorization": `Token ${sessionStorage.getItem("token")}`,
            "Content-Type": 'application/json'
        };

        listEmp(header)
            .then((res) => {
                console.log(res.data);
                setEmp(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    {/* <Col md={3} sm={12}>
                        <Link to="/addemployee" className='btn btn-success mt-3'>Add Employee</Link>
                    </Col> */}
                    <Col md={9} sm={12}>
                        {emp.length === 0 ? (
                            <h4>No Data Available</h4>  
                        ) : (
                            <table className='mt-3 table table-bordered table-st'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>PHONE NUMBER</th>
                                        <th>PLACE</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emp.map((td) => (
                                        <tr key={td.id}>
                                            <td>{td.id}</td>
                                            <td>{td.name}</td>
                                            <td>{td.email}</td>
                                            <td>{td.phone_number}</td>
                                            <td>{td.place}</td>
                                            <td>
                                                <Link to={`/detail/${td.id}`} className='btn btn-success mt-3'>View</Link>
                                                <Link to={`/edit/${td.id}`} className='btn btn-success mt-3'>Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
