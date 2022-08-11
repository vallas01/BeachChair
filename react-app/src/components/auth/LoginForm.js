import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'
 
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoUser = async (e) => {
    return await dispatch(login("demo@aa.io", "password"))
  }


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/reservation' />;
  }

  return (
    <>
    
    <div className='form-container'>

      <form className='form-log' onSubmit={onLogin}>

        <label className='login-welcome1'>WELCOME BACK!</label>
        <label className='login-welcome2'>(Let's get you a beach chair)</label>
      
        <div className='errorMessage'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='auth-input'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder=''
            value={email}
            onChange={updateEmail}
          />
        </div>

        <div className='auth-input'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder=''
            value={password}
            onChange={updatePassword}
          />
        </div>
          <button className='loginBtn' type='submit'>Login</button>

        <div className='account-question'>
          <div>Don't have a Beach Chair account?
            <div><NavLink className="account-question account-question-link" to="/sign-up">Sign up!</NavLink></div>
          </div>
        </div>

      </form>

      <button className='demoBtn' onClick={demoUser}>Demo user</button>

    </div>
    </>
  );
};

export default LoginForm;
