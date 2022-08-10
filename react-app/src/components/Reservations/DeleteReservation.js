import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteReservation, getReservations } from '../../store/reservation';


function ReservationNote() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const {userId} = useParams()
    
    const [del, setDel] = useState([])

    const userNum = Number(userId)
    const reservations = Object.values(useSelector(state => state?.reservation))
    const myReservation = reservations?.filter(function(reservation){
        return reservation.id === userNum;
    })
   
     
    useEffect(() => {
        dispatch(getReservations());
    },[dispatch])


    const handleContinue = () => {
        history.push(`/users/${user.id}`)
    }

     
    const deleteThisReservation = async (id) => {
        setDel([...del, 1])
        await dispatch(deleteReservation(id))
        await dispatch(getReservations());
        history.push(`/users/${user.id}`)
      }
    
    

    return (
        <div className='form-container'>
            <div className='form-container delete-container'>
                    <h2 className='login-welcome1' >Are you sure you want to Cancel your Beach Day for</h2>
                    {myReservation[0] && (<h2 className='delete-info' >{myReservation[0].location} on {myReservation[0].date}</h2>)}
                    <button className='demoBtn' onClick={() => deleteThisReservation(userId)}>YES</button>
                    <button className='demoBtn deleteNoBtn' onClick={() => handleContinue()}>NO</button>
            </div>
        </div>
    );
}

export default ReservationNote;