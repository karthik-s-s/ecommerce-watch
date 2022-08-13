import React, { useContext, useState } from 'react';
import {  useNavigate } from "react-router-dom";

import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
//API
import {postLogin} from '../../../api/userApi'
import {toast} from 'react-toastify'
import { MyContext } from "../../../UserContext";// import UserContext from src step(5)


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasssword, setShowPasssword] = useState(false);
  const {userData,setUserData} = useContext(MyContext) // getting setUser from usercontext
  const navigate = useNavigate();

  //email validation

  // eslint-disable-next-line
  const hasEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    email
  );
  //api calls
  const handleLogin =async (e) =>{
    e.preventDefault();//prevent refresh
    try {
      const res = await postLogin({email,password})
      console.log(res);
      let a= "hello"
     setUserData(a);
      console.log(userData);

      if(res.error){
        toast.error(res.error);
      console.log("jjjjjjj");
        navigate('/login')
      }else{
        toast.success(res.message)
        console.log(res.user);
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbb")
        console.log(userData);
        console.log("userrr ");
        navigate('/',{replace:true})

      }
    } catch (error) {
      console.log("erroeee");
      console.log(error);
     alert(error)
    }
  }
  return (
    <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h3">
          Login
        </label>
      </div>
      <div className="form-group">
        <TextField
          size="small"
          className="form-control"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email && (
          <div className="ml-1" style={{ columns: '1' }}>
            <div>
              <small className={hasEmail ? 'text-success' : 'text-danger'}>
                {hasEmail ? (
                  <span>Email validated</span>
                ) : (
                  <span>provide correct Email address</span>
                )}
              </small>
            </div>
          </div>
        )}
      </div>
      <div className="form-group">
        <FormControl variant="outlined" size="small" className="form-control">
          <InputLabel>Password</InputLabel>

          <OutlinedInput
            label="Password"
            value={password}
            type={showPasssword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment>
                <IconButton
                  onClick={() => setShowPasssword(!showPasssword)}
                  edge="end"
                >
                  {showPasssword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </FormControl>
      </div>
      <div className="text-center mt-4  d-flex justify-content-between">
        <Button variant="contained" disabled={!email || !password || !hasEmail} onClick={handleLogin}>
          Login
        </Button>
        
        <Link to={'/signup'}  style={{ color: '#FFF' }}>
          <Button variant="text">New user ? Signup</Button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
