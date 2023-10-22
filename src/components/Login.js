import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const[values, setValues] = useState({
        username: '',
        password: ''
    })

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name] : [event.target.value] }))
    }

    axios.defaults.withCredentials = true
    const handlSubmit = async(event) => {
        event.preventDefault()
        axios.post('https://qr-scanner-jkzb.onrender.com/login',values)
            .then(res => {
                if(res.data.Login){
                    navigate('/scanner')
                }
                else{
                    alert('No Record')
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center' style={{height:"90vh",width:"90vw"}}>
            <form onSubmit={handlSubmit} className='card' action="" style={{ width: "380px",padding: "25px"}}>
                <h3 className='text-center'>Log In</h3>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-bold">Username</label>
                    <input required onChange={handleInput} type="text" className="form-control" name="username" placeholder="username"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label fw-bold">Password</label>
                    <input required onChange={handleInput} type="password" className="form-control" name="password" placeholder="password"/>
                </div>
                <button className="btn btn-success mb-3" type='submit'>Log In</button>
                <Link to="/signup" className="btn btn-success" type='button'>Sign Up</Link>
            </form>
        </div>
    )
}

export default Login