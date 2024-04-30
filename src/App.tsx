import { Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import './App.css';
import { Checklist, LoginPage, SignInPage } from '@/pages';
import { Auth, ProtectedRoute } from '@/routes';

function App() {
  Modal.setAppElement('#root');

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
