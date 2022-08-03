
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';



const NavBar = () => {
  const sessionUser = useSelector(state => state?.session.user);
  
  
  let sessionLinks;
  if (sessionUser) {
      sessionLinks = (
        <div className='navUser' >

          <div className='navUser-container1'>
            <NavLink to='/users' exact={true} activeClassName='active'>Users</NavLink>
          </div>

          <div className='navUser-container1'>
            <NavLink to='/reviews' exact={true} activeClassName='active'>Write a Review</NavLink>
          </div>
          <div className='navUser-container2'>
            <LogoutButton />
          </div>
        </div>
      )
  } else {
    sessionLinks = (
        <div className='navUser' >
          <div className='navUser-container1'>
            <NavLink className="navBtn" to='/login' exact={true} activeClassName='active'>Login</NavLink>
          </div>
          <div className='navUser-container2'>
            <NavLink className="navBtn" to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
          </div>
        </div>
    )
  }


  return (
    <nav>
      <div className='logoContainer'>
        <NavLink to='/' exact={true} activeClassName='active' id='beachchair-home-link'>
           Beach Chair
        </NavLink>
        <img className='imgLogo' src='https://res.cloudinary.com/kelp-me/image/upload/v1659468423/jimmy-buffet-clipart-3_czg79p.gif' alt='parrot'></img>
      </div>
        {sessionLinks}
  
    </nav>
  );
}

export default NavBar;
