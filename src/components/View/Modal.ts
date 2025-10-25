import { Component } from '../base/Component.ts';
import { IEvents } from '../base/Events.ts';
import { ensureElement } from '../../utils/utils.ts';

interface IModal {
  content: HTMLElement;
}

// Компонент модального окна
export class Modal extends Component<IModal> {
  protected closeButton: HTMLButtonElement; 
  protected contentElement: HTMLElement;    

  //принимает объект событий
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    // Находим элементы
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);

    // Обработчик клика
    this.closeButton.addEventListener('click', () => this.close());

    // Обработчик клика
    this.container.addEventListener('click', (e: MouseEvent) => {
      if (e.target === this.container) {
        this.close();
      }
    });
  }


  open() {
    this.container.classList.add('modal_active'); 
  }

  close() {
    this.container.classList.remove('modal_active'); 
    this.contentElement.replaceChildren(); 
  }


  set content(element: HTMLElement) {
    this.contentElement.replaceChildren(); 
    this.contentElement.appendChild(element);
  }
}

