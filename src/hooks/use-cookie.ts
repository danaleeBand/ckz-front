import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

export const useCookie = () => {
  const cookies = new Cookies();

  const setCookie = (
    name: string,
    value: string,
    options?: CookieSetOptions,
  ) => {
    try {
      cookies.set(name, value, { ...options });
    } catch (error) {
      console.error('setCookie error', error);
    }
  };

  const getCookie = (name: string) => {
    try {
      cookies.get(cookies.get(name));
    } catch (error) {
      console.error('getCookie error', error);
    }
  };

  const removeCookie = (name: string, option?: CookieSetOptions) => {
    try {
      cookies.remove(name, { ...option });
    } catch (error) {
      console.error('removeCookie error', error);
    }
  };

  return [getCookie, setCookie, removeCookie];
};
