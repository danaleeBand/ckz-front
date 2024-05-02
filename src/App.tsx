import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import './App.css';
import { Checklist, LoginPage, SignInPage } from '@/pages';
import { Auth, ProtectedRoute } from '@/routes';
import { useAuthStore } from '@/stores';

function App() {
  Modal.setAppElement('#root');

  const { accessToken, setAccessToken } = useAuthStore();
  useEffect(() => {
    if (!accessToken) {
      const storedToken = localStorage.getItem('auth-storage');
      if (storedToken) {
        setAccessToken(storedToken);
      }
    }
  }, [accessToken, setAccessToken]);

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/login/:provider' element={<Auth />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/join' element={<SignInPage />} />
        <Route path='/:checklist-id' element={<Checklist />} />
      </Route>
    </Routes>
  );
}

export default App;
