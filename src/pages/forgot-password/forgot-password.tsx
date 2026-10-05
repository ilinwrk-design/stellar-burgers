import { ForgotPasswordUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@utils/burger-api';

export const ForgotPassword = (): React.JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    forgotPasswordApi({ email })
      .then(() => {
        navigate('/reset-password', {
          state: {
            fromForgotPassword: true
          }
        });
      })
      .catch((error: Error) => {
        setErrorText(error.message);
      });
  };

  return (
    <ForgotPasswordUI
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      errorText={errorText}
    />
  );
};