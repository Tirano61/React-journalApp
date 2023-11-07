import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth/authSlice";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixteres";



const mockStartGoogleSignIn = jest.fn();
const mockStartLogInWithEmailPassword = jest.fn();

jest.mock('"../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmail: ({ email, password }) => {
    return () => mockStartLogInWithEmailPassword({ email, password })
  },
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

describe('Puruebas en el LoginPage', () => { 

  beforeEach(() => jest.clearAllMocks());

  test('Debe mostrar el componente correctamente', () => { 
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider> 
    )

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);

  });
  test('Boton de google debe llamar el startGoogleSignIn', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');

    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });
  test('submit debe llamar startLoginWithEmailPassword', () => {

    const email = 'dario@googgle.com';
    const pass = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });
    
    const passField = screen.getByTestId( 'password' );
    fireEvent.change(passField, { target: { name: 'password', value: pass } });
    
    const formSubmit = screen.getByLabelText('form-submit');
    fireEvent.submit(formSubmit);

    expect(mockStartLogInWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: pass
    });

  });
});