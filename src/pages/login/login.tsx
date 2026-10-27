import { LoginUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';

import { loginUser } from '../../services/userSlice';
import { selectUserError } from '../../services/selectors';
import { useDispatch, useSelector } from '../../services/store';

export const Login = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector(selectUserError);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    void dispatch(
      loginUser({
        email,
        password
      })
    );
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};