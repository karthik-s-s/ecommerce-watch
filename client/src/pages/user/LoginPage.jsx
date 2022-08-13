import React from 'react'
import Footer from '../../components/user/footer/Footer'
import Login from '../../components/user/login/Login'
import UserHeader from '../../components/user/userHeader/UserHeader'
import UserContext from '../../UserContext'

function LoginPage() {
  return (
    <div>
        
      <UserHeader/>
      <Login/>
      {/* <Footer/> */}
      </div>
  )
}

export default LoginPage