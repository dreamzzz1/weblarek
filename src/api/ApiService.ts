import { Api } from '../components/base/Api';
import type { IApi, IApiProductsResponse, IOrderPayload } from '../types';
import { API_URL } from '../utils/constants';


export class ApiService extends Api implements IApi {
  constructor(baseUrl: string = API_URL, options: RequestInit = {}) {
    super(baseUrl, options);
  }

  public getProducts(): Promise<IApiProductsResponse> {
    return this.get<IApiProductsResponse>('/product/');
  }

  public sendOrder(data: IOrderPayload): Promise<object> {
    return this.post<object>('/order', data);
  }
}

