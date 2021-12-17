import React, { useEffect, useState} from 'react';
import { UserContext } from './UserContext';
import firebase, { auth } from '../service/firebase';
import cogoToast from 'cogo-toast';
import {useNavigate} from 'react-router-dom'
import BookService from '../service/BookService';

function UserContextProvider(props) {
    const [user, setUser] = useState(null);
    const [booking,setBooking]= useState({})
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const signUp = (email,password)=> {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    const updateUserData = async(userData)=>{
       try {
        await auth.currentUser.updateProfile({...userData})
        setIsLoggedIn(true)
        cogoToast.success("User Account Created Successfull")
      } catch (error) {
        cogoToast.error(error.message)
      }
    }
    const signIn =async (email,password) => {
      try {
        await auth.signInWithEmailAndPassword(email,password);
        setIsLoggedIn(true)
        cogoToast.success("User LoggedIn Successfull")
      } catch (error) {
        cogoToast.error(error.message)
      }
    }
    const LogOut = async ()=>{
      try {
        await auth.signOut();
        setIsLoggedIn(false)
        cogoToast.success("User Loggedout Successfull");
        navigate("/")
      } catch (error) {
        cogoToast.error(error.message)
      }
    }

    const getBookings = async()=>{
     let books =await BookService.getAll();
     setBooking({...books});
     console.log(booking)
    }
    useEffect(()=>{
      getBookings();
    },[])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userData => {
          const {displayName,email,Aa,photoURL} = userData;
          setUser({name:displayName,email,token:Aa,photoURL});
          console.log(process.env.REACT_APP_ADMIN_EMAI,email)
          if(email==="admin@gmail.com"){
            navigate("/docter")
          }else{
            navigate("/dashboard")
          }
        })
    }, [isLoggedIn])
    const value = {
        user,signIn,signUp,LogOut,isLoggedIn,updateUserData,getBookings,booking
    }
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;