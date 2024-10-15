// Proxy Lab 6

// Інтерфейс Downloader
class Downloader {
    download(url) {
        throw new Error("Метод download має бути реалізованим");
    }
}

// Клас SimpleDownloader, що реалізує завантаження файлів
class SimpleDownloader extends Downloader {
    download(url) {
        console.log(`Завантаження даних з ${url}`);
        // Симуляція завантаження (наприклад, через fetch або інші методи)
        return `Дані з ${url}`;
    }
}

// Клас CachingDownloader, що реалізує кешування завантажених даних
class CachingDownloader extends Downloader {
    constructor() {
        super();
        this.downloader = new SimpleDownloader();  // Використовуємо простий завантажувач
        this.cache = {};  // Об'єкт для кешування
    }

    download(url) {
        if (this.cache[url]) {
            console.log(`Повертаємо закешовані дані з ${url}`);
            return this.cache[url];
        }

        console.log(`Немає кешу, завантажуємо дані з ${url}`);
        const result = this.downloader.download(url);
        this.cache[url] = result;  // Кешуємо результат
        return result;
    }
}

// Приклад клієнтського коду
const downloader = new CachingDownloader();  // Єдиний екземпляр для кешування

function renderPage(type) {
    if (type === 'home') {
        console.log("Рендеринг головної сторінки:");
        const homeData = downloader.download('https://example.com/home');
        console.log(`Дані для головної сторінки: ${homeData}`);
    }

    if (type === 'about') {
        console.log("Рендеринг сторінки 'Про нас':");
        const aboutData = downloader.download('https://example.com/about');
        console.log(`Дані для сторінки 'Про нас': ${aboutData}`);
    }

    if (type === 'contact') {
        console.log("Рендеринг сторінки 'Контакти':");
        const contactData = downloader.download('https://example.com/contact');
        console.log(`Дані для сторінки 'Контакти': ${contactData}`);
    }
}

// Виклик клієнтського коду
renderPage('home');
renderPage('about');
renderPage('home');  // Повторний запит на головну сторінку (дані будуть з кешу)
renderPage('contact');
