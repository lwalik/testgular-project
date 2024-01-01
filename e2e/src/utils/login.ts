import { ElementLocator, Router, cssSelector } from '@lowgular/testgular';
import { LoginFormElement } from '../elements/login-form';
import { CredentialsModel } from '../shared/app-config';
import { ROUTES } from '../shared/routes';

export const login = async (
  router: Router,
  elementLocator: ElementLocator,
  credentials: CredentialsModel
) => {
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
    login: credentials.login,
    password: credentials.password,
  });
  await loginForm.submit();
};
