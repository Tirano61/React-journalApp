
import { Link as RouterLink } from "react-router-dom";
import { Alert, AlertTitle, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";


const formData = {
  displayName: '',
  email: '',
  password: ''
};
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password: [(value) => value.length >= 6, 'El password debe tener más de 6 letras'],
  displayName: [(value)=> value.length >= 1, 'El nombre es obligatorio']
}


export const RegisterPage = () => {

  const dispach = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);
  const { status, errorMessage } = useSelector( state => state.auth );
  
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);
 
  const { formState,displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);

 

  const onSubmit = ( event )=>{
    event.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return ;
      
    dispach( startCreatingUserWithEmailPassword( formState ));
  }

  return (
    <AuthLayout title="Crear cuenta">
     
      <form 
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label='Nombre'  
                type='text'
                placeholder='Nombre'
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmited } 
                helperText={ displayNameValid }
              />
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                autoComplete="correo@google.com"
                label='Correo'  
                type='email'
                placeholder='correo@google.com'
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmited } 
                helperText={ emailValid }
              />
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                autoComplete="password"
                label='Password'  
                type='password'
                placeholder='Password'
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmited } 
                helperText={ passwordValid }
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
              <Grid item xs={12} sm={12}>
                <Button 
                  disabled={ isCheckingAuthentication }
                  type="submit"
                  variant='contained' 
                  fullWidth
                >
                  Crear Cuenta
                </Button>
              </Grid>
              

            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to='/auth/login'>
                Ingresar
              </Link>
            </Grid>
            
          </Grid>
        </form>
    </AuthLayout>
        
  )    
}
