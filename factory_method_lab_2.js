// Factory method lab2

// Базовий клас для соціальної мережі
class SocialNetwork{
    constructor(){
        if(this.constructor.name === SocialNetwork){
            throw new Error('Can not instantiate abstract class SocialNetwork');
        }
    }

    login(){
        throw new Error('The method login() get changed');
    }

    post(message){
        throw new Error('The method post() get changed');
    }
}

// Клас для Facebook
class Facebook extends SocialNetwork{
    constructor(userLogin, password) {
        super();
        this.userLogin = userLogin;
        this.password = password;
    }

    login(){
        console.log(`Loading in to Facebook with login: ${this.userLogin}` );
    }

    post(message){
        this.login();
        console.log(`Posting message to Facebook: ${message}` );
    }
}

// Клас для LinkedIn
class LinkedIn extends SocialNetwork{
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
    }

    login() {
        console.log(`Loading in to LinkedIn with email: ${this.email}` );
    }

    post(message){
        this.login();
        console.log(`Posting message to LinkedIn: ${message}` );
    }
}

// Фабричний клас для створення соціальних мереж
class SocialNetworkFactory {
    createNetwork(type, credentials) {
        switch (type) {
            case 'facebook':
                return new Facebook(credentials.login, credentials.password);
            case 'linkedin':
                return new LinkedIn(credentials.email, credentials.password);
            default:
                throw new Error('Unsupported SocialNetwork');
        }
    }
}

// Приклад використання
const factory = new SocialNetworkFactory();

// Створюємо об'єкт для Facebook
const facebook = factory.createNetwork('facebook', {
    login: 'user_facebook',
    password: 'facebook_password',
});

facebook.post('Facebook is cool!')

// Створюємо об'єкт для LinkedIn
const linkedin = factory.createNetwork('linkedin', {
    email: 'user_linkedin@gmail.com',
    password: 'linkedin_password',
})

linkedin.post('Linkedin, find job')