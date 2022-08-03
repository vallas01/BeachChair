import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserPage.css'


function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="user-container">
        <h2 className='user-header' >User Details</h2>
        
        <div className='user-header-details'>

          <img src={user.avatar} style={{ height: '250px', width: 'auto' }} alt='avatar' />

          <div className='user-info'>
            <strong>Username: <span style={{ fontWeight: "normal" }}>{user.username} </span></strong>
            <strong>First Name: <span style={{ fontWeight: "normal" }}>{user.first_name} </span></strong>
            <strong> Last Name: <span style={{ fontWeight: "normal" }}>{user.last_name} </span></strong>
            <strong>Email: <span style={{ fontWeight: "normal" }}>{user.email} </span> </strong>
          </div>

          {/* {sessionUser && sessionUser.id === user.id && <UserUpdateForm user={user} />} */}
        </div>
      </div>
      <div className="review-container">
        <h2 className='user-header' >Your Review</h2>
        
        <div className='review-details'>
        </div>
        
      </div>
    </>
  );
}
export default User;
