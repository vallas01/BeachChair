import React from 'react';
import './Footer.css'


function About() {
    return (
        <>
            <h2 className='about'>About me</h2>
            <div className="aboutMe">
                    <img className='aboutImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1659464428/Andrew_andfri.jpg' alt='me'></img>
                    <img className='aboutImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1659464444/Andrew2_s79uli.png' alt='me'></img>
                    <p>Andy</p>
            </div>
        </>
    )
}

export default About