# Патерни

## Лабораторна робота №1 патерн Одинак

LocalStorage та S3Storage: Це класи, що реалізують функціональність завантаження, отримання та видалення файлів у відповідних сховищах.

FileStorageManager: Клас, що реалізує патерн "Одинак" для керування сховищем файлів. Тут є методи для вибору сховища та управління файлами.

selectStorage: Метод для вибору типу сховища (локальне чи S3).

Методи управління файлами: Завантаження, отримання та видалення файлів із вибраного сховища через інтерфейс.

##  Лабораторна робота №2 патерн Фабричний метод

Клас SocialNetwork є базовим класом для всіх соціальних мереж. Він має методи login та post, які повинні бути перевизначені в підкласах.

Класи Facebook і LinkedIn реалізують конкретні методи логування та публікації повідомлень для відповідних соціальних мереж.

Фабрика SocialNetworkFactory створює об'єкти соціальних мереж на основі типу соціальної мережі.

У прикладі ми демонструємо публікацію повідомлень в обох мережах (Facebook та LinkedIn).

## Лабораторна робота №3 патерн Будівельник

QueryBuilder — це абстрактний клас, який визначає спільні методи для будівельників запитів.

PostgreSQLQueryBuilder і MySQLQueryBuilder — це конкретні реалізації будівельника для PostgreSQL і MySQL відповідно. Вони використовують методи select, where і limit для побудови SQL-запиту.

executeQuery — це функція-клієнт, яка будує SQL-запит і виводить його в консоль. Вона може працювати з будь-яким будівельником, оскільки всі вони реалізують однаковий інтерфейс.

### Запуск програм "node file_name.js"