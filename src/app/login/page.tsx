"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function LoginPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      const response = await axios.post("api/users/login", user)
      console.log("Login Success", response.data)
      router.push('/profile')
      setButtonDisabled(true)

    } catch (error: any) {
      console.log("Login Failed")
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>
        {loading? "Loading...": "Login"}
      </h1>
      <label htmlFor="email">E-mail</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="email"
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='johndoe@gmail.com'
      />
      <label htmlFor="password">Password</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="password"
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='123456'
      />
      <button
        onClick={onLogin}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {buttonDisabled ? "ⓧ" : "Login" }
      </button>
      Doesn't have an account? <Link href="/login" className='underline font-extrabold'> Signup here </Link> 
    </div>
  )
}

export default LoginPage