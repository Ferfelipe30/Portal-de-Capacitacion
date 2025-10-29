import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './commons/auth/context/AuthContext';
import AppLayout from './components/AppLayout';
import LoginScreen from './commons/auth/screens/loginScreens';
import CursoDetalleScreen from './commons/capacitaciones/screens/CursoDetalleScreen';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/*" element={<AppLayout />} />
          <Route path="/curso/:id" element={<CursoDetalleScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;