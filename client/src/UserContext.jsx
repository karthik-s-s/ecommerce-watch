import React,{createContext,useState} from 'react'


 
 export const MyContext = createContext(null)
 function UserContext({children}) {
    const [userData, setUserData] = useState(''); // Step(3) it is the state which userContext should have// to available throughout the app
   return (
       
       <MyContext.Provider value={{userData,setUserData}}>
         {children}
       </MyContext.Provider>
      
   )
 }
 
 export default UserContext;
