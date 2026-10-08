import { ResetPasswordUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { resetPassword } from '../../services/userSlice';
import { selectUserError } from '../../services/selectors';
import { useDispatch, useSelector } from '../../services/store';

export const ResetPassword = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const error = useSelector(selectUserError);

  useEffect(() => {
    // На страницу сброса пароля можно попасть только после запроса восстановления.
    if (!location.state?.fromForgotPassword) {
      navigate('/forgot-password', { replace: true });
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      await dispatch(
        resetPassword({
          password,
          token
        })
      ).unwrap();

      navigate('/login', { replace: true });
    } catch {
      // Ошибка запроса сохраняется в Redux и отображается в форме.
    }
  };

  return (
    <ResetPasswordUI
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
      errorText={error || ''}
    />
  );
};