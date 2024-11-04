// Клас Посередник
class CheckoutMediator {
  constructor() {
    this.components = {};
  }

  // Реєстрація компонентів у посереднику
  register(name, component) {
    this.components[name] = component;
    component.setMediator(this);
  }

  // Метод посередника для управління взаємодією між компонентами
  notify(sender, event) {
    switch (event) {
      case "dateChanged":
        this.components["timeField"].updateAvailableTimeSlots(this.components["dateField"].getDate());
        break;
      case "recipientChanged":
        this.components["recipientFields"].toggleFields(this.components["recipientCheckbox"].isChecked());
        break;
      case "pickupChanged":
        const isPickup = this.components["pickupCheckbox"].isChecked();
        this.components["dateField"].setDisabled(isPickup);
        this.components["timeField"].setDisabled(isPickup);
        this.components["recipientCheckbox"].setDisabled(isPickup);
        this.components["recipientFields"].toggleFields(!isPickup && this.components["recipientCheckbox"].isChecked());
        break;
    }
  }
}

// Клас для поля з датою
class DateField {
  constructor() {
    this.date = null;
    this.disabled = false;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }

  setDate(date) {
    if (!this.disabled) {
      this.date = date;
      console.log(`Дата встановлена: ${this.date}`);
      this.mediator.notify(this, "dateChanged");
    }
  }

  getDate() {
    return this.date;
  }

  setDisabled(isDisabled) {
    this.disabled = isDisabled;
    console.log(`Поле дати ${isDisabled ? "вимкнено" : "увімкнено"}`);
  }
}

// Клас для поля з часом
class TimeField {
  constructor() {
    this.timeSlots = [];
    this.disabled = false;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }

  updateAvailableTimeSlots(date) {
    this.timeSlots = this.getTimeSlotsForDate(date);
    console.log(`Доступні часові проміжки для ${date}: ${this.timeSlots.join(", ")}`);
  }

  getTimeSlotsForDate(date) {
    const timeSlots = {
      "2024-11-05": ["10:00 - 12:00", "14:00 - 16:00"],
      "2024-11-06": ["12:00 - 14:00", "16:00 - 18:00"],
      "default": ["9:00 - 11:00", "13:00 - 15:00", "17:00 - 19:00"]
    };
    return timeSlots[date] || timeSlots["default"];
  }

  setDisabled(isDisabled) {
    this.disabled = isDisabled;
    console.log(`Поле часу ${isDisabled ? "вимкнено" : "увімкнено"}`);
  }
}

// Клас для чекбокса іншого отримувача
class RecipientCheckbox {
  constructor() {
    this.checked = false;
    this.disabled = false;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }

  setChecked(isChecked) {
    if (!this.disabled) {
      this.checked = isChecked;
      console.log(`Чекбокс "отримувач інша особа" встановлено: ${isChecked}`);
      this.mediator.notify(this, "recipientChanged");
    }
  }

  isChecked() {
    return this.checked;
  }

  setDisabled(isDisabled) {
    this.disabled = isDisabled;
    console.log(`Чекбокс "отримувач інша особа" ${isDisabled ? "вимкнено" : "увімкнено"}`);
  }
}

// Клас для полів іншого отримувача (Ім'я та Телефон)
class RecipientFields {
  constructor() {
    this.name = "";
    this.phone = "";
    this.required = false;
    this.disabled = true;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }

  toggleFields(isVisible) {
    this.required = isVisible;
    this.disabled = !isVisible;
    console.log(`Поля для іншого отримувача ${isVisible ? "активні та обов'язкові" : "неактивні"}`);
  }
}

// Клас для чекбокса самовивозу
class PickupCheckbox {
  constructor() {
    this.checked = false;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }

  setChecked(isChecked) {
    this.checked = isChecked;
    console.log(`Чекбокс "самовивіз" встановлено: ${isChecked}`);
    this.mediator.notify(this, "pickupChanged");
  }

  isChecked() {
    return this.checked;
  }
}

// Ініціалізація компонентів та посередника
const mediator = new CheckoutMediator();

const dateField = new DateField();
const timeField = new TimeField();
const recipientCheckbox = new RecipientCheckbox();
const recipientFields = new RecipientFields();
const pickupCheckbox = new PickupCheckbox();

// Реєстрація компонентів у посереднику
mediator.register("dateField", dateField);
mediator.register("timeField", timeField);
mediator.register("recipientCheckbox", recipientCheckbox);
mediator.register("recipientFields", recipientFields);
mediator.register("pickupCheckbox", pickupCheckbox);

// Демонстрація взаємодії
dateField.setDate("2024-11-05");
recipientCheckbox.setChecked(true);
pickupCheckbox.setChecked(true);
pickupCheckbox.setChecked(false); // Вимкнення самовивозу, що знову активує доставку
dateField.setDate("2024-11-06");
