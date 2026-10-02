import type { ReactNode } from 'react';

type TProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({
  children
}: TProtectedRouteProps): React.JSX.Element => {
  // компонент только отображает вложенный контент.
  // проверку авторизации и редиректы добавим позже.
  return <>{children}</>;
};
