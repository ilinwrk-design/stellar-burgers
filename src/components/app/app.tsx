import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Preloader } from '@ui';
import {
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';

import { getCookie } from '@utils/cookie';

import { getIngredients } from '../../services/ingredientsSlice';
import {
  authCheckFinished,
  getUser
} from '../../services/userSlice';
import { useDispatch, useSelector } from '../../services/store';

import type { AppContentProps } from './type';

import '../../index.css';

import styles from './app.module.css';

const App = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );
  const ingredientsError = useSelector((state) => state.ingredients.error);

  useEffect(() => {
    void dispatch(getIngredients());

    // Если токен есть, запрашиваем данные текущего пользователя.
    if (getCookie('accessToken')) {
      void dispatch(getUser());
    } else {
      // Пользователь не авторизован, первоначальная проверка завершена.
      dispatch(authCheckFinished());
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppContent
        ingredients={ingredients}
        isLoading={isIngredientsLoading}
        error={ingredientsError ? new Error(ingredientsError) : null}
      />
    </div>
  );
};

export default App;

/* Маршруты показываются только когда ингредиенты загружены: без них не
   отрисовать ни конструктор, ни состав заказа. */
const AppContent = ({
  isLoading,
  error
}: AppContentProps): React.JSX.Element => {
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <p className={`${styles.message} text text_type_main-medium`}>
        Не удалось загрузить ингредиенты
        {error.message ? `: ${error.message}` : '.'}
      </p>
    );
  }

  return <RouteComponent />;
};

const RouteComponent = (): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  // Если пользователь открыл детали кликом со страницы,
  // сохраняем текущую страницу как фон для модального окна.
  const backgroundLocation = location.state?.background;

  // При закрытии модального окна возвращаемся на предыдущую страницу.
  const handleCloseModal = (): void => {
    void navigate(-1);
  };

  return (
    <>
      {/* При открытии модалки сохраняем под ней предыдущую страницу. */}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* При прямом переходе по URL детали показываются как отдельная страница. */}
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route
          path='/ingredients/:id'
          element={<IngredientDetails />}
        />

        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Если есть фоновая страница, детали отображаем поверх неё в Modal. */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={handleCloseModal}
              >
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='' onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};