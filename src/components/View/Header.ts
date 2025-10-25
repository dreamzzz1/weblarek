import { Component } from '../base/Component.ts';
import { IEvents } from '../base/Events.ts';
import { ensureElement } from '../../utils/utils.ts';



interface IHeader {
  counter: number;
}

//Шапка
export class Header extends Component<IHeader> {
  protected basketButton: HTMLButtonElement;
  protected counterElement: HTMLElement;

  // Конструктор принимает объект событий и контейнер компонента
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container); 

    // Находим необходимые элементы внутри контейнера
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);

    // Добавляем обработчик на кнопку корзины
    this.basketButton.addEventListener('click',
      () => this.events.emit('basket:open'));
  }


  set counter(value: number) {
    // Отображаем текущее количество товаров в элементе
    this.counterElement.textContent = value.toString();
  }
}


