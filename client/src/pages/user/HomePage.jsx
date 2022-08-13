import React from 'react'
import Footer from '../../components/user/footer/Footer'
import Home from '../../components/user/home/Home'
import UserHeader from '../../components/user/userHeader/UserHeader'
import UserContext from '../../UserContext'

function HomePage() {
  return (
    <div> 
      <UserHeader/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default HomePage