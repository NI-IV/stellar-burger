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
  });

  it('Добавление булки из списка ингредиентов в конструктор', () => {
    cy.visit(path + '/');
    const ingredients = cy.get('h3').contains('Булки').next('ul');
    const addButton = ingredients.contains('Добавить');

    cy.get('div').contains('Выберите булки').should('exist');
    addButton.click();
    cy.get('div').contains('Выберите булки').should('not.exist');
  });

  it('Добавление начинки из списка ингредиентов в конструктор', () => {
    cy.visit(path + '/');
    const ingredients = cy.get('h3').contains('Начинки').next('ul');
    const addButton = ingredients.contains('Добавить');

    cy.get('div').contains('Выберите начинку').should('exist');
    addButton.click();
    cy.get('div').contains('Выберите начинку').should('not.exist');
  });

  it('Проверка открытия модального окна и проверка открытого ингредиента', () => {
    cy.visit(path + '/');
    const ingredient = cy.get('p').contains('Флюоресцентная булка R2-D3');
    ingredient.click();

    cy.get('[id^=modal]')
      .contains('Флюоресцентная булка R2-D3')
      .should('exist');
  });

  it('Проверка закрытия модального окна с описанием ингредиента', () => {
    cy.visit(path + '/');
    const ingredient = cy.get('p').contains('Флюоресцентная булка R2-D3');
    ingredient.click();

    const modal = cy.get('[id^=modal]').contains('Флюоресцентная булка R2-D3');
    const button = cy.get(`[data-cy=${'closeButton'}]`);
    button.click();

    modal.should('not.exist');
  });

  it('Проверка создания заказа', () => {
    cy.visit(path + '/');

    cy.setCookie('accessToken', 'accessToken');
    cy.setCookie('refreshToken', 'refreshToken');
    window.localStorage.setItem('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');

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
    cy.get('div').contains('Выберите булки').should('exist');
    cy.get('div').contains('Выберите начинку').should('exist');
  });
});
