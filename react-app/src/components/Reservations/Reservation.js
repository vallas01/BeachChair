import React, { useState } from "react";
import './Reservation.css'
import { createReservation } from '../../store/reservation'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
console.log(date)
        if (!date) {
            return setErrors(['Please pick your beach day'])
        }
        const newReservation = {
            user_id: user.id,
            location, 
            date,
            arrangement
          };

          console.log('newReservation===',newReservation)

          dispatch(createReservation(newReservation))
          .then(() => history.push(`/users/${user.id}`))
          .catch(async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
          });
          // reset();
    }


    return (
        <div className="booking-container">
        
            <h2 className="user-header">Let's Get Your Beach Chair Set Up</h2>

            
            <div className='error-container'>
                {errors.length > 0 && (
                <ul >
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                )}
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
                <label>
                    Pick your beach day!
                </label>
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
                    <option value='Beachcomber Street'>Beachcomber Street</option>   
                </select>

                <select
                    className='dropList'
                    value={arrangement}
                    required
                    onChange={(e) => setArrangement(e.target.value)}
                >
                    <option value='' disabled  >Which set up do you want?</option>
                    <option value={1}>#1 - Basic</option>
                    <option value={2}>#2 - Family</option>
                    <option value={3}>#3 - Deluxe</option>   
                </select>

                <button className='bookBtn' type="submit">Let's Do It</button>
      
            </form>
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
            <div className="beachChair">
                <img src='https://res.cloudinary.com/kelp-me/image/upload/v1659721920/beach-chairs_uuptre.jpg' alt='beachchairs'></img>
            </div>
        </div>
    )
}

export default Reservation;