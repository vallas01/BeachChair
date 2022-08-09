import React from 'react';
import './Footer.css'


function About() {
    return (
        <>
         <div className='tech-container'></div>

            <div className='about-subcontainer'>I love learning.  While tinkering with Raspberry and Arduino micro-computers, I quickly found out my coding skills were too rusty for more complicated projects and so I decided I wanted to update my skill set.  Maybe a 24 week bootcamp was overkill but after writing the code for this website, programming an Arduino seems pretty easy now!!!
                    <p style={{color:"red"}}>Andy</p>
            </div>
            
            <div className="aboutMe">
                    <img className='aboutImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1659464428/Andrew_andfri.jpg' alt='me'></img>
                    <img className='aboutImage' src='https://res.cloudinary.com/kelp-me/image/upload/v1659464444/Andrew2_s79uli.png' alt='me'></img>
            </div>
        </>
    )
}

export default About