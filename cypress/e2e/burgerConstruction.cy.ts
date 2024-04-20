const path = 'http://localhost:8080';

describe('Проверка доступности приложения', () => {
  it('Сервис должен быть доступен по адресу localhost:8080', () => {
    cy.visit(path);
  });
});

describe('Проверка конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.setCookie('accessToken', 'accessToken');
    cy.setCookie('refreshToken', 'refreshToken');
    window.localStorage.setItem('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.visit(path + '/');
  });

  afterEach(() => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
    cy.clearCookie('refreshToken');
  })

  const editBuns = 'Выберите булки';
  const editIngredient = 'Выберите начинку';
  const ingredientName = 'Флюоресцентная булка R2-D3';

  it('Добавление булки из списка ингредиентов в конструктор', () => {
    const ingredients = cy.get('h3').contains('Булки').next('ul');
    const addButton = ingredients.contains('Добавить');

    cy.get('div').contains(editBuns).should('exist');
    addButton.click();
    cy.get('div').contains(editBuns).should('not.exist');
  });

  it('Добавление начинки из списка ингредиентов в конструктор', () => {
    const ingredients = cy.get('h3').contains('Начинки').next('ul');
    const addButton = ingredients.contains('Добавить');

    cy.get('div').contains(editIngredient).should('exist');
    addButton.click();
    cy.get('div').contains(editIngredient).should('not.exist');
  });

  it('Проверка открытия модального окна и проверка открытого ингредиента', () => {
    const ingredient = cy.get('p').contains(ingredientName);
    ingredient.click();

    cy.get('[id^=modal]')
      .contains(ingredientName)
      .should('exist');
  });

  it('Проверка закрытия модального окна с описанием ингредиента', () => {
    const ingredient = cy.get('p').contains(ingredientName);
    ingredient.click();

    const modal = cy.get('[id^=modal]').contains(ingredientName);
    const button = cy.get(`[data-cy=${'closeButton'}]`);
    button.click();

    modal.should('not.exist');
  });

  it('Проверка создания заказа', () => {
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    });

    const buns = cy.get('h3').contains('Булки').next('ul');
    const addBunsButton = buns.contains('Добавить');
    addBunsButton.click();

    const ingredients = cy.get('h3').contains('Начинки').next('ul');
    const addIngredientsButton = ingredients.contains('Добавить');
    addIngredientsButton.click();

    const orderButton = cy.get('button').contains('Оформить заказ');
    orderButton.click();

    cy.get('[id^=modal]').contains('11115').should('exist');
    cy.get('body').type('{esc}');
    cy.get('[id^=modal]').contains('11115').should('not.exist');
    cy.get('div').contains(editBuns).should('exist');
    cy.get('div').contains(editIngredient).should('exist');
  });
});
