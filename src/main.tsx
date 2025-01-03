import { createRoot } from 'react-dom/client'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import useAuth from './hooks/useAuth'
import { AuthProvider } from './context/auth'

import Header from './components/Header'

import User from './pages/User'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Shopping from './pages/Shopping'
import Success from './pages/Shopping/Success'
import Cancel from './pages/Shopping/Cancel'
import AdminPage from './pages/Admin'

const AuthRoute: React.FC<{ Item: React.ComponentType }> = ({ Item }) => {
  const { signed } = useAuth()
  return signed ? <Navigate to="/" /> : <Item />
}

const root = document.getElementById('root') as HTMLBodyElement
createRoot(root)
.render(
    <AuthProvider>
      <Header />
      <Router>
        <Routes>
          <Route path='*' element={<Home />} />
          <Route path='/' element={<Home />} />

          <Route path='/shopping' element={<Shopping />} />
          <Route path='/shopping/*' element={<Shopping />} />
          <Route path='/shopping/success' element={<Success />} />
          <Route path='/shopping/cancel' element={<Cancel />} />

          <Route path='/user' element={<User />} />
          <Route path='/user/*' element={<User />} />
          <Route path='/user/signup' element={<AuthRoute Item={Signup} />} />
          <Route path='/user/signin' element={<AuthRoute Item={Signin} />} />

          <Route path='/admin' element={<AdminPage />} />
          <Route path='/admin/:section' element={<AdminPage />} />
        </Routes>
      </Router>
    </AuthProvider>
)

import './global.css'