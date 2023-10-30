import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixteres";


describe('Pruebas en authSlice', () => { 
  
  test('Debe regresar el estado inicial y llamarse "auth"', () => { 
    
    const state = authSlice.reducer( initialState, {});
    expect( state ).toBe( initialState );
    expect( authSlice.name).toBe('auth');

  });  

  test('Debe realizar la autenticacion', () => { 
    const state = authSlice.reducer( initialState, login( demoUser ));
   
    expect( state ).toEqual({                                                                          
      status: 'authenticated',
      uid: '123abc',
      email: 'demo@Google.com',
      displayName: 'demo user',
      photoURL: 'https://demo.jpg',
      errorMessage: null
    });
  });

  test('Debe realizar el logOut', () => { 
    const state = authSlice.reducer( authenticatedState, logout());
    expect( state ).toEqual({                                                                          
      status: 'not-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined
    });
  });

  test('Debe realizar el logOut y mostrar el mensaje de error', () => { 
    const state = authSlice.reducer( authenticatedState, logout({errorMessage:'Mensaje de error'}));
    expect( state.errorMessage ).toBe('Mensaje de error');
  });

  test('Debe cambiar elk estado a checking', () => { 
    const state = authSlice.reducer( authenticatedState, checkingCredentials() );
    expect( state.status ).toBe( 'checking' );
  })
});