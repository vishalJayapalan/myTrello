import React from 'react'

export default function SignIn () {
  return (
    <form>
      <div className='signInContainer'>
        <div className='emailContainer'>
          <input placeholder='Enter Email' />
          <p className='emailError'>Enter Valid Email Address</p>
        </div>
        <div>
          <input placeholder='Enter password' />
          <p className='passwordError'>'Incorrect Password'</p>
        </div>
        <button type='submit'>Log In</button>
      </div>
    </form>
  )
}
