import { Component } from '../base/Component.ts';
import { IEvents } from '../base/Events.ts';
import { ensureElement, cloneTemplate } from '../../utils/utils.ts';
import { CardBasket } from '../View/Cards/CardBasket.ts';

interface IBasket {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasket> {
  protected listElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    
    this.listElement = ensureElement<HTMLElement>('.basket__list', container);
    this.priceElement = ensureElement<HTMLElement>('.basket__price', container);
    this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', container);

    this.basketButton.addEventListener('click', () => {
      console.log('Кнопка оформления заказа нажата');
      this.events.emit('basket:ready');
    });
  }

  set items(elements: HTMLElement[]) {
    if (elements.length === 0) {
      this.listElement.innerHTML = '<div>Корзина пуста</div>';
      this.listElement.classList.add('basket__list_empty');
      this.basketButton.disabled = true;
    } else {
      this.listElement.replaceChildren(...elements);
      this.listElement.classList.remove('basket__list_empty');
      this.basketButton.disabled = false;
    }
  }

  set total(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }

  render() {
    return this.container;
  }

  public prepareItems(products: any[], events: IEvents, cardBasketTempl: HTMLTemplateElement, totalPrice: number) {
    const items = products.map((item, index) => {
      const card = new CardBasket(events, cloneTemplate(cardBasketTempl));
      card.index = index + 1;
      return card.render(item);
    });
    this.items = items;
    this.total = totalPrice;
  }
}
