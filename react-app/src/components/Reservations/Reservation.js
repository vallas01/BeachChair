import React, { useState } from "react";
import './Reservation.css'


function Reservation() {
    const [location, setLocation] = useState()
    const [errors, setErrors] = useState([])
    const [arrangement, setArrangement] = useState()
    const [date, setDate] = useState()

    let today = new Date()
    let d1Int = today.getDate() + 1;
    let d1 = d1Int < 10 ? '0' + d1Int.toString() : d1Int.toString()

    let mInt = today.getMonth() + 1
    let m = mInt < 10 ? '0' + mInt.toString() : mInt.toString()

    let yearInt = today.getFullYear()
    // let yearMax = yearInt + 1;
    let y = yearInt.toString();
   
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        if (!date) {
            return setErrors(['Please pick your beach day'])
          }
    }


    return (
        <>
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
                    <option value='1'>Basic</option>
                    <option value='2'>Family</option>
                    <option value='3'>Friends and Family</option>   
                </select>

                <button className='bookBtn' type="submit">Let's Do It</button>
      
            </form>
        </>
    )
}

export default Reservation;