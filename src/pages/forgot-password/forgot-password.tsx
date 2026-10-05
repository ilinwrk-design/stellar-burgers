import { ForgotPasswordUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPassword } from '../../services/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ForgotPassword = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const error = useSelector((state) => state.user.error);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      await dispatch(forgotPassword(email)).unwrap();

      navigate('/reset-password', {
        state: {
          fromForgotPassword: true
        }
      });
    } catch {
      // Ошибка запроса сохраняется в Redux и отображается в форме.
    }
  };

  return (
    <ForgotPasswordUI
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      errorText={error || ''}
    />
  );
};