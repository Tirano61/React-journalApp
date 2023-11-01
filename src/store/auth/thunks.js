
import { loginWithEmailPassword, logoutFirebase, registerUserWihthEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNoteByUid } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";


export const checkingAthentication = ( email, password ) =>{
  return async( dispach ) => {
    dispach( checkingCredentials() );
  }
}

export const startGoogleSignIn = () =>{
  return async ( dispach ) => {
    dispach( checkingCredentials() );    
    const result = await signInWithGoogle()
   
    if ( !result.ok ) return dispach( logout( result.errorMessage ) );

    dispach( login( result ));
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) =>{
  return async ( dispach ) => {
    dispach( checkingCredentials() );
    const result = await registerUserWihthEmailPassword({ email, password, displayName});
    
    if(!result.ok) return dispach( logout({ errorMessage }));
    dispach( login( result ));
  }
}

export const startLoginWithEmail = ({ email, password }) =>{
  return async (dispach) =>{
    dispach( checkingCredentials() );
    const result= await loginWithEmailPassword({ email, password });
    
    if (!result.ok) return dispach( logout({ errorMessage }));
    dispach( login( result ));
  }
}

export const startLogout = () => {
  return async ( dispach ) => {
    try {
      await logoutFirebase();
      dispach( clearNoteByUid() );
      dispach( logout({}) );

    } catch ( error ) {
      return error.errorMessage;
    }
   
  }
} 

