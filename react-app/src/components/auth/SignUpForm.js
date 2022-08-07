import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
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
    <div className='form-container'>

    <form className='form-log' onSubmit={onSignUp}>

      <label className='login-welcome1'>WELCOME!</label>
      <label className='login-welcome2'>(Let's get you a beach chair)</label>

      <div className='errorMessage'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div className='auth-input'>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>

      <div className='auth-input'>
        <label>First Name</label>
        <input
          type='text'
          name='first_name'
          onChange={updateFirstname}
          value={first_name}
        ></input>
      </div>
      <div className='auth-input'>
        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          onChange={updateLastname}
          value={last_name}
        ></input>
      </div>
      
      <div className='auth-input'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='auth-input'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='auth-input'>
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

      <button className='loginBtn' type='submit'>Sign Up</button>

      <div className='account-question'>
          <div>Already have a Beach Chair account?
            <span><NavLink className="account-question account-question-link" to="/login">Login!</NavLink></span>
          </div>
      </div>

    </form>

    </div>
  );
};

export default SignUpForm;
