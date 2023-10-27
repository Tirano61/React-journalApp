
import { useDispatch, useSelector } from "react-redux"; 
import { Link as RouterLink } from "react-router-dom";
import { Google } from '@mui/icons-material'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { checkingAthentication, startGoogleSignIn, startLoginWithEmail } from "../../store/auth/thunks";
import { useMemo } from "react";


const initialForm = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const dispach = useDispatch();

  const { status, errorMessage } = useSelector( state => state.auth );

  const { email, password, onInputChange } = useForm(initialForm);

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispach( checkingAthentication() );

    dispach(startLoginWithEmail({ email, password }));
  }
  const onGoogleSignIn = ()=>{
    dispach( startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
      <form 
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label='Correo'  
                type='email'
                placeholder='correo@google.com'
                autoComplete="correo@google.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
              />
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label='password'  
                type='password'
                autoComplete="current-password"
                //placeholder='Password'
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>
            <Grid container spacing={2} sx={{mb: 2, mt: 2}}>
              <Grid 
                  item xs={12} 
                  sm={12}
                  display={ !!errorMessage ? '' : 'none' }
                >
                
                <Alert severity="error">{ errorMessage }</Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={ isAuthenticating }  
                  type="submit" 
                  variant='contained' 
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  disabled={ isAuthenticating }
                  variant='contained' 
                  fullWidth
                  onClick={ onGoogleSignIn }
                >
                  <Google />
                  <Typography  sx={{ml:1}}> 
                    Google
                  </Typography>
                </Button>
              </Grid>

            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>
            
          </Grid>
        </form>
    </AuthLayout>
        
  )    
}
