import React, { useState } from "react";
import './Reservation.css'
import { createReservation } from '../../store/reservation'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Price from "../Price";

function Reservation() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [location, setLocation] = useState('')
    const [errors, setErrors] = useState([])
    const [arrangement, setArrangement] = useState('')
    const [date, setDate] = useState('')

    const user = useSelector(state => state.session.user)
 
    let today = new Date()
    let d1Int = today.getDate() + 1;
    let d1 = d1Int < 10 ? '0' + d1Int.toString() : d1Int.toString()

    let mInt = today.getMonth() + 1
    let m = mInt < 10 ? '0' + mInt.toString() : mInt.toString()

    let yearInt = today.getFullYear()
    let yearMax = yearInt + 1;
    let y = yearInt.toString();
    let yMax = yearMax.toString();
   
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
 
        if (!date) {
            return setErrors(['Please pick your beach day'])
        }
        const newReservation = {
            user_id: user.id,
            location, 
            date,
            arrangement
          };

          
          dispatch(createReservation(newReservation))
          .then(() => history.push(`/users/${user.id}`))
          .catch(async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
          });
          // reset();
    }


    return (
        <div className="booking-container form-container">
        
            {/* <img className="background-Img" src='https://res.cloudinary.com/kelp-me/image/upload/v1659967136/Beachchair/big-rentals_yblfob.webp' alt='beachday'></img> */}

            
            <div className='error-container'>
                {errors.length > 0 && (
                <ul >
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                )}
            </div>

            <form onSubmit={handleSubmit} className="booking-form form-log">
                <label className='login-welcome1'>PICK YOUR BEACH DAY!</label>
                <label className='login-welcome2'>(Let's get you a beach chair)</label>
                <input
                    type="date"
                    placeholder='start date...'
                    value={date}
                    min={`${y}-${m}-${d1}`}
                    max={`${yMax}-${m}-${d1}`}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <select
                    className='dropList'
                    value={location}
                    required
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value='' disabled  >Which beach are you visiting?</option>
                    <option value='Villano Beach'>Villano Beach</option>
                    <option value='St Augustine Pier'>St Augustine Pier</option>
                    <option value='Crescent Beach'>Crescent Beach</option>   
                </select>

                <select
                    className='dropList'
                    value={arrangement}
                    required
                    onChange={(e) => setArrangement(e.target.value)}
                >
                    <option value='' disabled  >Which set up do you want?</option>
                    <option value={1}>#1 - Solo</option>
                    <option value={2}>#2 - Couples</option>
                    <option value={3}>#3 - Family</option>   
                </select>

                <button className='loginBtn bookBtn' type="submit">Let's Do It</button>
      
            </form>
            <div className="spacer"></div>
            <Price />
           </div>
    )
}

export default Reservation;