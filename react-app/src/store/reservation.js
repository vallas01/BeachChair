const LIST_RESERVATIONS = 'reservation/listReservations';
const ADD_RESERVATION = 'reservation/addReservation';
const REMOVE_RESERVATION = 'reservation/removeReservation';
const UPDATE_RESERVATION = 'reservation/updateReservation'


const listReservations = list => ({
  type: LIST_RESERVATIONS,
  list
});
const addReservation = details => ({
  type: ADD_RESERVATION,
  details
})
//eslint-disable-next-line
const removeReservation = id => ({
  type: REMOVE_RESERVATION,
  id
});
const editReservation = updatedReservation => ({
  type: UPDATE_RESERVATION,
  updatedReservation
});


/*-------- SELECTORS -------*/

export const getReservations = () => async (dispatch) => {
  const response = await fetch(`/api/reservation`);
  if (response.ok) {
    const list = await response.json();
    dispatch(listReservations(list));
  }
  return;
};


export const createReservation = (details) => async dispatch => {

    const response = await fetch('/api/reservation', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(details)
    })
    
    if(response.ok){
      const newReservation = await response.json()
      dispatch(addReservation(newReservation))
      return newReservation;
    }
  };


export const updateReservationDetails = (reservationDetails, id) => async dispatch => {
  const response = await fetch(`/api/reservation/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reservationDetails)
  })
  if (response.ok) {
    const updatedReservation = await response.json()
    dispatch(editReservation(updatedReservation))
    return updatedReservation;
  }
};

export const deleteReservation = (reservationId) => async dispatch => {
  const response = await fetch(`/api/reservation/${reservationId}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    const data = await response.json();
    if (data.message === 'success') {
      dispatch(removeReservation(reservationId));
    }
    
        
    return
  }
};


/*-------- REDUCER -------*/
const initialState = {};

const reservationReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {

    case LIST_RESERVATIONS: {
      newState = { ...state }
      action.list.reservation.forEach(reservation => newState[reservation.id] = reservation)
      return newState
    }

    case ADD_RESERVATION: {
      newState = { ...state };
      newState = { ...state, [action.details.id]: action.details }
      return newState;
    }

    case UPDATE_RESERVATION: {
      newState = { ...state };
      newState = { ...state, [action.updatedReservation.id]: action.updatedReservation }
      return newState
    }

    case REMOVE_RESERVATION: {
      newState = { ...state }     
      delete newState[action.id]
      return newState
    }

    default:
      return state;

  }

};

export default reservationReducer;