import './scss/styles.scss';
import { Products } from './components/base/models/Products';
import { Cart } from './components/base/models/Cart';
import { Buyer } from './components/base/models/Buyer';
import { ApiService } from './api/ApiService';
import { IOrderPayload, TPayment } from './types';

async function runDemo() {
  console.log('=== Запуск demo моделей данных ===');

  const productsModel = new Products();
  const cartModel = new Cart();
  const buyerModel = new Buyer();
  const api = new ApiService();

  // Загрузка списка товаров
  try {
    console.log('Запрос списка товаров...');
    const data = await api.getProducts();
    productsModel.setProducts(data.items || []);
    console.log('Товары из API:', productsModel.getAll());
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error);
    return;
  }

  // Добавляем первый товар в корзину
  const firstProduct = productsModel.getAll()[0];
  if (firstProduct) {
    cartModel.addProduct(firstProduct);
    console.log('Добавлен товар в корзину:', firstProduct.title);
  }

  console.log('Содержимое корзины:', cartModel.getAll());
  console.log('Общая сумма корзины:', cartModel.getTotal());

  // Настройка покупателя
  buyerModel.setEmail('test@example.com');
  buyerModel.setPhone('+123456789');
  buyerModel.setAddress('Test Street 123');

  // Устанавливаем способ оплаты
  const paymentMethod: TPayment = 'card';
  buyerModel.setPayment(paymentMethod);

  // Проверка валидации покупателя
  const errors = buyerModel.validate();
  if (Object.keys(errors).length > 0) {
    console.warn('Ошибки валидации покупателя:', errors);
    return;
  }

  // Формируем заказ
const buyerData = buyerModel.getBuyer();

if (!buyerData.payment) {
  console.error('Способ оплаты не выбран!');
  return;
}

const order = {
  payment: "online", 
  email: buyerData.email,
  phone: buyerData.phone,
  address: buyerData.address,
  total: cartModel.getTotal(),
  items: cartModel.getAll().map(p => p.id)
};



console.log('Отправляемый заказ:', JSON.stringify(order, null, 2));




console.log('Отправка заказа:', order);

try {
  const orderResponse = await api.sendOrder(order as any);
  console.log('Ответ сервера:', orderResponse);
} catch (error) {
  console.error('Ошибка при отправке заказа:', error);
}

}

runDemo();
