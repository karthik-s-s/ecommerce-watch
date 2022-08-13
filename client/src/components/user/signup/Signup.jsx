import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Cancel from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
//api funnctions
import { postSignUp, postSentNumber } from '../../../api/userApi';
// toast
import { toast } from 'react-toastify';
import OtpModal from '../verifyOtp/OtpModal';
import axios from 'axios';

function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasssword, setShowPasssword] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // to disable verify button

  const handleVerification = ()=>{
    setIsVerified(true)
  }
  //open modal
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  //password validation
  let hasSixChar = password.length >= 6;
  let hasLowerChar = /(.*[a-z].*)/.test(password);
  let hasUpperChar = /(.*[A-Z].*)/.test(password);
  let hasNumber = /(.*[0-9].*)/.test(password);
  let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);
  //mobile number validation
  let has10Mobile = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(
    number
  );
  //email validation
  // eslint-disable-next-line
  const hasEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    email
  );
  //API CALLS

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await postSignUp({ userName, email, number, password });
      console.log(res);
      console.log('dddddddddddd');
      if (res.error) {
        toast.error(res.error);
        // toast.warn("Email already registered")
      } else {
        toast.success(res.message);
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleVerifyNumber = async (e) => {
    e.preventDefault();
    try {
      const res = await postSentNumber(number, email);
      console.log(res);
      if (res.status == 200) {
        setOpenModal(true);
      } else if (res.error) {
        toast.error(res.error);
        // toast.warn("Email already sent")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {setOpenModal(false)}; //to close modal

  return (
    <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h3">
          Signup
        </label>
      </div>
      <div className="form-group">
        <TextField
          size="small"
          className="form-control"
          label="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
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
        <TextField
          size="small"
          className="form-control"
          label="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          inputProps={
            isVerified?{ readOnly: true, }:{ readOnly: false, }
          }
        />
        {number && (
          <div className="ml-1" style={{ columns: '1' }}>
            <div>
              <small className={has10Mobile ? 'text-success' : 'text-danger'}>
                {has10Mobile ? (
                  <span>Number validated</span>
                ) : (
                  <span>provide correct Number</span>
                )}
              </small>
            </div>
          </div>
        )}

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={handleVerifyNumber}
          disabled={isVerified}
        >
          Verify Number
        </Button>
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
        {password && (
          <div className="ml-1" style={{ columns: '2' }}>
            <div>
              {hasSixChar ? (
                <span className="text-success">
                  <CheckCircle className="mr-1" fontSize="small" />
                  <small>Atleast six characters</small>
                </span>
              ) : (
                <span className="text-danger">
                  <Cancel className="mr-1" fontSize="small" />
                  <small>Atleast six characters</small>
                </span>
              )}
            </div>

            <div>
              {hasLowerChar ? (
                <span className="text-success">
                  <CheckCircle className="mr-1" fontSize="small" />
                  <small>One Lowercase letter</small>
                </span>
              ) : (
                <span className="text-danger">
                  <Cancel className="mr-1" fontSize="small" />
                  <small>One Lowercase letter</small>
                </span>
              )}
            </div>

            <div>
              {hasUpperChar ? (
                <span className="text-success">
                  <CheckCircle className="mr-1" fontSize="small" />
                  <small>One Uppercase letter</small>
                </span>
              ) : (
                <span className="text-danger">
                  <Cancel className="mr-1" fontSize="small" />
                  <small>One Uppercase letter</small>
                </span>
              )}
            </div>

            <div>
              {hasSpecialChar ? (
                <span className="text-success">
                  <CheckCircle className="mr-1" fontSize="small" />
                  <small>One Special character</small>
                </span>
              ) : (
                <span className="text-danger">
                  <Cancel className="mr-1" fontSize="small" />
                  <small>One Special character</small>
                </span>
              )}
            </div>

            <div>
              {hasNumber ? (
                <span className="text-success">
                  <CheckCircle className="mr-1" fontSize="small" />
                  <small>One Number</small>
                </span>
              ) : (
                <span className="text-danger">
                  <Cancel className="mr-1" fontSize="small" />
                  <small>One Number</small>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="form-group">
        <TextField
          size="small"
          type="password"
          className="form-control"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {password && confirmPassword && (
          <FormHelperText className="ml-1 mt-1">
            {password === confirmPassword ? (
              <span className="text-success">Password does match</span>
            ) : (
              <span className="text-danger">Password does not match</span>
            )}
          </FormHelperText>
        )}
      </div>
      <div className="text-center mt-4  d-flex justify-content-between">
        <Button
          variant="contained"
          disabled={
            !email ||
            !password ||
            confirmPassword != password ||
            !hasSixChar ||
            !hasLowerChar ||
            !hasUpperChar ||
            !hasSpecialChar ||
            !hasNumber ||
            !hasEmail ||
            !confirmPassword ||
            !userName ||
            !number||
            !isVerified
          }
          onClick={handleSignup} 
        >
          Signup
        </Button>
        <Link to={'/login'}  style={{ color: '#FFF' }}>
          <Button variant="text">Already registered ? Login</Button>
        </Link>
      </div>
      {openModal && <OtpModal onAction={handleClose} num={number}  onVerification={handleVerification}/>}
      {/* //passing props */}
    </div>
  );
}

export default Signup;
