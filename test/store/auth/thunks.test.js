
import { signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAthentication, startGoogleSignIn } from "../../../src/store/auth/thunks"
import { demoUser } from "../../fixtures/authFixteres";


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

  })
});