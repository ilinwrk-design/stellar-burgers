import { RegisterUI } from '@ui-pages';
import { type SyntheticEvent, useState } from 'react';

import { registerUser } from '../../services/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Register = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector((state) => state.user.error);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    void dispatch(
      registerUser({
        name: userName,
        email,
        password
      })
    );
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setUserName={setUserName}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};