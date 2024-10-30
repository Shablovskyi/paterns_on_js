// Strategy Lab 7

// Стратегія для обробки доставки
class DeliveryStrategy {
  calculateCost(distance) {
    throw new Error("Метод calculateCost має бути реалізований у конкретній стратегії");
  }
}

// Реалізація стратегії для самовивозу
class PickupDelivery extends DeliveryStrategy {
  calculateCost(distance) {
    console.log("Вартість доставки: 0 грн (Самовивіз)");
  }
}

// Реалізація стратегії для доставки зовнішньою службою
class ExternalServiceDelivery extends DeliveryStrategy {
  calculateCost(distance) {
    console.log(`Вартість доставки зовнішньою службою: ${distance * 10} грн`);
  }
}

// Реалізація стратегії для власної служби доставки
class OwnServiceDelivery extends DeliveryStrategy {
  calculateCost(distance) {
    console.log(`Вартість доставки власною службою: ${distance * 5} грн`);
  }
}

// Контекст, який використовує стратегію доставки
class DeliveryContext {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeDeliveryCost(distance) {
    if (!this.strategy) {
      throw new Error("Стратегія не обрана");
    }
    this.strategy.calculateCost(distance);
  }
}

// Використання патерну "Стратегія" для доставки
const deliveryContext = new DeliveryContext();

// Вибір самовивозу
deliveryContext.setStrategy(new PickupDelivery());
deliveryContext.executeDeliveryCost(10);

// Вибір доставки зовнішньою службою
deliveryContext.setStrategy(new ExternalServiceDelivery());
deliveryContext.executeDeliveryCost(10);

// Вибір доставки власною службою
deliveryContext.setStrategy(new OwnServiceDelivery());
deliveryContext.executeDeliveryCost(10);
