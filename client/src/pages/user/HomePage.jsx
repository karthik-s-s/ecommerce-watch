import React from 'react'
import Home from '../../components/user/home/Home'
import UserHeader from '../../components/user/userHeader/UserHeader'
import UserContext from '../../UserContext'

function HomePage() {
  return (
    <div> 
      <UserHeader/>
      <Home/>
    </div>
  )
}

export default HomePage