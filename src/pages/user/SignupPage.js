import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    name : yup.string().required('Name is required'),
    username : yup.string().required('Userame is required'),
    password : yup.string().min(8,'Password should contain 8 characters').required('Password is required'),
  })

function SignupPage() {
    let {  signupUser, errorUser } = useContext(AuthContext);

    const {
        register,  handleSubmit, formState :{errors} } = useForm({
          resolver: yupResolver(schema),
        })

    return (
        <div className="vh-100 p-0 p-sm-6 d-flex align-items-center bg-light">
            <div className="card w-25x flex-grow-1 flex-sm-grow-0 m-sm-auto">
                <form onSubmit={handleSubmit(signupUser)}>
                <div className="card-body mx-sm-3 flex-grow-0">
                    <h1 className="mb-0 fs-3">Sign Up</h1>
                    <div className="fs-exact-14 text-muted mt-2 pt-1 mb-2 pb-2">Fill out the form to create a new account.</div>
                    <div className="mb-0"><label className="form-label">Full name</label>
                    <input type="text" className="form-control form-control-lg" name="name" placeholder="Enter name" {...register('name')}/>
                    <label className="text-danger">{errors.name?.message}</label></div>
                    <div className="mb-0"><label className="form-label">Username</label>
                    <input type="text" className="form-control form-control-lg" name="username" placeholder="Enter Username" {...register('username')}/>
                    <label className="text-danger">{errorUser}{errors.username?.message}</label></div>
                    <div className="mb-1"><label className="form-label">Password</label>
                    <input type="password" className="form-control form-control-lg" name="password" placeholder="Enter Password" {...register('password')}/>
                    <label className="text-danger">{errors.password?.message}</label></div>
                    <div className="pt-2"><button type="submit" className="btn btn-primary btn-lg w-100">Sign Up</button></div>
                </div>
                <div className="card-body flex-grow-0">
                    <div className="form-group pb-3 text-center text-muted">Already have an account? <Link
                        to="/login">Sign in</Link></div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default SignupPage;