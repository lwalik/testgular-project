import { ContainerElement, cssSelector } from '@lowgular/testgular';

export class CardElement extends ContainerElement {
  readonly selector = cssSelector('.card');
}
