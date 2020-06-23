import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'

export default function SignUp () {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [Password, setPassword] = useState('')
  return (
    <form>
      <div className='signUpContainer'>
        <h1>Sign Up</h1>
        <div className='emailContainer'>
          <label>Email Address</label>
          <input
            placeholder='Enter Email Address'
            onChange={e => {
              console.log(e.target.value)
              setEmail(e.target.value)
            }}
          />
          {/* <p className='emailError'>Enter Valid Email Address</p> */}
        </div>
        <div>
          <label>Name</label>
          <input placeholder='Enter Full Name' />
          {/* <p className='nameError'>Enter atLeast 3 Characters</p> */}
        </div>
        <div>
          <label>Password</label>
          <input placeholder='Create Password' />
          {/* <p className='passwordError'>'dynamic value based on input'</p> */}
        </div>
        <button
          onClick={() => {
            console.log('buttonClicked')
          }}
        >
          Sign Up
        </button>
        <p>
          <Link to='/login'>already Have an Account?login</Link>
        </p>
      </div>
    </form>
  )
}
