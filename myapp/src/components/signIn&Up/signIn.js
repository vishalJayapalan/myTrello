import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { setCookie, getCookie } from '../util/cookies'

export default function SignIn () {
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState([])

  useEffect(() => {
    const token = getCookie('x-auth-token')
    token && setLogin(true)
  }, [])

  async function userLogin (event) {
    event.preventDefault()
    try {
      const response = await window.fetch('user/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const jsonData = await response.json()
        setEmail('')
        setPassword('')
        // setCookie('x-auth-token', jsonData.token)
        setLogin(true)
      } else {
        const jsonData = await response.json()
        console.log(jsonData)
        setErrMsg(jsonData.msg)
        setEmail('')
        setPassword('')
        throw new Error(jsonData.msg)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return login ? (
    <Redirect to='/boards' />
  ) : (
    <form onSubmit={userLogin}>
      <div className='signInContainer'>
        <h1>Login</h1>
        <div className='errorMessage'>{errMsg}</div>
        <div className='form emailContainer'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            placeholder='Enter Email'
            onChange={e => setEmail(e.target.value)}
            required
            title='enter a valid email address'
          />
        </div>
        <div className='form'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            placeholder='Enter password'
            required
            pattern='.{6,}'
            title='6 characters minimum'
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Log In</button>
        <p>
          <Link to='/'>cant Login? Sign Up for an account</Link>
        </p>
      </div>
    </form>
  )
}
