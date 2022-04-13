import React, { useContext } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const AdminCreate = () => {

    const { createUser } = useContext(AuthContext);

  return (
    <div>
      <Row className='vh-100 align-items-center justify-content-center card py-5'>
        <Col xs='12' md='9' lg='4' className='border my-1 bg-light p-5'>
        <Form onSubmit={createUser}>

        <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder={"Enter Name"} name='name' />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" name='username' />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" name='password' />
        </Form.Group>

        <Row className='pt-3'>
            <Col xs='6' className='d-flex justify-content-center'>
                <Link to='/admin' className='w-75'>
            <Button variant="outline-primary" type="button" className='w-100'>
                Back
            </Button>
                </Link>
            </Col>
            <Col xs='6' className='d-flex justify-content-center'>
            <Button variant="outline-success" type="submit" className='w-75'>
                Create
            </Button>
            </Col>
        </Row>
        </Form>
        </Col>
      </Row>
    </div>
  )
}

export default AdminCreate
