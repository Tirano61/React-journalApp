import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth/authSlice";
import { FirebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal/thunks";




export const useCheckOuth = () => {
 
  const { status } = useSelector( state => state.auth);

  const dispach = useDispatch();

  useEffect(() => {
    onAuthStateChanged( FirebaseAuth, async( user ) =>{
      if( !user ) return dispach( logout() );
      const { uid, displayName, email, photoURL } = user;
      dispach(login({ uid, displayName, email, photoURL }));
      dispach( startLoadingNotes());
    });
  
  }, [])

  return{
    status
  }

}
