import {
  ContainerElement,
  ElementSelector,
  SimpleElement,
  StringMatcher,
  TextElement,
} from '@lowgular/testgular';

export interface UIReportImageListItemSelectorsModel {
  readonly content: ElementSelector;
  readonly text: ElementSelector;
  readonly perfect: ElementSelector;
  readonly rejected: ElementSelector;
  readonly score: ElementSelector;
}

export class UIReportImageListItemElement extends ContainerElement {
  private _selectors: UIReportImageListItemSelectorsModel;

  private get content(): ContainerElement {
    return this.elementLocator.locateChild(
      ContainerElement,
      this._selectors.content
    );
  }

  private get text(): TextElement {
    return this.elementLocator.locateChild(TextElement, this._selectors.text);
  }

  private get perfect(): SimpleElement {
    return this.elementLocator.locateChild(
      SimpleElement,
      this._selectors.perfect
    );
  }

  private get rejected(): SimpleElement {
    return this.elementLocator.locateChild(
      SimpleElement,
      this._selectors.rejected
    );
  }

  private get score(): SimpleElement {
    return this.elementLocator.locateChild(
      SimpleElement,
      this._selectors.score
    );
  }

  async selectElement(): Promise<void> {
    await this.click();
  }

  async getLink(): Promise<string> {
    return await this.content.getAttribute('href');
  }

  async expectSelection() {
    return await this.content.expectAttribute(
      'class',
      StringMatcher.mustContainWords(['lp-side-menu-tab-selected'])
    );
  }

  set selectors(selectors: UIReportImageListItemSelectorsModel) {
    this._selectors = selectors;
  }
}
