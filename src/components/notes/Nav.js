import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav({setIsLogin}) {

  const logoutSumbit=()=>{
    localStorage.clear()
    setIsLogin(false)
  }

  return (
    <header>
    <div className='logo'>
        <h1><Link to='/'>Notes-App</Link></h1>
    </div>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/create'>Create Note</Link></li>
      <li onClick={logoutSumbit}><Link to='/'>Logout</Link></li>
    </ul>
    </header>
  )
}
