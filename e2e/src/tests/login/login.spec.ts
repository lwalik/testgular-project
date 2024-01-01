import {
  App,
  ElementLocator,
  Router,
  StringMatcher,
  cssSelector,
  describe,
  it,
  textSelector,
} from '@lowgular/testgular';
import { LoginFormElement } from '../../elements/login-form';
import { APP_CONFIG, USER_CREDENTIALS } from '../../shared/app-config';
import { ROUTES } from '../../shared/routes';

it(
  'Should be redirected from Home Page to Login Page',
  APP_CONFIG,
  async (app: App) => {
    const router = app.inject(Router);
    await router.expectGuardRedirect(ROUTES.HOME, ROUTES.LOGIN);
  }
);

it('Should be logged in', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);
  await router.navigateAndWait(ROUTES.LOGIN);

  const loginForm = el.locateChild(LoginFormElement, cssSelector('.card'));
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
});

it('Should be required', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigateAndWait(ROUTES.LOGIN);
  const loginForm = el.locateChild(LoginFormElement, cssSelector('.card'));
  loginForm.selectors = {
    login: cssSelector('input[type="email"]'),
    password: cssSelector('input[type="password"]'),
    submit: cssSelector('button[type="submit"]'),
  };

  await loginForm.expectRequired({
    type: 'class',
    value: StringMatcher.mustContainWords(['is-invalid']),
  });
});

it('Invalid Email alert should be visible', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);

  await router.navigateAndWait(ROUTES.LOGIN);

  const loginForm = el.locateChild(LoginFormElement, cssSelector('.card'));
  loginForm.selectors = {
    login: cssSelector('input[type="email"]'),
    password: cssSelector('input[type="password"]'),
    submit: cssSelector('button[type="submit"]'),
  };
  loginForm.alertSelector = textSelector(
    StringMatcher.mustContainWords(['Invalid', 'Email'])
  );

  await loginForm.expectAlertVisible(false);
  await loginForm.setValue({ login: 'wrong email', password: '' });
  await loginForm.expectAlertVisible(true);
});

describe('Login button should be disabled', () => {
  [
    {
      when: {
        login: USER_CREDENTIALS.login,
        password: USER_CREDENTIALS.password,
      },
      then: {
        isDisabled: false,
      },
    },
    {
      when: {
        login: USER_CREDENTIALS.login,
        password: '',
      },
      then: {
        isDisabled: true,
      },
    },
    {
      when: {
        login: '',
        password: '',
      },
      then: {
        isDisabled: true,
      },
    },
    {
      when: {
        login: 'wrong email',
        password: 'password',
      },
      then: {
        isDisabled: true,
      },
    },
  ].forEach(({ when, then }, idx) => {
    it(`${idx + 1}`, APP_CONFIG, async (app: App) => {
      const router = app.inject(Router);
      const el = app.inject(ElementLocator);
      await router.navigateAndWait(ROUTES.LOGIN);

      const loginForm = el.locateChild(LoginFormElement, cssSelector('.card'));
      loginForm.selectors = {
        login: cssSelector('input[type="email"]'),
        password: cssSelector('input[type="password"]'),
        submit: cssSelector('button[type="submit"]'),
      };
      await loginForm.setValue({ login: when.login, password: when.password });
      await loginForm.expectSubmitBtnDisabled(then.isDisabled);
    });
  });
});

it(
  'Should be redirect to Challenges Page after login',
  APP_CONFIG,
  async (app: App) => {
    const router = app.inject(Router);
    const el = app.inject(ElementLocator);
    await router.navigateAndWait(ROUTES.LOGIN);

    const loginForm = el.locateChild(LoginFormElement, cssSelector('.card'));
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

    await router.expectAndWaitForUrl(ROUTES.CHALLENGES);
  }
);
