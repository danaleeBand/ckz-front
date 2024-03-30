import { Route, Routes } from 'react-router-dom';
import './App.css';
import { TestPage, TestTestPage } from '@/pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<TestPage />} />
      <Route path='/test' element={<TestTestPage />} />
    </Routes>
  );
}

export default App;
