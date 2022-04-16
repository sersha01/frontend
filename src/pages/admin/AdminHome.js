import React, { useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import AuthContext from '../../context/AuthContext';
import AdminHeader from '../admin/AdminHeader';

const AdminHome = () => {
    const { getUsers, users, userDetails, deleteUser } = useContext(AuthContext);

    useEffect(() => {
        getUsers()
    } , [])

  return (
    <Container>
    <AdminHeader />
      <Row>
          {users.map((user, index) => {
              return (
        <Col xs='12' className='border py-2 my-1 bg-light' key={index}>
            <Row>
                <Col xs='4' className='h4'>{user.name}</Col>
                <Col xs='4' className='h4'>{user.username}</Col>
                <Col xs='2' className='ps-0'><Button variant='outline-success' className='w-100' onClick={userDetails} value={user.id}>Edit</Button></Col>
                <Col xs='2' className='ps-0'><Button variant='outline-danger' className='w-100' onClick={deleteUser} value={user.id}>Delete</Button></Col>
            </Row>
        </Col>
        )})}
      </Row>
    </Container>
  )
}

export default AdminHome

