// Builder Lab 3

// Інтерфейс QueryBuilder
class QueryBuilder {
    select(fields) {
        throw new Error("Method 'select' should be implemented");
    }

    where(condition) {
        throw new Error("Method 'where' should be implemented");
    }

    limit(count) {
        throw new Error("Method 'limit' should be implemented");
    }

    getSQL() {
        throw new Error("Method 'getSQL' should be implemented");
    }
}

// Реалізація для PostgreSQL
class PostgreSQLQueryBuilder extends QueryBuilder {
    constructor() {
        super();
        this.query = {
            select: '',
            where: '',
            limit: ''
        };
    }

    select(fields) {
        this.query.select = `SELECT ${fields.join(', ')} FROM table_name`;
        return this;
    }

    where(condition) {
        this.query.where = `WHERE ${condition}`;
        return this;
    }

    limit(count) {
        this.query.limit = `LIMIT ${count}`;
        return this;
    }

    getSQL() {
        // Повертаємо запит як рядок
        return `${this.query.select} ${this.query.where} ${this.query.limit}`.trim();
    }
}

// Реалізація для MySQL
class MySQLQueryBuilder extends QueryBuilder {
    constructor() {
        super();
        this.query = {
            select: '',
            where: '',
            limit: ''
        };
    }

    select(fields) {
        this.query.select = `SELECT ${fields.join(', ')} FROM table_name`;
        return this;
    }

    where(condition) {
        this.query.where = `WHERE ${condition}`;
        return this;
    }

    limit(count) {
        this.query.limit = `LIMIT ${count}`;
        return this;
    }

    getSQL() {
        // Повертаємо запит як рядок
        return `${this.query.select} ${this.query.where} ${this.query.limit}`.trim();
    }
}

// Функція для виконання запитів
function executeQuery(builder) {
    const query = builder
        .select(['id', 'name', 'email'])
        .where('age > 18')
        .limit(10)
        .getSQL(); // Отримуємо правильний SQL запит у вигляді рядка
    console.log(query); // Виводимо рядок запиту
}

// Використання для PostgreSQL
const postgresBuilder = new PostgreSQLQueryBuilder();
console.log("PostgreSQL Query:");
executeQuery(postgresBuilder);

// Використання для MySQL
const mySQLBuilder = new MySQLQueryBuilder();
console.log("MySQL Query:");
executeQuery(mySQLBuilder);
