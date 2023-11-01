
import { createUserWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import { loginWithEmailPassword, logoutFirebase, registerUserWihthEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmail, startLogout } from "../../../src/store/auth/thunks"
import { demoUser } from "../../fixtures/authFixteres";
import { clearNoteByUid } from "../../../src/store/journal/journalSlice";


jest.mock('../../../src/firebase/providers')

describe('Pruebas en el thunks', () => { 

  const dispach = jest.fn();
  beforeEach( () => jest.clearAllMocks() );

  test('Debe invocar el chekingCredentials', async() => { 
    
    await checkingAthentication() ( dispach );
    expect(dispach).toHaveBeenCalledWith(checkingCredentials());
    
  }); 
    
  test('satrtGoogleSignin debe llamar checkinCredentials y login', async() => { 
    
    const loginData = {ok: true, ...demoUser};

    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispach);

    expect( dispach ).toHaveBeenCalledWith( checkingCredentials( ));
    expect( dispach ).toHaveBeenCalledWith( login( loginData ));

  })
  test('satrtGoogleSignin debe llamar checkinCredentials y logout - error', async() => { 
    
    const loginData = {ok: false, errorMessage:'Un error en google'};

    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispach);

    expect( dispach ).toHaveBeenCalledWith( checkingCredentials());
    expect( dispach ).toHaveBeenCalledWith( logout( loginData.errorMessage )); 

  });
  test('startLoginWithEmail debe llamar checkinCredentials y login', async () => { 

    const loginData = {ok: true, ...demoUser};

    await loginWithEmailPassword.mockResolvedValue( loginData );
    await startLoginWithEmail({email:demoUser.email, password:'123456'})(dispach);

    expect( dispach ).toHaveBeenCalledWith( checkingCredentials());
    expect( dispach ).toHaveBeenCalledWith( login( loginData ));
  });
  test('startCreatingUserWithEmailPassword debe llamar checkinCredentials y login', async () => { 

    const loginData = {ok: true, ...demoUser};

    await registerUserWihthEmailPassword.mockResolvedValue( loginData );
    await startCreatingUserWithEmailPassword({
        email:demoUser.email, 
        password:'123456',
        displayName: demoUser.displayName
      })(dispach);

    expect( dispach ).toHaveBeenCalledWith( checkingCredentials());
    expect( dispach ).toHaveBeenCalledWith( login( loginData ));
  });
  test('startLogOut debe llamar logoutFirebase, clearNotes y logOut', async() => { 
    const loginData = { ...demoUser};
    
    await startLogout()(dispach);

    expect( logoutFirebase ).toHaveBeenCalled();
    expect( dispach ).toHaveBeenCalledWith( clearNoteByUid() );
    expect( dispach ).toHaveBeenCalledWith( logout({}));
  });

});
 

