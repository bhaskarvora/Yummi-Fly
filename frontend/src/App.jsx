import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin, setShowLogin] =useState(false)

  return (

    <>
    

    {showLogin?<LoginPopup setShowLogin = {setShowLogin}/>:<></>}
       <div className='app'>
      
     {/* This is the navigation bar component */}
      <Navbar setShowLogin = {setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path ='/cart' element={<Cart/>}/>
        <Route path = '/order' element={<PlaceOrder/>}/>
        <Route path = '/verify' element= {<Verify/>}/>
        <Route path='/myorders' element = {<MyOrders/>}/>

      </Routes>

    </div>
    <Footer/>
    </>
// Here we are using fragment <>  </> because we are returning more than one element such as div and Footer
  )
}

export default App
