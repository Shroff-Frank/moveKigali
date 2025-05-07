import React, { useEffect } from "react";
import BannerPage from '../booking/banner'
import Homepage from '../booking/homepage';
import ContactPage from '../booking/contact';
import Email from '../login/email'
import Login from '../login/login'
import Confirm from "../login/confirm";
import LogOut from "../login/logout";
import BusTicketPay from "../booking/ticket";
import Bus from "../booking/bus";
import MapPage from '../booking/map'
import Cookie from 'js-cookie';


import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function App() {

  return(
    <>
    <Router>
      <AuthHandler/>
      <Routes>
        <Route path="/"  element={<BannerPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} /> 
        <Route path="/contact" element={<ContactPage />} /> 
        <Route path="/email" element={<Email />} /> 
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/bus" element={<Bus />}></Route>
        <Route path="/ticket" element={<BusTicketPay />} />
        <Route path="/map" element={<MapPage/>} /> 
        <Route path="/logout" element={<LogOut />}></Route>
      </Routes>
    </Router>
    </>
  )
}

function AuthHandler() {
  const navigate = useNavigate();

  useEffect(()=> {
    const authRoute = () => {
      if (Cookie.get('id')) {
        navigate('/email');
      }
    }
    authRoute();
  }, [navigate])
  return null;
}

export default App;
