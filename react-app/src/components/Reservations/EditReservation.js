import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateReservationDetails, getReservations } from '../../store/reservation'
import './Reservation.css'


function EditReservation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [location, setLocation] = useState('');
  const [arrangement, setArrangement] = useState('')
  const [date, setDate] = useState()


  const { reservationId } = useParams()
// eslint-disable-next-line
  const user = useSelector(state => state.session.user)
  const reservations = Object.values(useSelector(state => state.reservation))
  const reservation = reservations?.filter(reservation => reservation?.id === Number(reservationId))


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
  // let yearMax = yearInt + 1;
  let y = yearInt.toString();

return (
    <>
      <h1 className='reservation-title'> Edit Your Reservation </h1>

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
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <select
                    className='dropList'
                    value={location}
                    required
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value='' disabled  >Which location did you visit?</option>
                    <option value='Villano'>Villano Beach</option>
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
                    <option value={1}>Basic</option>
                    <option value={2}>Family</option>
                    <option value={3}>Friends and Family</option>   
                </select>

                <button className='bookBtn' type="submit">Let's Do It</button>
            </form>
    </>
  );
}

export default EditReservation;