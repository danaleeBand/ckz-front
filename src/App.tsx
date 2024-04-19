import { Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import { LoginPage, SignInPage } from '@/pages';

function App() {
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
      <Route path='/join' element={<SignInPage />} />
    </Routes>
  );
}

export default App;
