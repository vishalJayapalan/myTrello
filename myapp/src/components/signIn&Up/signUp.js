import React, { useState, useEffect } from 'react'
import { setCookie, getCookie } from '../util/cookies'
import { Redirect, Link } from 'react-router-dom'

export default function Signup () {
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [errMsg, setErrMsg] = useState([])
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    const token = getCookie('x-auth-token')
    token && getUser()
  }, [])

  async function getUser () {
    const response = await window.fetch('user')
    if (response.ok) setLogin(true)
  }

  async function userSignUp (event) {
    event.preventDefault()
    try {
      const response = await window.fetch('user/', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          userName: fullName,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const jsonData = await response.json()
        setEmail('')
        setFullName('')
        setPassword('')
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
    <div>
      <div className='overlay-signup'>
        <div className='signup-container'>
          <div className='form-container'>
            <div className='signupNin-title-container'>
              <h1 className='heading'>Register</h1>
            </div>
            <form onSubmit={userSignUp}>
              <div className='errorMessage'>{errMsg}</div>
              <div className='form-row'>
                <label>Full Name</label>
                <input
                  value={fullName}
                  placeholder='Enter Full Name'
                  onChange={e => setFullName(e.target.value)}
                  required
                  title='enter a valid email address'
                />
              </div>
              <div className='form-row'>
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
              <div className='form-row'>
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
              <div className='form-row'>
                <button type='submit'>Register</button>
              </div>
              <div className='form-footer'>
                <Link to='/login'>Already have an Account?Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
