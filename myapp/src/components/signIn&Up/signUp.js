import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { setCookie, getCookie } from '../util/cookies'

export default function SignUp () {
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [errMsg, setErrMsg] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    const token = getCookie('x-auth-token')
    token && setLogin(true)
  }, [])

  async function userSignUp (event) {
    event.preventDefault()
    try {
      const response = await window.fetch('user/', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          userName: userName,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const jsonData = await response.json()
        setEmail('')
        setUserName('')
        setPassword('')
        // setCookie('x-auth-token', jsonData.token)
        setLogin(true)
      } else {
        const jsonData = await response.json()
        setErrMsg(jsonData.msg)
        throw new Error(jsonData.msg)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return login ? (
    <Redirect to='/boards' />
  ) : (
    <form onSubmit={userSignUp}>
      <div className='signUpContainer'>
        <h1>Sign Up</h1>
        <div className='errorMessage'>{errMsg}</div>
        <div className='form emailContainer'>
          <label>Email Address</label>
          <input
            type='email'
            required
            title='enter a valid email address'
            pattern='.{6,}'
            value={email}
            placeholder='Enter Email Address'
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div className='form'>
          <label>Name</label>
          <input
            type='text'
            value={userName}
            required
            pattern='.{6,}'
            title='6 characters minimum'
            onChange={e => setUserName(e.target.value)}
            placeholder='Enter Full Name'
          />
        </div>
        <div className='form'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            required
            pattern='.{6,}'
            title='6 characters minimum'
            onChange={e => setPassword(e.target.value)}
            placeholder='Create Password'
          />
        </div>
        <button type='submit'>Sign Up</button>
        <p>
          <Link to='/login'>already Have an Account?login</Link>
        </p>
      </div>
    </form>
  )
}
