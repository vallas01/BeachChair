import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  // eslint-disable-next-line
  // const [avatar, setAvatar] = useState('https://www.austriabc.com/wp-content/uploads/2019/08/default-profile.png');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    if (email)

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, first_name, last_name, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      return setErrors(['Confirm Password did not match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };
  
  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  
  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  // const updateAvatar = (e) => {
  //   setAvatar(e.target.value);
  // };

  if (user) {
    return <Redirect to='/reservation' />;
  }
  
  return (
    <form onSubmit={onSignUp}>
      <div className='errorMessage'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>

      <div>
        <label>First Name</label>
        <input
          type='text'
          name='first_name'
          onChange={updateFirstname}
          value={first_name}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          onChange={updateLastname}
          value={last_name}
        ></input>
      </div>
      
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      {/* <div>
        <label>Avatar - optional</label>
        <input
          type='text'
          name='avatar'
          onChange={updateAvatar}
          value={avatar}
        ></input>
      </div> */}
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
