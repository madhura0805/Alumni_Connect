import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <div className="container nav__container">
        <ul className='nav menu'>
          <li><Link to="/blogs/create">Create Post</Link></li>
          <li><Link to="/myposts/1">My Posts</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
