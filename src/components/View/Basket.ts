import { Component } from '../base/Component.ts';
import { IEvents } from '../base/Events.ts';
import { ensureElement } from '../../utils/utils.ts';

export class Basket extends Component<Basket> { 
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

}