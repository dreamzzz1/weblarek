# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды:

```shell
npm install
npm run start
```

или

```shell
yarn
yarn start
```

## Сборка

```shell
npm run build
```

или

```shell
yarn build
```

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

- **Model** — слой данных, отвечает за хранение и изменение данных.
- **View** — слой представления, отвечает за отображение данных на странице.
- **Presenter** — презентер содержит основную логику приложения и отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события, используя методы как Моделей, так и Представлений.

---

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса. Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

**Конструктор:**
`constructor(container: HTMLElement)` — принимает ссылку на DOM элемент за отображение, которого он отвечает.

**Поля класса:**
- `container: HTMLElement` — поле для хранения корневого DOM элемента компонента.

**Методы класса:**
- `render(data?: Partial<T>): HTMLElement` — отображает данные в компоненте.
- `setImage(element: HTMLImageElement, src: string, alt?: string): void` — утилитарный метод для модификации изображений `<img>`.

---

#### Класс Api
Содержит базовую логику отправки запросов.

**Конструктор:**
`constructor(baseUrl: string, options: RequestInit = {})` — базовый адрес сервера и опциональные заголовки.

**Поля класса:**
- `baseUrl: string` — базовый адрес сервера.
- `options: RequestInit` — объект с заголовками для запросов.

**Методы класса:**
- `get(uri: string): Promise<object>` — выполняет GET-запрос.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` — выполняет POST/PUT/DELETE-запрос.
- `handleResponse(response: Response): Promise<object>` — проверяет корректность ответа сервера.

---

#### Класс EventEmitter
Реализует паттерн "Наблюдатель", позволяя подписываться на события и отправлять их.

**Поля класса:**
- `_events: Map<string | RegExp, Set<Function>>` — хранит подписки на события.

**Методы класса:**
- `on<T extends object>(event: EventName, callback: (data: T) => void): void` — подписка на событие.
- `emit<T extends object>(event: string, data?: T): void` — инициирование события.
- `trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` — возвращает функцию для вызова события.

---

## Данные

В приложении используются две основные сущности: **Товар** и **Покупатель**.

### Товар

```typescript
interface IProduct {
  id: string;          // Уникальный идентификатор товара
  title: string;       // Название товара
  description: string; // Подробное описание
  image: string;       // Ссылка на изображение
  category: string;    // Категория товара
  price: number | null;// Цена (может быть null, если товар недоступен)
}
```

### Покупатель

```typescript
type TPayment = 'card' | 'cash';

interface IBuyer {
  payment: TPayment | null; // Вид оплаты
  email: string;            // Электронная почта
  phone: string;            // Телефон
  address: string;          // Адрес доставки
}
```

### Данные для отправки на сервер

```typescript
interface IOrderPayload {
  buyer: IBuyer;
  products: IProduct[];
  total: number;
}
```

---

## Модели данных

#### Класс Products
Зона ответственности: хранение всех товаров и выбранного для подробного просмотра.

**Поля:**
- `private items: IProduct[]` — все товары
- `private selected: IProduct | null` — выбранный товар

**Методы:**
- `setProducts(items: IProduct[]): void` — устанавливает список товаров
- `getAll(): IProduct[]` — возвращает все товары
- `getItemById(id: string): IProduct | null` — возвращает товар по ID
- `setSelected(item: IProduct | null): void` — устанавливает выбранный товар
- `getSelected(): IProduct | null` — возвращает выбранный товар

---

#### Класс Cart
Зона ответственности: хранение товаров, выбранных для покупки.

**Поля:**
- `private items: IProduct[]` — товары в корзине

**Методы:**
- `addProduct(product: IProduct): void` — добавляет товар в корзину
- `getAll(): IProduct[]` — возвращает все товары в корзине
- `removeItem(productId: string): void` — удаляет товар из корзины по ID
- `clear(): void` — очищает корзину
- `getTotal(): number` — возвращает общую стоимость товаров в корзине
- `getCount(): number` — возвращает количество товаров в корзине
- `hasProduct(productId: string): boolean` — проверяет наличие товара в корзине

---

#### Класс Buyer
Зона ответственности: хранение данных пользователя при оформлении заказа.

**Поля:**
- `private data: IBuyer` — объект с данными покупателя

**Методы:**
- `setEmail(email: string): void` — устанавливает email покупателя
- `setPhone(phone: string): void` — устанавливает телефон покупателя
- `setAddress(address: string): void` — устанавливает адрес доставки
- `setPayment(payment: TPayment): void` — устанавливает способ оплаты
- `getBuyer(): IBuyer` — возвращает данные покупателя
- `save(partial: Partial<IBuyer>): void` — сохраняет частичные данные покупателя
- `clear(): void` — очищает данные покупателя
- `validate(): Record<string, string>` — валидирует данные покупателя и возвращает объект с ошибками
- `isValid(): boolean` — проверяет валидность данных покупателя

---

#### Класс ApiService
Зона ответственности: реализует прикладной уровень работы с API. Наследуется от базового класса Api и предоставляет конкретные методы для взаимодействия с сервером интернет-магазина «Web-Larёk».

**Конструктор:**
`constructor(baseUrl: string, cdnUrl: string)` — создает экземпляр ApiService с базовым URL API и CDN

**Методы класса:**
- `getProducts(): Promise<IProduct[]>` — получает список всех товаров с сервера
- `getProductById(id: string): Promise<IProduct>` — получает информацию о конкретном товаре по ID
- `createOrder(order: IOrderPayload): Promise<object>` — отправляет заказ на сервер для обработки
- `getCdnUrl(path: string): string` — формирует полный URL для доступа к ресурсам CDN

**Пример использования:**

```typescript
const apiService = new ApiService(API_URL, CDN_URL);

// Получение товаров
const products = await apiService.getProducts();

// Отправка заказа
const result = await apiService.createOrder(orderPayload);
```

---

## Пример объекта ошибок валидации:

```typescript
{
  payment: 'Не выбран вид оплаты',
  email: 'Укажите емэйл'
}
```