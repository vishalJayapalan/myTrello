import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { setCookie, getCookie } from '../util/cookies'

export default function SignIn () {
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState([])

  useEffect(() => {
    const token = getCookie('x-auth-token')
    token && getUser()
  }, [])

  async function getUser () {
    const response = await window.fetch('user')
    if (response.ok) {
      const jsonData = await response.json()
    }
    if (response.ok) setLogin(true)
  }

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
        setLogin(true)
      } else {
        const jsonData = await response.json()
        setErrorMsg(jsonData.msg)
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
    <div>
      <div className='overlay-signin'>
        <div className='signin-container'>
          <div className='form-container'>
            <div className='signupNin-title-container'>
              <h1 className='heading'>Login</h1>
            </div>
            <form onSubmit={userLogin}>
              <div className='errorMessage'>{errorMsg}</div>
              <div className='form-row'>
                <label>Email</label>
                <input
                  type='email'
                  value={email}
                  placeholder='Enter Email'
                  pattern='.{6,}'
                  onChange={e => setEmail(e.target.value)}
                  required
                  title='Enter a valid email address with atleast 6 characters'
                />
              </div>
              <div className='form-row'>
                <label>Password</label>
                <input
                  type='password'
                  value={password}
                  placeholder='Enter Password'
                  required
                  pattern='.{6,}'
                  title='6 characters minimum'
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className='form-row'>
                <button type='submit'>Log In</button>
              </div>
              <div className='form-footer'>
                <Link to='/'>Dont have an account,click here to Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
