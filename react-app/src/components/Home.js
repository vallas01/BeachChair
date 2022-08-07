
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviews } from "../store/review";
import './Home.css';


function Home() {
    // eslint-disable-next-line
    const dispatch = useDispatch()
    
    const sessionUser = useSelector(state => state?.session.user);
    const reviews = Object.values(useSelector(state => state?.review))

    const myReviews = reviews?.filter(function(review){
        return review.rating === 5;
      })

    console.log('Reviews===',myReviews)

    useEffect(() => {
        dispatch(getReviews());
      },[dispatch])


    
   
    return (
        <>
            
            <div className="home-container">
            <h2 className="user-header">Welcome to the Home Page!</h2>
                

                {sessionUser && (
                    <NavLink className="navBtn" to="/reservation">Let's Do It!</NavLink>
                )}
                {!sessionUser && (
                    <NavLink className="navBtn" to="/login">Set up my Beach Chair!</NavLink>
                )}
            </div>



            <div className="price-container">
                <div className="price-subcontainer">
                    <h3> Setup #1 (Basic) <br></br> 1 Umbrella & 2 Chairs | Weekly Rate  </h3>
                    <div className="prices">
                        <img className="offer grow" src='https://res.cloudinary.com/kelp-me/image/upload/v1659796121/Beachchair/umbrella1_epcsoj.webp' alt='beachchair'></img>
                            <p>
                                $299 Mon to Fri Setup Fee<br></br>
                                Umbrella x 1 Included<br></br>
                                Chairs x 2 Included
                            </p>
                    </div>
                </div>
                <div className="price-subcontainer">
                    <h3> Setup #2 (Family) <br></br> Cabana & 2 Chairs | Weekly Rate</h3>
                    <div className="prices">
                        <img className="offer grow" src='https://res.cloudinary.com/kelp-me/image/upload/v1659796131/Beachchair/umbrella2_zxtz7d.webp' alt='beachchair'></img>
                            <p>
                                $399 Mon to Fri Setup Fee<br></br>
                                Cabana x 1 Included<br></br>
                                Chairs x 4 Included
                            </p>
                    </div>
                </div>
                <div className="price-subcontainer">
                        <h3>Setup #3 (Deluxe) <br></br> Cabana & 6 Chairs | Weekly Rate  </h3>
                    <div className="prices">
                        <img className="offer grow" src='https://res.cloudinary.com/kelp-me/image/upload/v1659796137/Beachchair/umbrella3_k2msob.webp' alt='beachchair'></img>
                            <p>
                                $649 Mon to Fri Setup Fee<br></br>
                                Cabana x 1 Included<br></br>
                                Chairs x 6 Included<br></br>
                                Fully Stocked Cooler<br></br>
                                with Dricks and Ice!!!
                            </p>
                    </div>
                </div>
            </div>

            <div className="topReview">
                <h2>See what other people are saying...</h2>
            {myReviews && myReviews?.map(review => {
                return (
                    
                <li className='review-info' key={review.id} style={{ listStyle: "none" }}>
                <div>
                <strong>Location reviewed: </strong>
                {review.location}
              </div>
              <div>
                  {review.text}
              </div>  
              

              <div>
                {review.rating === 5 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review">&#9733; &#9733; &#9733; &#9733; &#9733;</label>
                )}
                {review.rating === 4 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review">&#9733; &#9733; &#9733; &#9733; <span className="empty-stars">&#9733;</span> </label>
                )}
                {review.rating === 3 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review">&#9733; &#9733; &#9733; <span className="empty-stars">&#9733; &#9733;</span></label>
                )}
                {review.rating === 2 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review">&#9733; &#9733; <span className="empty-stars">&#9733; &#9733; &#9733;</span></label>
                )}
                {review.rating === 1 && (
                  <label style={{ cursor: "pointer" }}
                    className="star-review">&#9733; <span className="empty-stars">&#9733; &#9733; &#9733; &#9733;</span> </label>
                )}
              </div>
                </li>
                )
            })}
            </div>

            
        </>
    )
}

export default Home;