// Visitor Lab 9

// Класи: Компанія, Департамент, Співробітник
class Employee {
    constructor(position, salary) {
        this.position = position;
        this.salary = salary;
    }

    accept(visitor) {
        visitor.visitEmployee(this);
    }
}

class Department {
    constructor(name, employees) {
        this.name = name;
        this.employees = employees;
    }

    accept(visitor) {
        for (const employee of this.employees) {
            employee.accept(visitor);
        }
        visitor.visitDepartment(this);
    }
}

class Company {
    constructor(name, departments) {
        this.name = name;
        this.departments = departments;
    }

    accept(visitor) {
        for (const department of this.departments) {
            department.accept(visitor);
        }
        visitor.visitCompany(this);
    }
}

// Відвідувач для генерації зарплатної відомості
class SalaryReportVisitor {
    constructor() {
        this.totalSalary = 0;
    }

    visitEmployee(employee) {
        console.log(`Позиція: ${employee.position}, Зарплата: ${employee.salary}`);
        this.totalSalary += employee.salary;
    }

    visitDepartment(department) {
        console.log(`\nДепартамент: ${department.name}`);
    }

    visitCompany(company) {
        console.log(`\nКомпанія: ${company.name}`);
        console.log(`Загальна зарплатня: ${this.totalSalary}`);
    }
}

// "Клієнтський код"
// Створення співробітників
const emp1 = new Employee('Менеджер', 5000);
const emp2 = new Employee('Інженер', 7000);
const emp3 = new Employee('HR', 4000);
const emp4 = new Employee('Бухгалтер', 4500);

// Створення департаментів
const dep1 = new Department('IT', [emp1, emp2]);
const dep2 = new Department('HR', [emp3, emp4]);

// Створення компанії
const company = new Company('Simirenky', [dep1, dep2]);

// Генерація зарплатної відомості для компанії
console.log('Зарплатна відомість для компанії:');
const companyReportVisitor = new SalaryReportVisitor();
company.accept(companyReportVisitor);

// Генерація зарплатної відомості для конкретного департаменту
console.log('\nЗарплатна відомість для департаменту IT:');
const departmentReportVisitor = new SalaryReportVisitor();
dep1.accept(departmentReportVisitor);
