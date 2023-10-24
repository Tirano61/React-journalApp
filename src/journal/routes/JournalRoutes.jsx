


import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { JopurnalPage } from '../pages/JopurnalPage'

export const JournalRoutes = () => {
  return (
    <Routes>
      <Route  path='/' element={ <JopurnalPage /> }/>
      <Route path='/*' element={ <Navigate to='/' /> }/>
    </Routes>
  )
}
