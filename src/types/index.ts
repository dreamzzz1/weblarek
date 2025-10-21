export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// тип оплаты
export type TPayment = 'card' | 'cash';

// интерфейс товара
export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	category: string;
	price: number | null;
}

// интерфейс данных покупателя
export interface IBuyer {
	email: string;
	phone: string;
	address: string;
	payment: TPayment | null;
}

// ответ сервера с товарами
export interface IApiProductsResponse {
	items: IProduct[];
}

// объект, отправляемый на сервер при заказе
export interface IOrderPayload {
	buyer: IBuyer;
	products: IProduct[];
	total: number;
}
