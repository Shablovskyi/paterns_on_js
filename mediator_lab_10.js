// Компонент Посередник
class OrderMediator {
  constructor() {
    this.deliveryDate = null;
    this.timeSlots = [];
    this.isSelfPickup = false;
    this.isOtherRecipient = false;
    this.recipientName = null;
    this.recipientPhone = null;
  }

  setDeliveryDate(date) {
    this.deliveryDate = date;
    console.log(`Дата доставки встановлена на: ${date}`);
    this.updateTimeSlots();
  }

  updateTimeSlots() {
    // Логіка оновлення доступних проміжків часу залежно від дати
    if (this.deliveryDate === 'tomorrow') {
      this.timeSlots = ['10:00-12:00', '12:00-14:00'];
    } else {
      this.timeSlots = ['14:00-16:00', '16:00-18:00'];
    }
    console.log(`Доступні проміжки часу для доставки: ${this.timeSlots.join(', ')}`);
  }

  toggleSelfPickup(isSelfPickup) {
    this.isSelfPickup = isSelfPickup;
    console.log(`Самовивіз: ${isSelfPickup ? 'активовано' : 'деактивовано'}`);
    this.updateFormState();
  }

  toggleOtherRecipient(isOtherRecipient) {
    this.isOtherRecipient = isOtherRecipient;
    console.log(`Отримувач інша особа: ${isOtherRecipient ? 'так' : 'ні'}`);
    this.updateRecipientFields();
  }

  setRecipientName(name) {
    this.recipientName = name;
    console.log(`Ім'я отримувача: ${name}`);
  }

  setRecipientPhone(phone) {
    this.recipientPhone = phone;
    console.log(`Телефон отримувача: ${phone}`);
  }

  updateFormState() {
    // Вимикаємо поля доставки, якщо обраний самовивіз
    if (this.isSelfPickup) {
      console.log("Всі поля, що стосуються доставки, стали неактивними.");
    } else {
      console.log("Поля доставки активовані.");
    }
  }

  updateRecipientFields() {
    if (this.isOtherRecipient) {
      console.log("Поля 'Ім'я' та 'Телефон' для іншого отримувача стали видимими і обов'язковими.");
    } else {
      console.log("Поля 'Ім'я' та 'Телефон' для іншого отримувача приховані.");
    }
  }
}

// Ініціалізація посередника та обробка подій
const orderMediator = new OrderMediator();

// Приклади викликів, щоб показати роботу посередника в консолі
orderMediator.setDeliveryDate('tomorrow');
orderMediator.toggleSelfPickup(true);
orderMediator.toggleSelfPickup(false);
orderMediator.toggleOtherRecipient(true);
orderMediator.setRecipientName('Олексій');
orderMediator.setRecipientPhone('+380123456789');
orderMediator.toggleOtherRecipient(false);
