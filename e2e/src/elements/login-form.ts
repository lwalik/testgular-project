import {
  ButtonElement,
  ContainerElement,
  ElementSelector,
  InputFormControl,
  TextElement,
} from '@lowgular/testgular';

export interface LoginFormSelectorsModel {
  login: ElementSelector;
  password: ElementSelector;
  submit: ElementSelector;
}

export class LoginFormElement extends ContainerElement {
  private _selectors: LoginFormSelectorsModel;
  private _alertSelector: ElementSelector;

  private get loginFormControl(): InputFormControl {
    return this.elementLocator.locateChild(
      InputFormControl,
      this._selectors.login
    );
  }

  private get passwordFormControl(): InputFormControl {
    return this.elementLocator.locateChild(
      InputFormControl,
      this._selectors.password
    );
  }

  private get submitBtn(): ButtonElement {
    return this.elementLocator.locateChild(
      ButtonElement,
      this._selectors.submit
    );
  }

  private get alert(): TextElement {
    return this.elementLocator.locateChild(TextElement, this._alertSelector);
  }

  set selectors(selectors: LoginFormSelectorsModel) {
    this._selectors = selectors;
  }

  set alertSelector(selector: ElementSelector) {
    this._alertSelector = selector;
  }

  async setValue(value: { login: string; password: string }) {
    await this.loginFormControl.setValue(value.login);
    await this.passwordFormControl.setValue(value.password);
  }

  async submit() {
    await this.submitBtn.click();
  }

  async expectRequired(expectedAttribute: { type: string; value: string }) {
    // loginFormControl
    await this.loginFormControl.focus();
    await this.loginFormControl.blur();
    await this.loginFormControl.expectAttribute(
      expectedAttribute.type,
      expectedAttribute.value
    );
    // passwordFormControl
    await this.passwordFormControl.focus();
    await this.passwordFormControl.blur();
    await this.passwordFormControl.expectAttribute(
      expectedAttribute.type,
      expectedAttribute.value
    );
  }

  async expectAlertVisible(value: boolean) {
    await this.alert.expectVisible(value);
  }

  async expectSubmitBtnDisabled(value: boolean) {
    await this.submitBtn.expectDisabled(value);
  }
}
