

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviews } from "../store/review";
import './Home.css';
import Price from "./Price";

function Home() {
    
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
            <div className="value-proposition">

                <div className="value-header">Plan the Perfect Vacation!</div>
                <div className="value-btn-container">
                    {sessionUser && (
                        <NavLink className="navBtnHome" to="/reservation">Set up my Beach Chair!</NavLink>
                        )}
                    {!sessionUser && (
                        <NavLink className="navBtnHome" to="/login">Set up my Beach Chair!</NavLink>
                        )}
                </div>

            </div>
            <Price />

            <div className="topReview">
                <h2>See what other people are saying...</h2>
            {myReviews && myReviews?.map(review => {
                return (
                    
                    <li className='topReview-info' key={review.id} style={{ listStyle: "none" }}>
                <div><strong style={{textDecoration:"underline"}}>{review.location}</strong> - {review.text}
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

        </div>
            
        </>
    )
}

export default Home;