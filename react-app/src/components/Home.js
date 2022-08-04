import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


function Home() {
    const sessionUser = useSelector(state => state?.session.user);


    return (
        <>
            <h2 className="user-header">Welcome to the Home Page!</h2>
            {sessionUser && (
                <NavLink className="navBtn" to="/reservation">Set up my Beach Chair!</NavLink>
            )}
            {!sessionUser && (
                <NavLink className="navBtn" to="/login">Set up my Beach Chair!</NavLink>
            )}
        </>
    )
}

export default Home;