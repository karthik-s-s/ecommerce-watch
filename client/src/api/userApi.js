import axios from 'axios';
export const postSignUp = async ({ userName, email,number, password } = {}) => {
  const user = { userName, email,number, password };

  console.log('postSignUp');

  console.log('qqqqqqqqqqqqqqqqqqqqqqqqq');
 return await axios
    .post(`${process.env.REACT_APP_API_URL}/signup`, user)
    .then((res) => {
      console.log(res.data.message);
      console.log('resssresss');
      return res.data;
    })
    .catch((res) => {
      console.log(res.response.data);
      console.log('erroreoorrrooorooorooorrrrrrrrrrrrrr');
      return res.response.data
    });
};

export const postLogin = async ({ email, password } = {}) => {
  const user = { email, password };

  // try {
  //   const res = await axios.post(
  //     `${process.env.REACT_APP_API_URL}/login`,
  //     user,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  //   console.log(res);
  //   console.log('lllll');
  //   return res.data;
  // } catch (err) {
  //   console.log(err);
    
  //   console.log('kkkkkkkkkkk');
  //   return err.responce.data; 
  

  // }
        //ANOTHER WAY TO WRITE
       
        return await axios.post(
            `${process.env.REACT_APP_API_URL}/login`,
            user,
            {
              withCredentials: true,
            }
          ).then((res)=>{
            console.log(res);
            console.log('lllll');
            return res.data;
          }).catch((res)=>{

          
            console.log(res.response.data);
            console.log('kkkkkkkkkkk');
            return res.response.data; 
          
          });
        
       

};

export const getLogout = async () => {
 
    return await axios.get(`${process.env.REACT_APP_API_URL}/logout`, {
      withCredentials: true,
    }).then((res)=>{
      return res.data;
    }).catch((res)=>{
      return res.response.data;
    })
   
 
};
export const getLoggedIn = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/login`, {
      credentials: 'include',
    });
    return res;
  } catch (err) {
    throw new Error(`Please login to continue`);
  }
};

export const postSentNumber = async(number,email)=>{
  const verification = {number, email}
  console.log(verification);
  return await axios.post(`${process.env.REACT_APP_API_URL}/verification`,verification).then((res)=>{
    console.log(res);
    console.log(res.status);
    console.log('vvvvvvv');
    return res
}).catch((res)=>{

  return res.response.data;

})
}

export const postVerifyOtp = async (otp,number) => {
  const verifyOtp = {otp,number}; //contains otp and number
  console.log(verifyOtp);
  return await axios.post(`${process.env.REACT_APP_API_URL}/verifyOtp`,verifyOtp).then((res)=>{
    console.log(res);
    console.log("aaaaaaaa");
    return res.data.responce.status;   
  }).catch((res)=>{
    console.log("errorrrr");
    console.log(res);
    return res.responce.data
  });
}
