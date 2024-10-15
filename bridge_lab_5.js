// Bridge Lab 5

// Абстрактний клас Renderer
class Renderer {
    renderPage(page) {
        throw new Error('This method should be overridden.');
    }
}

// HTML Renderer
class HTMLRenderer extends Renderer {
    renderPage(page) {
        return `
      <html>
        <head><title>${page.getTitle()}</title></head>
        <body>
          ${page.getContent()}
        </body>
      </html>
    `;
    }
}

// JSON Renderer
class JsonRenderer extends Renderer {
    renderPage(page) {
        return JSON.stringify({
            title: page.getTitle(),
            content: page.getContent()
        }, null, 2);
    }
}

// XML Renderer
class XmlRenderer extends Renderer {
    renderPage(page) {
        return `
      <page>
        <title>${page.getTitle()}</title>
        <content>${page.getContent()}</content>
      </page>
    `;
    }
}

// Абстрактний клас Page
class Page {
    constructor(renderer) {
        this.renderer = renderer;
    }

    render() {
        return this.renderer.renderPage(this);
    }

    getTitle() {
        throw new Error('This method should be overridden.');
    }

    getContent() {
        throw new Error('This method should be overridden.');
    }
}

// Клас SimplePage
class SimplePage extends Page {
    constructor(renderer, title, content) {
        super(renderer);
        this.title = title;
        this.content = content;
    }

    getTitle() {
        return this.title;
    }

    getContent() {
        return this.content;
    }
}

// Клас Product
class Product {
    constructor(id, name, description, imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

// Клас ProductPage
class ProductPage extends Page {
    constructor(renderer, product) {
        super(renderer);
        this.product = product;
    }

    getTitle() {
        return `Product: ${this.product.name}`;
    }

    getContent() {
        return `
      <div>
        <h1>${this.product.name}</h1>
        <p>${this.product.description}</p>
        <img src="${this.product.imageUrl}" alt="${this.product.name}" />
        <p>ID: ${this.product.id}</p>
      </div>
    `;
    }
}

// Приклад клієнтського коду
const htmlRenderer = new HTMLRenderer();
const jsonRenderer = new JsonRenderer();
const xmlRenderer = new XmlRenderer();

// Проста сторінка
const simplePage = new SimplePage(htmlRenderer, 'Welcome', 'This is the content of the simple page.');
console.log('HTML Simple Page:\n', simplePage.render());

const simplePageJson = new SimplePage(jsonRenderer, 'Welcome', 'This is the content of the simple page.');
console.log('JSON Simple Page:\n', simplePageJson.render());

const simplePageXml = new SimplePage(xmlRenderer, 'Welcome', 'This is the content of the simple page.');
console.log('XML Simple Page:\n', simplePageXml.render());

// Сторінка товару
const product = new Product(123, 'Laptop', 'A high-end gaming laptop', 'https://example.com/laptop.png');
const productPage = new ProductPage(htmlRenderer, product);
console.log('HTML Product Page:\n', productPage.render());

const productPageJson = new ProductPage(jsonRenderer, product);
console.log('JSON Product Page:\n', productPageJson.render());

const productPageXml = new ProductPage(xmlRenderer, product);
console.log('XML Product Page:\n', productPageXml.render());
