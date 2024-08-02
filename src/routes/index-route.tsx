import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserAuthenticated } from '@/utils';

export const IndexRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate('/login');
    } else {
      navigate('/checklist');
    }
  }, []);

  return null;
};
