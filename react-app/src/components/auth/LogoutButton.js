import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  // eslint-disable-next-line
  const [username, setUsername] = useState('');
  // eslint-disable-next-line
  const [first_name, setFirstname] = useState('');
  // eslint-disable-next-line
  const [last_name, setLastname] = useState('');
  // eslint-disable-next-line
  const [email, setEmail] = useState('');
  const history = useHistory()
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await dispatch(logout());
    setUsername('')
    setFirstname('')
    setLastname('')
    setEmail('')
    history.push('/')
  };

  return <button className='logoutBtn' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
