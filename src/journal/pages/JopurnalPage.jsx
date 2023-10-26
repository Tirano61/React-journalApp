
import { IconButton, Typography } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { logoutFirebase } from '../../firebase/providers'
import { startNewNote } from '../../store/journal/thunks'

export const JopurnalPage = () => {


  const { isSaving, active } = useSelector( state => state.journal );
  const dispach = useDispatch();
  const onNewNote = () => {

    dispach(startNewNote());
  }

  return (
    <>
      <JournalLayout>
        {/* <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, earum ducimus! Nam doloremque optio natus eum voluptates sint fugit voluptate saepe temporibus hic! Sit reiciendis in quae, necessitatibus eius distinctio?</Typography> */}
        
        {
          active !== null 
          ?
          <NoteView />
          :
          <NothingSelectedView />
        }
        <IconButton
          disabled={ isSaving }
          size='large'
          sx={{color:'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.7 },
            position: 'fixed',
            right:50,
            bottom:50,
          }}
          onClick={ onNewNote }
        >
          <AddOutlined  sx={{ fontSize: 30}}/>
        </IconButton>
      </JournalLayout>

      
    </>
  )
}
