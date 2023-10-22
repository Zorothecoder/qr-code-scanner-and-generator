import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const[values, setValues] = useState({
        emailid: '',
        username: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name] : [event.target.value] }))
    }

    const handlSubmit = async(event) => {
        event.preventDefault()
        axios.post('https://qr-scanner-jkzb.onrender.com/signup',values).then(res => navigate('/qr-code-scanner-and-generator')).catch(err => console.log(err))
    }
    
    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"90vh",width:"90vw"}}>
            <form  onSubmit={handlSubmit} className='card' action="" style={{ width: "30vw",padding: "25px"}}>
                <h3 className='text-center'>Sign Up</h3>
                <div  className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Email ID</label>
                    <input required onChange={handleInput} type="email" className="form-control" id="email" name="emailid" placeholder="name@example.com"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-bold">Username</label>
                    <input required onChange={handleInput} type="text" className="form-control" id="username" name="username" placeholder="username"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label fw-bold">Password</label>
                    <input required onChange={handleInput} type="password" className="form-control" id="Password" name="password" placeholder="password"/>
                </div>
                <button className="btn btn-success mb-3" type='submit'>Sign Up</button>
                <Link to="/qr-code-scanner-and-generator" className="btn btn-success" type='button'>Log In</Link>
            </form>
        </div>
    )
}

export default Signup