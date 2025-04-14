import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const isBlogListingPage = location.pathname === '/blogs';

  return (
    <nav>
      <div className="container nav__container">
        <ul className='nav menu'>
          {/* Show Create Post only if user is alumni and on blog listing page */}
          {role === 'alumni' && isBlogListingPage && (
            <li>
              <Link to="/blogs/create">Create a New Blog</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
