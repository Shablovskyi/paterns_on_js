// Adapter Lab 4

// "Інтерфейс" Notification у JavaScript
class Notification {
    send(title, message) {
        throw new Error('Метод send повинен бути реалізований');
    }
}

// Клас для відправки Email повідомлень, що реалізує "інтерфейс" Notification
class EmailNotification extends Notification {
    constructor(adminEmail) {
        super(); // Виклик конструктора базового класу
        this.adminEmail = adminEmail;
    }

    send(title, message) {
        // Емуляція відправки email
        console.log(`Sent email with title '${title}' to '${this.adminEmail}' that says '${message}'.`);
    }
}

// Клас для відправки повідомлень у Slack
class SlackNotification {
    constructor(login, apiKey, chatId) {
        this.login = login;
        this.apiKey = apiKey;
        this.chatId = chatId;
    }

    sendToSlack(message) {
        // Емуляція відправки повідомлення в Slack
        console.log(`Sent Slack message to chat '${this.chatId}': '${message}'.`);
    }
}

// Адаптер для Slack, що реалізує Notification
class SlackAdapter extends Notification {
    constructor(slackNotification) {
        super(); // Виклик конструктора базового класу
        this.slackNotification = slackNotification;
    }

    send(title, message) {
        const fullMessage = `${title}: ${message}`;
        this.slackNotification.sendToSlack(fullMessage);
    }
}

// Клас для відправки SMS повідомлень
class SmsNotification {
    constructor(phone, sender) {
        this.phone = phone;
        this.sender = sender;
    }

    sendSms(message) {
        // Емуляція відправки SMS
        console.log(`Sent SMS from '${this.sender}' to '${this.phone}': '${message}'.`);
    }
}

// Адаптер для SMS, що реалізує Notification
class SmsAdapter extends Notification {
    constructor(smsNotification) {
        super(); // Виклик конструктора базового класу
        this.smsNotification = smsNotification;
    }

    send(title, message) {
        const fullMessage = `${title}: ${message}`;
        this.smsNotification.sendSms(fullMessage);
    }
}

// Створення екземплярів для кожного типу повідомлень

// Email Notification
const emailNotification = new EmailNotification('admin@example.com');
emailNotification.send('Test Email', 'This is a test email message.');

// Slack Notification через адаптер
const slackNotification = new SlackNotification('user_login', 'api_key_123', 'chat_456');
const slackAdapter = new SlackAdapter(slackNotification);
slackAdapter.send('Test Slack', 'This is a test Slack message.');

// SMS Notification через адаптер
const smsNotification = new SmsNotification('1234567890', 'TestSender');
const smsAdapter = new SmsAdapter(smsNotification);
smsAdapter.send('Test SMS', 'This is a test SMS message.');
