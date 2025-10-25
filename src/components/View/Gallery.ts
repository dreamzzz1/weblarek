import { Component } from '../base/Component.ts';
import { ensureElement } from '../../utils/utils.ts';


interface IGallery {
  catalog: HTMLElement[];
}

// Галерея товаров
export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;

  constructor(container?: HTMLElement) {
    super(container || ensureElement<HTMLElement>('.gallery')); 
    this.catalogElement = this.container; 
  }

  set catalog(items: HTMLElement[]) {
    // Заменяем текущее содержимое контейнера новыми карточками товаров
    this.catalogElement.replaceChildren(...items);
  }
}
