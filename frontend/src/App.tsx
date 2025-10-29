import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './commons/auth/context/AuthContext';
import AppLayout from './components/AppLayout';
import LoginScreen from './commons/auth/screens/loginScreens';
import CursoDetalleScreen from './commons/capacitaciones/screens/CursoDetalleScreen';
import AdminCursosScreen from './commons/capacitaciones/screens/AdminCursosScreen';
import UsuarioScreen from './commons/usuario/screens/usuarioScreen';
import Register from './commons/usuario/components/CreateUsuario';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/register"
            element={<Register open={true} onClose={() => {}} onSuccess={() => {}} />}
          />
          <Route path="/*" element={<AppLayout />} />
          <Route path="/curso/:id" element={<CursoDetalleScreen />} />
          <Route path="/admin/cursos" element={<AdminCursosScreen />} />
          <Route path="/admin/usuario" element={<UsuarioScreen />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;