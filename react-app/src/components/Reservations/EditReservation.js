import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateReservationDetails, getReservations } from '../../store/reservation'
import './Reservation.css'
import Price from '../Price';


function EditReservation() {
  const dispatch = useDispatch();
  const { reservationId } = useParams()
  const reservations = Object.values(useSelector(state => state.reservation))
  const reservation = reservations?.filter(reservation => reservation?.id === Number(reservationId))

  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [location, setLocation] = useState('');
  const [arrangement, setArrangement] = useState('')
  const [date, setDate] = useState()


// eslint-disable-next-line
  const user = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(getReservations())
  }, [dispatch]);
  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (!reservation) {
      return setErrors(['You must enter a reservation ! ! !'])
    }

    const newReservation = {
      user_id: reservation[0].user_id,
      location, 
      date,
      arrangement: Number(arrangement)
    };
    
    dispatch(updateReservationDetails(newReservation, reservationId))
    .then(() => history.push(`/users/${reservation[0].user_id}`))
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
    });
    // reset();
  }

  let today = new Date()
  let d1Int = today.getDate() + 1;
  let d1 = d1Int < 10 ? '0' + d1Int.toString() : d1Int.toString()

  let mInt = today.getMonth() + 1
  let m = mInt < 10 ? '0' + mInt.toString() : mInt.toString()

  let yearInt = today.getFullYear()
  let yearMax = yearInt + 1;
  let y = yearInt.toString();
  let yMax = yearMax.toString();

return (
    <div className="booking-container form-container">
      
        <div className='error-container'>
          {errors.length > 0 && (
              <ul >
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          )}
        </div>

        <form onSubmit={handleSubmit}  className="booking-form form-log">

                <h1 className='login-welcome1'> Edit Your Reservation </h1>
     
                <label className='login-welcome2'>
                    Confirm your beach day...{reservation[0].date}
                </label>
                <input
                    className='dropCalendar'
                    type="date"
                    placeholder='start date...'
                    value={date}
                    min={`${y}-${m}-${d1}`}
                    max={`${yMax}-${m}-${d1}`}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <label className='login-welcome2'>
                    Are you still visiting {reservation[0].location}?
                </label>
                <select
                    className='dropList'
                    value={location}
                    required
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value='' disabled  >PLEASE CONFIRM LOCATION...</option>
                    <option value='Villano'>Villano Beach</option>
                    <option value='St Augustine Pier'>St Augustine Pier</option>
                    <option value='Crescent Beach'>Crescent Beach</option>   
                </select>

                <label className='login-welcome2'>
                    Do you still want Beach Chair Setup #{reservation[0].arrangement}?
                </label>
                <select
                    className='dropList'
                    value={arrangement}
                    required
                    onChange={(e) => setArrangement(e.target.value)}
                >
                    <option value='' disabled  >PLEASE CONFIRM SETUP...</option>
                    <option value={1}>#1 - Solo</option>
                    <option value={2}>#2 - Couples</option>
                    <option value={3}>#3 - Family</option>   
                </select>

                <button className='loginBtn bookBtn' type="submit">Let's Do It</button>
            </form>
            <div className="spacer"></div>
            <Price />
    </div>
  );
}

export default EditReservation;