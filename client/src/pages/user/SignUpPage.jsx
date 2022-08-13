import React from 'react'
import Footer from '../../components/user/footer/Footer'
import Signup from '../../components/user/signup/Signup'
import UserHeader from '../../components/user/userHeader/UserHeader'

function SignUpPage() {
  return (
    <div>
      <UserHeader/>
      <Signup/>
      {/* <Footer/> */}
    </div>
  )
}

export default SignUpPage