import { IApi, IApiProductsResponse, IOrderPayload } from '../types';

export class ApiService implements IApi {
	constructor(private baseUrl: string, private options: RequestInit = {}) {}

	async get<T>(uri: string): Promise<T> {
		const response = await fetch(`${this.baseUrl}${uri}`, {
			...this.options,
			method: 'GET',
		});
		return this.handleResponse<T>(response);
	}

	async post<T>(uri: string, data: object, method: 'POST' | 'PUT' | 'DELETE' = 'POST'): Promise<T> {
		const response = await fetch(`${this.baseUrl}${uri}`, {
			...this.options,
			method,
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				...this.options.headers,
			},
		});
		return this.handleResponse<T>(response);
	}

	protected async handleResponse<T>(response: Response): Promise<T> {
		if (!response.ok) {
			throw new Error(`Ошибка запроса: ${response.status}`);
		}
		return response.json();
	}

	// пример методов для конкретных запросов
	getProducts(): Promise<IApiProductsResponse> {
		return this.get('/products');
	}

	sendOrder(data: IOrderPayload): Promise<object> {
		return this.post('/order', data);
	}
}
