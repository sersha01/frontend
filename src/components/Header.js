import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { Button, Col, Container, Row } from 'react-bootstrap';

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <Container><Row>
      <Col className='h2'>Welcome {user.username}</Col>
      <Col className='d-flex justify-content-end'><Button variant='danger' onClick={ logoutUser }>Logout</Button></Col>
    </Row></Container>
  )
}

export default Header
