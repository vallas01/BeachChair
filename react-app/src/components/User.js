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
 
  const myReview = reviews?.filter(function(review){
    return review.user_id === userNum;
  })
  
  const myReservation = reservations?.filter(function(reservation){
    return reservation.user_id === userNum;
  })

  console.log('TEST1',reservations)
  console.log('TEST2',myReservation)
  
  const handleUpdate = async (id) => {
    history.push(`/reviews/${id}`)
  }
  
  
  const deleteThisReview = async (id) => {
    setMessage(['Review deleted']);
    history.push(`/note/${id}`)
  }

  const deleteThisReservation = async (id) => {
    setMessage(['Review deleted']);
    history.push(`/reservation/${id}`)
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
    <>
      <div className="user-container">
        <h2 className='user-header' >User Details</h2>
        
        <div className='user-header-details'>

          <img src={'https://res.cloudinary.com/kelp-me/image/upload/v1659139522/default-profile_w8hf54.png'} style={{ height: '250px', width: 'auto' }} alt='avatar' />

          <div className='user-info'>
            <strong>Username: <span style={{ fontWeight: "normal" }}>{user.username} </span></strong>
            <strong>First Name: <span style={{ fontWeight: "normal" }}>{user.first_name} </span></strong>
            <strong> Last Name: <span style={{ fontWeight: "normal" }}>{user.last_name} </span></strong>
            <strong>Email: <span style={{ fontWeight: "normal" }}>{user.email} </span> </strong>
          </div>
          
        </div>
      </div>

      <div className='reservation-container'>
        <h2 className='user-header' >Your Upcoming Beach Days</h2>
        {reservations && myReservation?.map(reservation => {
          return (
            <li className='review-info' key={reservation.id} style={{ listStyle: "none" }}>
              <button onClick={() => handleUpdate(reservation.id)}>Update</button>
              <button onClick={() => deleteThisReservation(reservation.id)}>Delete</button>
              <div>On {reservation.date}, you'll have Beach Chair setup #{reservation.arrangement} waiting at {reservation.location}!
              </div>
            </li>
            )
          })}
      </div>

      <div className="review-container">
        <h2 className='user-header' >Your Reviews</h2>
        {reviews && myReview?.map(review => {
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

              <button onClick={() => handleUpdate(review.id)}>Update</button>
              <button onClick={() => deleteThisReview(review.id)}>Delete</button>
              <hr className='list'></hr>
            </li>
          )
        })}
      </div>

        {message && (
          <div className='error-container'>{message}</div>
        )}

    </>
  );
}
export default User;
