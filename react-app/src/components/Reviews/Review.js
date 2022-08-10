import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/review'
import './Review.css'


function Review() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
 
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');
  const [location, setLocation] = useState('');

  const user = useSelector(state => state.session.user)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (rating < 1) {
      return setErrors(['Can you leave at least 1 star?'])
    }
    if (text.length < 5) {
      return setErrors(['Can you leave at least 5 characters?'])
    }
    if (text.length > 240) {
      return setErrors(['Can you limit your review to 240 characters?'])
    }

    const newReview = {
      user_id: user.id,
      location, 
      text,
      rating
    };
    
    await dispatch(createReview(newReview))
    .then(() => history.push(`/users/${user.id}`))
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
    });
  

  }



return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className="form-log ">

        <h1 className='login-welcome1'>SET UP YOUR REVIEW</h1>

        <div className='error-container'>
          {errors.length > 0 && (
              <ul >
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          )}
        </div>

        {/* <label className='login-welcome2' >
          Enter your review information...
        </label> */}

        <div className="star-rating">
          <input type="radio" id="5-stars" value="5" name="stars"
            onChange={(e) => setRating(e.target.value)} />
          <label htmlFor="5-stars">&#9733;</label>
          <input type="radio" id="4-stars" value="4" name="stars"
            onChange={(e) => setRating(e.target.value)} />
          <label htmlFor="4-stars">&#9733;</label>
          <input type="radio" id="3-stars" value="3" name="stars"
            onChange={(e) => setRating(e.target.value)} />
          <label htmlFor="3-stars">&#9733;</label>
          <input type="radio" id="2-stars" value="2" name="stars"
            onChange={(e) => setRating(e.target.value)} />
          <label htmlFor="2-stars">&#9733;</label>
          <input type="radio" id="1-star" value="1" name="stars"
            onChange={(e) => setRating(e.target.value)} />
          <label htmlFor="1-star">&#9733;</label>
        </div>

        <select
          name='beachlocations'
          className='dropList'
          value={location}
          required
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value='' disabled  >WHICH LOCATION DID YOU VISIT?</option>
          <option value='Villano Beach'>Villano Beach</option>
          <option value='St Augustine Pier'>St Augustine Pier</option>
          <option value='Crescent Beach'>Crescent Beach</option>   
        </select>

       
        <textarea
          className='reviewInput'
          type="text"
          placeholder='Enter your review...'
          value={text}
          onChange={(e) => setText(e.target.value)}     
          required
        />

           


        <button className='loginBtn bookBtn' type="submit">Let's Do It</button>
      </form>
       <div className='review-spacer'>
       </div> 
    </div>
  );
}

export default Review;