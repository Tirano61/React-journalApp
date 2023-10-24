

import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRouts } from '../auth/routes/AuthRouts'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components/CheckingAuth'
import { useCheckOuth } from '../hooks/useCheckOuth'

export const AppRouter = () => {

  const { status } = useCheckOuth();
  
  if(status === 'checking'){
    return(
      <CheckingAuth />
    )
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
        ? <Route path='/*' element={ <JournalRoutes /> }/>
        : <Route path='/auth/*' element={ <AuthRouts /> }/>
      }
      <Route path='/*' element={ <Navigate to='/auth/login'/> }/>
      {/* Login y regsitro */}
      {/* <Route path='/auth/*' element={ <AuthRouts /> }/> */}
      {/* Journal App */}
      {/* <Route path='/*' element={ <JournalRoutes /> }/> */}
    </Routes>
  )
}
