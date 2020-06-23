import React from 'react'
import { Redirect, Link } from 'react-router-dom'

export default function SignIn () {
  return (
    <form>
      <div className='signInContainer'>
        <h1>Login</h1>
        <div className='emailContainer'>
          <label>Email</label>
          <input placeholder='Enter Email' />
          {/* <p className='emailError'>Enter Valid Email Address</p> */}
        </div>
        <div>
          <label>Password</label>
          <input placeholder='Enter password' />
          {/* <p className='passwordError'>'Incorrect Password'</p> */}
        </div>
        <button type='submit'>Log In</button>
        <p>
          <Link to='/'>cant Login? Sign Up for an account</Link>
        </p>
      </div>
    </form>
  )
}
