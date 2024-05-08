import { LoginPage } from '@/pages';
import { isUserAuthenticated } from '@/utils';

export const IndexRouting = () => {
  if (!isUserAuthenticated()) {
    return <LoginPage />;
  }
  return <></>;
};
