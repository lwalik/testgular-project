import {
  ContainerElement,
  ElementSelector,
  SimpleElement,
  TextElement,
} from '@lowgular/testgular';

export interface BadgeSelectorsModel {
  readonly text: ElementSelector;
  readonly icon?: ElementSelector;
}

export class BadgeElement extends ContainerElement {
  private _selectors: BadgeSelectorsModel;

  private get text(): TextElement {
    return this.elementLocator.locateChild(TextElement, this._selectors.text);
  }

  private get icon(): SimpleElement {
    return this.elementLocator.locateChild(SimpleElement, this._selectors.icon);
  }

  set selectors(selectors: BadgeSelectorsModel) {
    this._selectors = selectors;
  }

  async expectText(text: string) {
    await this.text.expectContent(text);
  }

  async expectIconClass(cls: string) {
    await this.icon.expectAttribute('class', cls);
  }
}
