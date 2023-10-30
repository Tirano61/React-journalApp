
import { checkingCredentials } from "../../../src/store/auth/authSlice"
import { checkingAthentication } from "../../../src/store/auth/thunks"


jest.mock('../../../src/firebase/providers')

describe('Pruebas en el thunks', () => { 

  test('Debe invocar el chekingCredentials', async() => { 
    
    const dispach = jest.fn();
    await checkingAthentication() ( dispach );
    expect(dispach).toHaveBeenCalledWith(checkingCredentials());
    
  })  
})