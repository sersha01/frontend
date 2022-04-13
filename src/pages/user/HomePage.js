import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'
import Header from '../../components/Header'
import AuthContext from '../../context/AuthContext';


const HomePage = () => {

  const { user, getData, data } = useContext(AuthContext);

  useEffect(() => {
    getData()
  },[])

  return (
    <div>
    <Header />
    <Row className="vh-100 p-0 p-sm-6 d-flex align-items-center bg-light">
      {data.map((item, index) => {
        return (
      <Col xs='12' md='6' lg='3' className="card w-25x flex-grow-1 flex-sm-grow-0 m-sm-auto d-flex justify-content-center" key={index}>
        <div className="card-body mx-sm-3 flex-grow-0 d-flex justify-content-center">
          <img src={item} />
        </div>
        <div className='card-title mx-sm-3 text-center'>
          <h3>{user.name}</h3>
          <h4>{user.username}</h4>
        </div>
      </Col>
        )})}
    </Row>
    </div>
  )
}

export default HomePage
