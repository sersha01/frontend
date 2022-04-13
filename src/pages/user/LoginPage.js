import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  let { loginUser, errorLogin } = useContext(AuthContext);
  return (
    <div className="vh-100 p-0 p-sm-6 d-flex align-items-center bg-light">
            <div className="card w-25x flex-grow-1 flex-sm-grow-0 m-sm-auto">
              <form onSubmit={loginUser}>
                <div className="card-body mx-sm-3 flex-grow-0">
                    <h1 className="mb-0 fs-3">Sign In</h1>
                    <div className="fs-exact-14 text-muted mt-2 pt-1 mb-4 pb-2">Log in to your account to continue.</div>
                    <div className="mb-3"><label className="form-label">Username</label>
                    <input type="text" className="form-control form-control-lg" name="username" placeholder="Enter Username" /></div>
                    <div className="mb-2"><label className="form-label">Password</label>
                    <input type="password" className="form-control form-control-lg" name="password" placeholder="Enter Password" />
                    <label className="text-danger">{errorLogin}</label></div>
                    <div className="pt-2"><button type="submit" className="btn btn-primary btn-lg w-100">Sign In</button></div>
                </div>
                <div className="card-body flex-grow-0">
                    <div className="form-group pb-3 text-center text-muted">Don&#x27;t have an account? <Link
                        to="/signup">Sign Up</Link></div>
                </div>
                </form>
            </div>
        </div>
  )
}

export default LoginPage
