import React from 'react'
import Login from '../../components/user/login/Login'
import UserHeader from '../../components/user/userHeader/UserHeader'
import UserContext from '../../UserContext'

function LoginPage() {
  return (
    <div>
        
      <UserHeader/>
      <Login/>
      </div>
  )
}

export default LoginPage