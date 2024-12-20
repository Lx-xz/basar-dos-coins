import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Header from './components/Header'

import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import Home from './pages/Home'
import CreditPurchase from './pages/CreditPurchase'
import Sucess from './pages/Sucess'
import Failure from './pages/Failure'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <main>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/CreateAccount' element={<CreateAccount />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/CreditPurchase' element={<CreditPurchase />} />
          <Route path='/Sucess' element={<Sucess />} />
          <Route path='/Failure' element={<Failure />} />
        </Routes>
      </Router>
    </main>
  </StrictMode>,
)

import './style.css'