import './registerView.scss';

import React, { useState, useEffect } from 'react'

const RegisterView = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(() => {
    //   first
    
    //   return () => {
    //     second
    //   }
    // }, [third])
    
    return (
    <>
        <h1>Register!</h1>
        <form>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' value={email} placeholder='Email' />
            <label htmlFor='username'>Username</label>
            <input type="text" name='username' id='username' value={username} placeholder='Username' />
            <label htmlFor='password'>Password</label>
            <input type="password" name='password' id='password' value={password} placeholder='Password' />
            <button type='submit'>Register</button>
        </form>
    </>
  )
}

export default RegisterView;