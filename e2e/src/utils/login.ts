import { ElementLocator, Router, cssSelector } from '@lowgular/testgular';
import { LoginFormElement } from '../elements/login-form';
import { USER_CREDENTIALS } from '../shared/app-config';
import { ROUTES } from '../shared/routes';

export const login = async (router: Router, elementLocator: ElementLocator) => {
  await router.navigateAndWait(ROUTES.LOGIN);

  const loginForm = elementLocator.locateChild(
    LoginFormElement,
    cssSelector('.card')
  );
  loginForm.selectors = {
    login: cssSelector('input[type="email"]'),
    password: cssSelector('input[type="password"]'),
    submit: cssSelector('button[type="submit"]'),
  };

  await loginForm.setValue({
    login: USER_CREDENTIALS.login,
    password: USER_CREDENTIALS.password,
  });
  await loginForm.submit();
};
