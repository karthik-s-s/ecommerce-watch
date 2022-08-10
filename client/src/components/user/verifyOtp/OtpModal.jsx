
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//////////////////OTP
import { Component } from "react";
import ReactDOM from "react-dom";
import OtpInput from "react-otp-input";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {postVerifyOtp} from '../../../api/userApi'
import {toast} from 'react-toastify'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const useStyles = makeStyles(theme => ({
  grid: {
    backgroundColor: "grey",
    height: "50vh",
    textAlign: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));
function OtpModal(props) {
  console.log(props.num);
  console.log("proooooooopppppsssssss");
  const [open, setOpen] = React.useState(true);
  const [otp,setOtp]    =React.useState('');

  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // setOpen(false)
    props.onAction()}
  const classes = useStyles();
  const theme = useTheme();

  //verify otp function

  const handleVerifyOtp  = async(e)=>{
    (e).preventDefault();
    try{
      const res = await postVerifyOtp (otp,props.num);
    if(res.status === 200){
        //close modal with alert
        // setIsVerified(true)
        props.onVerification()
      handleClose();
      toast.success(res.data.message);
      
    }else{
      toast.error(res.error)  
    }
    }catch(error){
      console.log(error);
      
    }

  }



  return (
    <div>
{/* <Button onClick={handleOpen}>Open modal</Button> */}
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  {/* <Box sx={style}> */}
    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
      Verify your Number
    </Typography> */}
    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}


    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid
          container
          style={{ backgroundColor: "white" }}
          className={classes.grid}
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item container justify="center">
            <Grid item container alignItems="center" direction="column">
              <Grid item>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography component="h1" variant="h5">
                  Verification Code
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Paper elevation={0}>
              <Typography variant="h6">
                Please enter the verification code sent to your mobile
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item spacing={3} justify="center">
              <OtpInput
              value= {otp}
              onChange={(e)=>{setOtp(e)}}
                separator={
                  <span>
                    <strong>.</strong>
                  </span>
                }
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  fontSize: "2rem",
                  borderRadius: 4,
                  border: "1px solid rgba(0,0,0,0.3)"
                }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={handleVerifyOtp}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Verify
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  {/* </Box> */}
</Modal>
    </div>
  )
}

export default OtpModal