import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import './App.css';
import { Checklist, LoginPage, SignInPage } from '@/pages';
import {
  AuthRoute,
  ChecklistRoute,
  IndexRoute,
  ProtectedRoute,
} from '@/routes';
import { useThemeStore } from '@/stores';
import { applyTheme } from '@/utils';

function App() {
  Modal.setAppElement('#root');

  const { theme } = useThemeStore();
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <Routes>
      <Route path='/' element={<IndexRoute />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/login/:provider' element={<AuthRoute />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/join' element={<SignInPage />} />
        <Route path='/checklist' element={<ChecklistRoute />} />
        <Route path='/:checklistId' element={<Checklist />} />
      </Route>
    </Routes>
  );
}

export default App;
