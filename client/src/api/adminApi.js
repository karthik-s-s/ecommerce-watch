import axios from 'axios';

export const getUsersList = async()=>{
  
    return await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`).then((res)=>{
      console.log(res.data);
      console.log("ree");

      return res.data.data
  }).catch((res)=>{
    console.log(res);
  
    return res.response.data;
  
  })
  }

  export const getDeleteUser = async(userId)=>{
    return await axios.get(`${process.env.REACT_APP_API_URL}/admin/delete-user/${userId}`).then((res)=>{
      console.log(res);
      console.log(res.status);
      return res;
    }).catch((res)=>{
      console.log(res.message);

      return res;
    })

  }

  export const getBlockUser = async (userId) => {

    return await axios.get(`${process.env.REACT_APP_API_URL}/admin/block/${userId}`).then((res)=>{
      console.log(res);
      return res;
    }).catch((res)=>{ 
      console.log(res);
      return res;
    })
  }
  
  export const getUnblockUser = async (userId) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/admin/unblock/${userId}`).then((res)=>{
      console.log(res);
      return res;
    }).catch((res)=>{ 
      console.log(res);
      return res;
    })
  }