import { useState,useEffect,useContext, createContext } from "react";
import { AxiosGet, AxiosPost, AxiosPostNoToken } from "../lib/axios";

export const UserConfig = createContext();
    
 export const UserProvider = ({children}) =>{

      const [currentusermail,setcurrentusermail] = useState("")
      const [user,setuserdata] = useState([])
      const [loading, setLoading] = useState(true);
      const [pageloading, setPageloading] = useState(true)
      const [session, setSessionDetails] = useState();
      const [isPageLoading, setIsPageLoading] = useState(true);
      const [token, setToken] = useState("");
      const [loginerror, setLoginerror] = useState(false);
const [signupsuccess, setSignupsuccess] = useState(false)
      // useEffect(()=>{

      // },[])
      
      useEffect(() => {

        setTimeout(() => setIsPageLoading(false), 2000);
        const getAndSetData=async()=>{
          
          const session = localStorage.getItem("login-session");
          console.log(session);

          setSessionDetails(session ? JSON.parse(session) : "");
          if(session){
            setToken(JSON.parse(session).token);

            console.log(JSON.parse(session))
            const data = await AxiosGet("/api/v1/users/details/"+JSON.parse(session).email,JSON.parse(session).token);
            setuserdata(data.user[0]);
          // console.log(JSON.parse(session).data.email,"Session")

          }
         
        }
        getAndSetData();
      
        
      }, []);
   const logout=async()=>{
    setuserdata();
    setToken("");
    setSessionDetails("");
    localStorage.removeItem("login-session")

   }
  

  const login = async (values) => {
    console.log(values ,"recievd in context")

      const  logindata  = await AxiosPostNoToken("/api/v1/auth/login", values);
      console.log(logindata)
      // k.sabarii.ganesh@gmail.com
      // console.log(data.data.code,data.data.code==201,data.data.code == 400,"tt");
     if(logindata && logindata.data.success) {
        // console.log("jhh",data)
        const user = {
        
          email:logindata.data.user.email,
          token: logindata.data.token,
        };
        setToken(logindata.data.token)

        setuserdata(logindata.data.user);
        const userData = JSON.stringify(user);
        localStorage.setItem("login-session", userData);
        console.log(userData)
        // const session = sessionStorage.getItem("login-session");
        // setSessionDetails(session ? JSON.parse(session) : "");
      //   showSuccessToast({ title: data.msg });
      //   router.replace("/");
      // setuserdata(user)
      setLoginerror(false);
      setSessionDetails(user);
      }
      else{
        console.log('wait') 
      }
    
  };
  
  // {"success":true,"message":"User registration successful","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzAxMzcyMjU3LCJleHAiOjE3MDE0NTg2NTd9.31wje6pWGLSO_7YzPoELH3tTjWM3HslSotFHBGvHKcc","user":{"id":2,"firstname":"Sabari","lastname":"Ganesh","email":"k.sabarii.ganesh2.0@gmail.com","location":"Chennai"}}
const signup = async (values) => {
    try {
      const signupdata=await AxiosPostNoToken("/api/v1/auth/signup",values);
     
      if(signupdata.data.success){
        const user = {
        
          email:signupdata.data.user.email,
          token: signupdata.data.token,
        };

        setuserdata(signupdata.data.user);
        setToken(signupdata.data.token)
        const userData = JSON.stringify(user);
        localStorage.setItem("login-session", userData);
      setLoginerror(false);
      setSignupsuccess(true);
      setSessionDetails(user)

      setLoading(false);}
    } catch (err) {
      console.error(err);
      alert(err.message);
      setLoginerror(true);
    
  };
}







// useEffect(()=>{
// //check cookies

// const session = localStorage.getItem("login-session");
// // console.log("cookie data",JSON.parse(session));

// if(session){
// async()=>{console.log("cookie data",JSON.parse(session));

//   const userdatafeteched = await AxiosGet(`/${JSON.parse(session).data.username}?id=${session.id}&token=${session.token}`);
// console.log(userdatafeteched.data)
//   setuserdata(userdatafeteched.data);}
// }
// else{
//   setuserdata();
// }
// // setuserdata(session ? JSON.parse(session) : "");

// setPageloading(false)
// //setuser
// //setloading

// },[]
// )


return (
    <UserConfig.Provider value = {{currentusermail,logout,signupsuccess,login,signup,user,session,loginerror}}>{children}</UserConfig.Provider>
)
 }

 