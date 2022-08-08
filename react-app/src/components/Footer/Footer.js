import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css'


function Footer() {
    return (
        <div className='footer-container'>
            <div className='link-container'>
                <NavLink className="footer-link" to="/technology">TECH</NavLink>
                <img className='footerImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1659964106/Beachchair/drink_fav-removebg_vpsgvn.png' alt='yelp'></img>
                <NavLink className="footer-link" to="/about">ABOUT</NavLink>
            </div>
            <hr></hr>
            <div className='team-container'>
                    <div className='team-container1'>Designed by Andrew Vallas</div>
                    <div lassName="footer-link">
                        <div className='team-container2' >
                            <i className="fa-brands fa-github-square"></i>
                            <a className="footer-link" href='https://github.com/vallas01'  >GitHub</a>
                        </div>
                        <div>
                            <i className="fa-brands fa-linkedin"></i>
                            <a className="footer-link" href='https://www.linkedin.com/in/andrew-vallas-221b5a241/' >LinkedIn</a>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Footer;