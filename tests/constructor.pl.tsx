import { test, expect } from '@playwright/test';

test.describe('Проверка конструктора бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
      notFound: 'abort',
    });
    await page.routeFromHAR('tests/hars/user.har', {
      url: '**/api/auth/user',
      update: false,
      notFound: 'abort',
    });

    await page.routeFromHAR('tests/hars/order.har', {
      url: '**/api/orders',
      update: false,
      notFound: 'abort',
    });

    await page.goto('/');
  });

  test('Страница конструктора открывается', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Соберите бургер' })).toBeVisible();

    await expect(page.getByText('Краторная булка N-200i')).toBeVisible();

    await expect(page.getByText('Биокотлета из марсианской Магнолии')).toBeVisible();
  });

  test('Добавление булки в конструктор', async ({ page }) => {
    const bunName = 'Краторная булка N-200i';

    await page
      .getByText(bunName)
      .locator('xpath=../..')
      .getByRole('button', { name: 'Добавить' })
      .click();

    const constructor = page.locator('section[class*="burger_constructor"]');

    await expect(constructor.getByText(`${bunName} (верх)`)).toBeVisible();

    await expect(constructor.getByText(`${bunName} (низ)`)).toBeVisible();
  });

  test('Добавление начинки в конструктор', async ({ page }) => {
    const ingredient = page
      .getByText('Биокотлета из марсианской Магнолии')
      .locator('xpath=../..');

    await ingredient.getByRole('button', { name: 'Добавить' }).click();

    const constructor = page.locator('section[class*="burger_constructor"]');

    await expect(
      constructor.getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();
  });

  test('Открытие модального окна ингредиента', async ({ page }) => {
    await page.getByText('Краторная булка N-200i').click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();
    await expect(modal.getByText('Детали ингредиента')).toBeVisible();
    await expect(modal.getByText('Краторная булка N-200i')).toBeVisible();
  });

  test('Закрытие модального окна по крестику', async ({ page }) => {
    await page.getByText('Краторная булка N-200i').click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();

    await modal.getByRole('button', { name: 'Закрыть' }).click();

    await expect(modal).not.toBeVisible();
  });

  test('Закрытие модального окна по оверлею', async ({ page }) => {
    await page.getByText('Краторная булка N-200i').click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();

    await page.getByTestId('modal-overlay').click({
      position: { x: 10, y: 10 },
    });

    await expect(modal).not.toBeVisible();
  });

  test('Создание заказа', async ({ page }) => {
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: 'Bearer test-access-token',
        url: 'http://localhost:4000',
      },
    ]);

    await page.evaluate(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await page.reload();

    await expect(page.getByRole('heading', { name: 'Соберите бургер' })).toBeVisible();

    const constructor = page.locator('section[class*="burger_constructor"]');

    const bun = page.getByText('Краторная булка N-200i').locator('xpath=../..');

    await bun.getByRole('button', { name: 'Добавить' }).click();

    const ingredient = page
      .getByText('Биокотлета из марсианской Магнолии')
      .locator('xpath=../..');

    await ingredient.getByRole('button', { name: 'Добавить' }).click();

    // Проверяем добавленные ингредиенты внутри конструктора.
    await expect(constructor.getByText('Краторная булка N-200i (верх)')).toBeVisible();

    await expect(constructor.getByText('Краторная булка N-200i (низ)')).toBeVisible();

    await expect(
      constructor.getByText('Биокотлета из марсианской Магнолии')
    ).toBeVisible();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    // Проверяем номер заказа внутри модального окна.
    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();
    await expect(modal.getByText('12345')).toBeVisible();

    // Проверяем очистку конструктора после оформления заказа.
    await expect(constructor.getByText('Выберите булки')).toHaveCount(2);

    await expect(constructor.getByText('Выберите начинку')).toBeVisible();

    // Закрываем модальное окно заказа.
    await modal.getByRole('button', { name: 'Закрыть' }).click();

    await expect(modal).not.toBeVisible();
  });
});
