import { IngredientDetailsUI, Preloader } from '@ui';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../services/store';

export const IngredientDetails = (): React.JSX.Element => {
  // Получаем id ингредиента из адресной строки.
  const { id } = useParams();

  // Получаем список всех ингредиентов из Redux.
  const ingredients = useSelector(
    (state) => state.ingredients.ingredients
  );

  // Находим ингредиент с id из текущего маршрута.
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  // Пока данные ингредиента не найдены, показываем загрузку.
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};