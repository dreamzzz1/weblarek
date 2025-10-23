import type { IApi, IApiProductsResponse, IOrderPayload } from '../types';
import { API_URL } from '../utils/constants';

export class ApiService implements IApi {
  constructor(
    private baseUrl: string = API_URL,
    private options: RequestInit = {}
  ) {}

  private async request<T>(uri: string, options: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${uri}`;
    console.log(`[API] ${options.method || 'GET'}: ${url}`);

    try {
      const response = await fetch(url, {
        ...this.options,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...this.options.headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}. Ответ: ${text}`);
      }

      try {
        return await response.json();
      } catch {
        throw new Error(`Ошибка парсинга JSON: ${url}`);
      }
    } catch (error) {
      throw new Error(`Ошибка сети или запроса: ${(error as Error).message}`);
    }
  }

  public get<T>(uri: string): Promise<T> {
    return this.request<T>(uri, { method: 'GET' });
  }

  public post<T>(uri: string, data: object, method: 'POST' | 'PUT' | 'DELETE' = 'POST'): Promise<T> {
    return this.request<T>(uri, { method, body: JSON.stringify(data) });
  }

  /** Получение списка товаров */
  public getProducts(): Promise<IApiProductsResponse> {
    return this.get<IApiProductsResponse>('/product/');
  }

  /** Отправка заказа */
  public sendOrder(data: IOrderPayload): Promise<object> {
    return this.post<object>('/order', data);
  }
}
