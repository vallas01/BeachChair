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

      </>
  );
}

export default EditReservation;