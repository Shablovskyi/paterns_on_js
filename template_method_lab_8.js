// Template method Lab 8

// Базовий клас, що містить шаблонний метод
class EntityUpdater {
  update() {
    const entity = this.getEntity();
    if (!this.validateData(entity)) {
      this.onValidationError();
      return this.formErrorResponse();
    }
    const response = this.saveEntity(entity);
    return this.formResponse(response);
  }

  getEntity() {
    throw new Error("Метод 'getEntity()' повинен бути реалізований підкласом");
  }

  validateData(entity) {
    throw new Error("Метод 'validateData()' повинен бути реалізований підкласом");
  }

  saveEntity(entity) {
    console.log("Збереження сутності...");
    return { statusCode: 200, status: 'OK' };
  }

  formResponse(response) {
    return response;
  }

  formErrorResponse() {
    return { statusCode: 400, status: 'Validation Failed' };
  }

  onValidationError() {
    // Хук, який можна перевизначити в підкласах
  }
}

// Клас для сутності Товар
class ProductUpdater extends EntityUpdater {
  getEntity() {
    console.log("Отримання Товару...");
    return { id: 1, name: 'Продукт 1', price: 100 };
  }

  validateData(entity) {
    console.log("Валідація даних Товару...");
    const isValid = entity.price > 0;
    return isValid;
  }

  onValidationError() {
    console.log("Сповіщення адміністратора у месенджер про помилку валідації Товару...");
  }
}

// Клас для сутності Користувач
class UserUpdater extends EntityUpdater {
  getEntity() {
    console.log("Отримання Користувача...");
    return { id: 2, name: 'Користувач 1', email: 'user1@example.com' };
  }

  validateData(entity) {
    console.log("Валідація даних Користувача...");
    // Заборонено змінювати email
    if (entity.hasOwnProperty('email')) {
      console.log("Заборонено змінювати поле email");
      delete entity.email;
    }
    return true;
  }
}

// Клас для сутності Замовлення
class OrderUpdater extends EntityUpdater {
  getEntity() {
    console.log("Отримання Замовлення...");
    return { id: 3, product: 'Продукт 1', quantity: 2 };
  }

  validateData(entity) {
    console.log("Валідація даних Замовлення...");
    const isValid = entity.quantity > 0;
    return isValid;
  }

  formResponse(response) {
    console.log("Формування відповіді для Замовлення...");
    return { ...response, entity: this.getEntity() };
  }
}

// Використання
const productUpdater = new ProductUpdater();
console.log(productUpdater.update());

console.log('----------------');

const userUpdater = new UserUpdater();
console.log(userUpdater.update());

console.log('----------------');

const orderUpdater = new OrderUpdater();
console.log(orderUpdater.update());
