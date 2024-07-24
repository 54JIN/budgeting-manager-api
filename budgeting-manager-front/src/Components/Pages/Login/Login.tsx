import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.css';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const navigate = useNavigate();

    /*
        Objective: Handle the change of the input boxes to be saved inside the state and render the value.
    */
    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    /*
        Objective: When the user click the login button, send an POST api request to server side to create a token to sign in.
            * If the post is 200, and the response contains a token, store the token inside the local storage
            * If the post is an error, !-- Implement the functionality of showing the user there was an error --!
    */
    const clickLoginHandler = async () => {
        try {
            await axios.post(`/api/users/login`, {
                email: formData.email,
                password: formData.password
            }).then((response) => {
                window.localStorage.setItem("token", JSON.stringify(response.data.token))
                //!-- Currently the local storage is not storing the usersName --!
                window.localStorage.setItem("name", JSON.stringify(response.data.user.name))
                navigate('/home')
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="Login">
        <div className="Login-Form">
            <input type="email" placeholder='Email' name="email" value={formData.email} onChange={handleChange} />
            <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange} />
            <button onClick={clickLoginHandler} >Login</button>
        </div>
        </div>
    );
}

export default Login;