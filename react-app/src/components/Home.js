
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviews } from "../store/review";
import './Home.css';
import Price from "./Price";

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
            <h2 className="user-header">Plan the Perfect Vacation!</h2>
                

                {sessionUser && (
                    <NavLink className="navBtn" to="/reservation">Let's Do It!</NavLink>
                )}
                {!sessionUser && (
                    <NavLink className="navBtn" to="/login">Set up my Beach Chair!</NavLink>
                )}
            </div>

            <Price />

            <div className="topReview">
                <h2>See what other people are saying...</h2>
            {myReviews && myReviews?.map(review => {
                return (
                    
                <li className='topReview-info' key={review.id} style={{ listStyle: "none" }}>
                <div><strong>{review.location}</strong> - {review.text}
                </div>  
              

              <div className="topReview-stars">
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