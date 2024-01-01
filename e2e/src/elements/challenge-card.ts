import { ContainerElement, ElementSelector } from '@lowgular/testgular';

export class ChallengeCardElement extends ContainerElement {
  private _selector: ElementSelector;

  //   private get cardList(): {};

  set selector(selector: ElementSelector) {
    this._selector = selector;
  }
}
