import { Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Modal from 'react-modal';
import './App.css';
import { LoginPage, SignInPage } from '@/pages';

function App() {
  Modal.setAppElement('#root');

  return (
    <Routes>
      <Route
        path='/'
        element={
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <LoginPage />
          </GoogleOAuthProvider>
        }
      />
      <Route path='/login' element={<></>} />
      <Route path='/join' element={<SignInPage />} />
    </Routes>
  );
}

export default App;
