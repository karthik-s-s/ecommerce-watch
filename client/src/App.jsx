import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/user/HomePage';
import LoginPage from './pages/user/LoginPage';
import SignUpPage from './pages/user/SignUpPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AhomePage from './pages/admin/AhomePage';
import AusersPage from './pages/admin/AusersPage';
import ProductPage from './pages/user/ProductPage';
// import user context from src

function App() {
  // useEffect(() => {
  // const unsubscribe = getLogin().then(()=>{
  //   if(res.error){
  //     alert(res.error);
  //   }else{
  //     setUser(res.userName);
  //   }
  // }).catch((err)=>{
  //   alert(err);
  // } )

  // }, [])

  return (
    <div className="App" >
      {/* // pass value // so user and setUser will be availabe in all components step(4) */}
        <ToastContainer />
        

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/products" element={<ProductPage />} />
          {/* <Route path="/otpModal" element={<OtpModal/>} /> */}
          {/* admin routes */}
          <Route path="/admin/home" element={<AhomePage/>} />
          <Route path="/admin/users" element={<AusersPage/>} />
        </Routes>
          
        
    </div>
  );
}

export default App;
