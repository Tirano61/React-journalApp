import { render } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { Provider } from "react-redux";



describe('Puruebas en el LoginPage', () => { 
  test('Debe mostrar el componente correctamente', () => { 
    
    render(
      <Provider>
        <LoginPage />
      </Provider> 
    )

  });
});