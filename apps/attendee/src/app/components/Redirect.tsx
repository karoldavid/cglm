import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface RedirectProps {}

export const Redirect: React.FunctionComponent<RedirectProps> = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/guest') {
      history.push('/');
    }
  }, []);

  return null;
};
