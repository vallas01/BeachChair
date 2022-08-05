import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/Home';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Review from './components/Reviews/Review';
import Reservation from './components/Reservations/Reservation';
import EditReview from './components/Reviews/EditReview';
import EditReservation from './components/Reservations/EditReservation';
import About from './components/Footer/About';
import Technology from './components/Footer/Technology';
import NotFound from './components/NotFound';
import Footer from './components/Footer/Footer';
import DeleteReview from './components/Reviews/DeleteReview';
import DeleteReservation from './components/Reservations/DeleteReservation';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true} >
          <Home />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/reviews' exact={true} >
          <Review />
        </ProtectedRoute>
        <ProtectedRoute path='/reviews/:reviewId' exact={true} >
          <EditReview />
        </ProtectedRoute>
        <ProtectedRoute path='/reservation' exact={true} >
          <Reservation />
        </ProtectedRoute>
        <ProtectedRoute path='/reservation/:reservationId' exact={true} >
          <EditReservation />
        </ProtectedRoute>

        <Route path='/about'>
          <About />
        </Route>
        <Route path='/technology'>
          <Technology />
        </Route>
        <Route path='/review-del/:userId'>
          <DeleteReview />
        </Route>
        <Route path='/reservation-del/:userId'>
          <DeleteReservation />
        </Route>

        <Route path=''>
          <NotFound />
        </Route>

      </Switch>
          <Footer />
    </BrowserRouter>
  );
}

export default App;
