import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  return (
    <nav>
      <div className="container nav__container">
        <ul className='nav menu'>
          {/* Show Create Post only if user is alumni */}
          {role === 'alumni' && (
            <li>
              <Link to="/blogs/create">Create Post</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
