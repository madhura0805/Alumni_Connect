import React from 'react'
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <nav>
      <div className="container nav__container">
        <ul className='nav menu'>
          <li><Link to="/create">Create Post</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
