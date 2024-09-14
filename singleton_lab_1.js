// Singleton lab 1

// Клас локального сховища
class LocalStorage {
    uploadFile(fileName, content){
        console.log(`Uploading file $(fileName) to LocalStorage`);
        // Тут майбутня логіка завантаження файлу в локальне сховище
    }

    downloadFile(fileName){
            console.log(`Downloading file $(fileName) from Local Storage`);
            // Тут майбутня логіка отримання файлу з локального сховища
        }

    deleteFile(fileName){
        console.log(`Deleting file $(fileName) from Local Storage`);
        // Тут майбутня логіка видалення файлу  з локального сховища
    }
}

// Клас для Amazon S3 сховища
class S3Storage {
    uploadFile(fileName, content){
        console.log(`Uploading file $(fileName) to S3`);
        // Тут майбутня логіка завантаження файлу в Amazon S3
    }

    downloadFile(fileName, content){
        console.log(`Downloading file $(fileName) from S3`);
        // Тут майбутня логіка отримання файлу з Amazon S3
    }

    deleteFile(fileName){
        console.log(`Deleting file $(fileName) from S3`);
        // Тут майбутня логіка видалення файлу в Amazon S3
    }
}

// Реалізація патерна Одинак
class FileStorageManager {
    constructor() {
        if(!FileStorageManager.instance){
            this.storage = null //Ініціалізуємо пусте сховище
            FileStorageManager.instance = this;
        }

        return FileStorageManager.instance;
    }

    //Метод для вибору сховища (LocalStorage або S3Storage)
    selectStorage(storageType){
        switch (storageType){
            case 'local':
                this.storage = new LocalStorage();
                break
            case 's3':
                this.storage = new S3Storage();
                break
            default:
                throw new Error('Invalid storage type select');
        }
    }

    uploadFile(fileName, content){
        if (!this.storage) throw new Error('No storage selected');
        this.storage.uploadFile(fileName, content);
    }

    downloadFile(fileName){
        if (!this.storage) throw new Error('No storage selected');
        this.storage.downloadFile(fileName);
    }

    deleteFile(fileName){
        if (!this.storage) throw new Error('No storage selected');
        this.storage.deleteFile(fileName);
    }
}

//Ініціалізація менеджеру файлів для користувача
const fileManager = new FileStorageManager();

//Вибираємо сховище локальне або Amazon S3
fileManager.selectStorage('local');

//Завантаження файлу в сховища
fileManager.uploadFile('document.txt', 'This is the content of the file')

//Завантажуємо файл з сховища
fileManager.downloadFile('document.txt')

//Видаляємо файл з сховища
fileManager.deleteFile('document.txt');

//Перемикаємо сховище
fileManager.selectStorage('s3')

//Працюємо з новим сховищем
fileManager.uploadFile('image.jpeg', 'Image content');
fileManager.downloadFile('image.jpeg');
fileManager.deleteFile('image.jpeg');