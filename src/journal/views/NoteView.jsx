

import {  DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { ImageGallery } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSavingNote, startUploadFiles } from '../../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2'

export const NoteView = () => {

  const { active: note, messageSave, isSaving } = useSelector( state => state.journal);  

  const dispach = useDispatch();
  
  const { onInputChange, body, title, formState, date } = useForm( note );

  const dateString = useMemo(() =>{
     const  newDate = new Date( date );
     return newDate.toUTCString();
  }, [ date ])

  useEffect(() => {
    dispach( setActiveNote( formState ))
  }, [ formState ])
  
  const onSaveNote = () => {
    dispach( startSavingNote() );
  }

  useEffect(() => {
    if( messageSave.length > 0 ){
      Swal.fire( 'Nota actualizada', messageSave, 'success' );
    }
  }, [ messageSave ]);

  const fileInputRef = useRef();
  
  const onFileInputChange = ( { target } ) =>{
    
    if( target.files.length  === 0) return;
    dispach( startUploadFiles( target.files ));
  }

  const onDelete = () => {
    dispach( startDeletingNote());
  }

  return (
    <Grid 
      className="animate__animated animate__fadeIn"  
      container direction='row' justifyContent={'space-between'} alignItems={'center'} sx={{mb:1}}>
      <Grid item>
        <Typography fontSize={39} fontWeight={'light'}>{dateString}</Typography>
      </Grid>
      <Grid  item>
        <input 
          type="file" 
          multiple
          onChange={ onFileInputChange }
          style={{ display: 'none'}}
          ref={ fileInputRef }
        />
        <IconButton 
          disabled={ isSaving }
          color='primary'
          onClick={ () => fileInputRef.current.click() }
        > 
          <UploadOutlined />
        </IconButton>
        <Button 
          disabled={ isSaving }
          onClick={ onSaveNote }
          color='primary' sx={{padding:2}}>
          <SaveOutlined sx={{fontSize:30, mr:1}} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField 
          name='title'
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un título'
          label='Título'
          sx={{ border:'none', mb:1 }}
          value={ title }
          onChange={ onInputChange }
        />
        <TextField 
          name='body'
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Que sucedió hoy?'
          minRows={5}
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>
      
      <Grid container justifyContent='end'>
        <Button
          onClick={ onDelete }
          sx={{ mt:2 }}
          color='error'
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery 
        images={ note.imageUrls }
      />

    </Grid>
  )
}

