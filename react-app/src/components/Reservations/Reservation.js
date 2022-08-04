import React, { useState } from "react";
import './Reservation.css'


function Reservation() {
    const [location, setLocation] = useState()
    // const [error, setError] = useState([])
    const [arrangement, setArrangement] = useState()



    // if(!checked) {
    //     return setError(["Please select one package."]);
    // }

    return (
        <>
            <h2 className="user-header">Let's Get Your Beach Chair Set Up</h2>

            {/* <label>
                    Enter your arrival date...
                    </label>
                    <input
                        type="date"
                        placeholder='start date...'
                        value={startDate}
                        min={`${y}-${m}-${d1}`}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        /> */}



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

        </>
    )
}

export default Reservation;