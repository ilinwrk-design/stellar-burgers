import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store';

export const AppHeader = (): React.JSX.Element => {
  // Получаем имя авторизованного пользователя из Redux.
  const userName = useSelector((state) => state.user.user?.name);

  return <AppHeaderUI userName={userName} />;
};