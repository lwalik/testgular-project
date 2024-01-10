import {
  ContainerElement,
  ElementSelector,
  StringMatcher,
  TextElement,
} from '@lowgular/testgular';
import { BACKGROUND_COLORS } from '../shared/colors';
import { BadgeElement } from './badge';

export interface PipelineAccordionItemSelectorsModel {
  readonly header: ElementSelector;
  readonly headerText: ElementSelector;
  readonly status: ElementSelector;
  readonly body: ElementSelector;
  readonly pipeline: ElementSelector;
}

export class PipelineAccordionItemElement extends ContainerElement {
  private _selectors: PipelineAccordionItemSelectorsModel;

  private get header(): ContainerElement {
    return this.elementLocator.locateChild(
      ContainerElement,
      this._selectors.header
    );
  }

  private get headerText(): TextElement {
    return this.elementLocator.locateChild(
      TextElement,
      this._selectors.headerText
    );
  }

  private get status(): BadgeElement {
    return this.elementLocator.locateChild(
      BadgeElement,
      this._selectors.status
    );
  }

  private get body(): ContainerElement {
    return this.elementLocator.locateChild(
      ContainerElement,
      this._selectors.body
    );
  }

  private get pipeline(): ContainerElement {
    return this.elementLocator.locateChild(
      ContainerElement,
      this._selectors.pipeline
    );
  }

  set selectors(selectors: PipelineAccordionItemSelectorsModel) {
    this._selectors = selectors;
  }

  async toggle() {
    await this.header.click();
  }

  async expectBodyVisible(value: boolean) {
    await this.body.expectVisible(value);
  }

  async isBodyVisible(): Promise<boolean> {
    return await this.body.isVisible();
  }

  async expectPipelineVisible(value: boolean) {
    return await this.pipeline.expectVisible(value);
  }

  async expectStatusVisible(value: boolean) {
    return this.status.expectVisible(value);
  }

  async expectStatusColor(color: BACKGROUND_COLORS) {
    console.log('color: ', color);
    await this.status.expectIconClass(StringMatcher.mustContainWords([color]));
  }

  async getStatusText(): Promise<string> {
    return await this.status.getText();
  }
}
