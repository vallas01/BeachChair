import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getReviews } from '../store/review';
import { getReservations } from '../store/reservation'
import './UserPage.css'

function User() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [user, setUser] = useState({});
  const [message, setMessage] = useState([]);
  const {userId}  = useParams();
  const userNum = Number(userId)
  // const sessionUser = useSelector(state => state?.session.user)
  const reviews = Object.values(useSelector(state => state?.review))
  const reservations = Object.values(useSelector(state => state?.reservation))
 
  const myReviewUnordered = reviews?.filter(function(review){
    return review.user_id === userNum;
  })
  const myReview = myReviewUnordered.reverse()
  
  const myReservation = reservations?.filter(function(reservation){
    return reservation.user_id === userNum;
  })

    
  const handleUpdateReview = async (id) => {
    history.push(`/reviews/${id}`)
  }

  const handleUpdateReservation = async (id) => {
    history.push(`/reservation/${id}`)
  }
  
  
  const deleteThisReview = async (id) => {
    setMessage(['Review deleted']);
    history.push(`/review-del/${id}`)
  }

  const deleteThisReservation = async (id) => {
    setMessage(['Reservation deleted']);
    history.push(`/reservation-del/${id}`)
  }
  
  useEffect(() => {
    dispatch(getReviews());
    dispatch(getReservations())
  },[dispatch])
  
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);
  
  if (!user) {
    return null;
  }
  
  
  

  
  return (
    <div className="user-container">

      <div className="detail-container">
        <h2 className='detail-header' >USER DETAILS</h2>
        
        <div className='user-header-details'>

          <img src={'https://res.cloudinary.com/kelp-me/image/upload/v1659139522/default-profile_w8hf54.png'} style={{ height: '250px', width: 'auto' }} alt='avatar' />

          <div className='user-info'>
            <strong 
            >Username: </strong><span style={{color:"red"}} >{user.username} </span>
            <strong>First Name: </strong><span style={{ fontWeight: "normal" }}>{user.first_name} </span>
            <strong> Last Name: </strong><span style={{ fontWeight: "normal" }}>{user.last_name} </span>
            <strong>Email:  </strong><span style={{ fontWeight: "normal" }}>{user.email} </span>
          </div>
          
        </div>
      </div>

      <div className='reservation-container'>
        <h2 className='detail-header' >YOUR UPCOMING BEACH DAYS</h2>
        { (myReservation.length===0) && (<div>NO RESERVATIONS</div>)}
        {reservations && myReservation?.map(reservation => {
          return (
            <li className='review-info' key={reservation.id} style={{ listStyle: "none" }}>
              <div>On {reservation.date}, you'll have Beach Chair setup #{reservation.arrangement} waiting at {reservation.location}!
              <div className='reservation-btn-container'>
                  <button className='demoBtn userBtn'onClick={() => handleUpdateReservation(reservation.id)}>Update</button>
                  <button className='demoBtn userBtn' style={{color:"red"}} onClick={() => deleteThisReservation(reservation.id)}>Delete</button>
                  {/* <hr className='list'></hr> */}
              </div>
              </div>
            </li>
            )
          })}
      </div>

      <div className="topReview top-review-container">
        <h2 className='detail-header' >YOUR REVIEWS</h2>
        { (myReview.length===0) && (<div>NO REVIEWS</div>)}
        {reviews && myReview?.map(review => {
          return (
            <li className='topReview-info' key={review.id} style={{ listStyle: "none" }}>
              <div className="review-text" ><strong style={{textDecoration:"underline"}}>{review.location}</strong> - {review.text}
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

              <button className='demoBtn userBtn' onClick={() => handleUpdateReview(review.id)}>Update</button>
              <button className='demoBtn userBtn' style={{color:"red"}} onClick={() => deleteThisReview(review.id)}>Delete</button>
              <hr className='list'></hr>
            </li>
          )
        })}
      </div>

        {message && (
          <div className='error-container'>{message}</div>
        )}

    </div>
  );
}
export default User;
