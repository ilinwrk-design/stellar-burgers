import { ResetPasswordUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@utils/burger-api';

export const ResetPassword = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    // На страницу сброса пароля можно попасть только после запроса восстановления.
    if (!location.state?.fromForgotPassword) {
      navigate('/forgot-password', { replace: true });
    }
  }, [location.state, navigate]);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    resetPasswordApi({
      password,
      token
    })
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch((error: Error) => {
        setErrorText(error.message);
      });
  };

  return (
    <ResetPasswordUI
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
      errorText={errorText}
    />
  );
};