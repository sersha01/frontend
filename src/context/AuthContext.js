import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [errorUser, setErrorUser] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userEdit, setUserEdit] = useState(null);

    const loginUser = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ 'username' : e.target.username.value, 'password' : e.target.password.value })
        });
        const data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            setErrorLogin(null)
            navigate('/');
        }else{
            console.log('dey');
            setErrorLogin('Username or Password is error')
        }
    }
    const adminLogin = async (e)=>{
        e.preventDefault();
        const response = await axios.post('http://127.0.0.1:8000/api/token/',{
            'username' : e.target.username.value,
            'password' : e.target.password.value
        }).catch(err=>{
            setErrorLogin('Username or Password is error')
        })
        if (response.status === 200) {
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            setErrorLogin(null)
            navigate('/admin');
        }
    }
    const logoutUser = ()=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-danger',
              cancelButton: 'btn btn-success'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                setAuthTokens(null);
                setUser(null);
                localStorage.removeItem('authTokens');
                navigate('/login');
            }
          })
    }
    const logoutAdmin = ()=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-danger',
              cancelButton: 'btn btn-success'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                setAuthTokens(null);
                setUser(null);
                localStorage.removeItem('authTokens');
                navigate('/admin/login');
            }
          })
    }
    const signupUser = async ({name, username, password})=>{
        const response = await fetch('http://127.0.0.1:8000/api/signup/', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ 'name' : name, 'username' : username, 'password' : password })
        });
        const data = await response.json();
        if (data.status === true) {
            setErrorUser(null);
            navigate('/login');
        }else{
            setErrorUser("Username already exists");
        }
    }
    const getData = async () => {
        const response = await axios.get('http://localhost:8000/api/',{
          headers: {
            Authorization: `Bearer ${authTokens.access}`
          }
        });
        setData(response.data.data);
      }
    const getUsers = async () => {
        const response = await axios.post('http://localhost:8000/api/getusers/',{},{
            headers: {
              Authorization: `Bearer ${authTokens.access}`
            }
          })
          .then(res=>{
            if (response.status === 200) {
                setUsers(response.data.data);
                navigate('/admin');
                }else{
                    navigate('/')
                }
          })
          .catch(err=>{
            navigate('/')
            })
    }
    const createUser = async (e)=>{
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/adduser/',{
            'name' : e.target.name.value,
            'username' : e.target.username.value,
            'password' : e.target.password.value
        },{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
        if (response.status === 200) {
            getUsers();
        }
    }
    const userDetails = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/userdetails/',{
            'id' : e.target.value,
        },{
            headers: {
              Authorization: `Bearer ${authTokens.access}`
            }
          })
        setUserEdit(response.data.data);
        navigate('/admin/edit');
    }
    const updateUser = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/updateuser/',{
            'id' : userEdit.id,
            'name' : e.target.name.value,
            'username' : e.target.username.value,
        },{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
        if (response.data.status === true) {
            setUserEdit(null);
            navigate('/admin');
        }
    }
    const deleteUser = async (e) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
              e.preventDefault();
              const response = await axios.post('http://localhost:8000/api/deleteuser/',{
                  'id' : e.target.value,
              },{
                  headers: {
                      Authorization: `Bearer ${authTokens.access}`
                  }
              })
              setUsers(response.data.data)
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your file is safe :)',
                'error'
              )
            }
          })
    }
    const updateToken = async ()=>{
          const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
              method : 'POST',
              headers : {
                  'Content-Type' : 'application/json'
              },
              body : JSON.stringify({ 'refresh' : authTokens.refresh })
          });
          const data = await response.json();
          if (response.status === 200) {
              setAuthTokens(data);
              setUser(jwt_decode(data.access));
              localStorage.setItem('authTokens', JSON.stringify(data));
              navigate('/');
          }else{
              logoutUser();
          }
      }
    const isAdmin = async ()=>{
        const response = await axios.post('http://localhost:8000/api/isadmin/',{},{
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        }).then(res=>{
            if (res.data.status === true) {
                return true;
            }else{
                navigate('/');
            }})
    }

    const contextData = {
        user:user,
        users:users,
        errorUser:errorUser,
        userEdit:userEdit,
        errorLogin:errorLogin,
        authTokens:authTokens,
        data:data,
        getData:getData,
        getUsers:getUsers,
        loginUser:loginUser,
        adminLogin:adminLogin,
        createUser:createUser,
        userDetails:userDetails,
        updateUser:updateUser,
        deleteUser:deleteUser,
        logoutUser:logoutUser,
        logoutAdmin:logoutAdmin,
        signupUser:signupUser,
        isAdmin:isAdmin,
    }
    useEffect(()=>{
        const refreshTime = 1000 * 60 * 5;
        const interval = setInterval(()=>{
            if (authTokens) {
                updateToken();
            }
        }, refreshTime)
        return ()=>clearInterval(interval);
    },[authTokens]);
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}