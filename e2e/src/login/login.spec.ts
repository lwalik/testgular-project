import { App, Router, it } from '@lowgular/testgular';
import { APP_CONFIG } from '../shared/app-config';
import { ROUTES } from '../shared/routes';

it(
  'Should be redirected from home page to login page',
  APP_CONFIG,
  async (app: App) => {
    const router = app.inject(Router);
    await router.expectGuardRedirect(ROUTES.HOME, ROUTES.LOGIN);
  }
);
