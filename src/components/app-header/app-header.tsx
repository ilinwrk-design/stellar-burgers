import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store';
import { selectUser } from '../../services/selectors';

export const AppHeader = (): React.JSX.Element => {
  // Получаем пользователя из Redux.
  const user = useSelector(selectUser);
  const userName = user?.name;

  return <AppHeaderUI userName={userName} />;
};