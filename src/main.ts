import './scss/styles.scss';
import './scss/styles.scss';
import { Products } from 'C:/Users/mora/Desktop/NewWEBLarek/weblarek/src/components/base/models/Products.ts';
import { Cart } from 'C:/Users/mora/Desktop/NewWEBLarek/weblarek/src/components/base/models/Cart.ts';
import { Buyer } from 'C:/Users/mora/Desktop/NewWEBLarek/weblarek/src/components/base/models/Buyer.ts';
import { ApiService } from './api/ApiService';

async function runDemo() {
	console.log('=== Запуск demo моделей данных ===');

	const productsModel = new Products();
	const cartModel = new Cart();
	const buyerModel = new Buyer();
	const api = new ApiService('https://fakestoreapi.com');

	console.log('Запрос списка товаров...');
	const data = await api.getProducts();
	productsModel.setProducts(data.items || []);

	console.log('Товары из API:', productsModel.getAll());

	const firstProduct = productsModel.getAll()[0];
	if (firstProduct) {
		cartModel.addProduct(firstProduct);
		console.log('Добавлен товар в корзину:', firstProduct.title);
	}

	console.log('Содержимое корзины:', cartModel.getAll());
	console.log('Общая сумма корзины:', cartModel.getTotal());

	buyerModel.setEmail('test@example.com');
	buyerModel.setPhone('+123456789');
	buyerModel.setAddress('Test Street 123');
	buyerModel.setPayment('card');

	const order = {
		buyer: buyerModel.getBuyer(),
		products: cartModel.getAll(),
		total: cartModel.getTotal(),
	};

	console.log('Отправка заказа:', order);
	const orderResponse = await api.sendOrder(order);
	console.log('Ответ сервера:', orderResponse);
}

runDemo().catch(console.error);
