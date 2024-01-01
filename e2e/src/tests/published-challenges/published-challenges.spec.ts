import { App, ElementLocator, Router, it } from '@lowgular/testgular';
import { APP_CONFIG } from 'e2e/src/shared/app-config';
import { ROUTES } from 'e2e/src/shared/routes';
import { login } from 'e2e/src/utils/login';

it('Cards should be displayed', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);
  await login(router, el);

  await app.waitForTimeout(1000);
  await router.navigateAndWait(ROUTES.CHALLENGES);
});
