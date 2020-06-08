import React from 'react'

export default function SignUp () {
  return (
    <form>
      <div className='signUpContainer'>
        <div className='emailContainer'>
          <input placeholder='Enter Email Address' />
          <p className='emailError'>Enter Valid Email Address</p>
        </div>
        <div>
          <input placeholder='Enter Full Name' />
          <snap className='nameError'>Enter atLeast 3 Characters</snap>
        </div>
        <div>
          <input placeholder='Create Password' />
          <snap className='passwordError'>'dynamic value based on input'</snap>
        </div>
        <button type='submit'>Sign Up</button>
      </div>
    </form>
  )
}
