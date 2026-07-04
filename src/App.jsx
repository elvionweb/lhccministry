import React from 'react'
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';




const App = () => {
  return (
    
    <AuthProvider> 
    <ScrollToTop />
    <AppRoutes />
    </AuthProvider>
  )
}

export default App