import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Add your login logic here, e.g., call an API to authenticate user
    //     console.log('Form submitted with:', formData);
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', formData); // Log formData for debugging
            console.log('Email:', formData.email); // Log email for debugging
            console.log('Password:', formData.password); // Log password for debugging
            // axios.get('http://localhost:8080/test').then((data)=> {
            //     console.log(data);
            // })
          const response = await axios.post('http://localhost:8080/login', {
            username: formData.email,
            password: formData.password
          });
          
          const token = response.data.token;
          const id = response.data.id;
          // Store token securely (e.g., localStorage)
          localStorage.setItem('token', token);
          localStorage.setItem('id', id);
          console.log('Login successful');
          navigate('/dashboard')
        } catch (error) {
          console.error('Login failed', error);
        }
      };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
