import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { JournalApp } from './JournalApp'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={ store }>
      <BrowserRouter>
          <JournalApp />
      </BrowserRouter>
    </Provider>
    
  </React.StrictMode>,
)
