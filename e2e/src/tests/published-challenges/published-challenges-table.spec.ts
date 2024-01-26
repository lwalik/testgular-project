import {
  App,
  ButtonElement,
  ContainerElement,
  ElementLocator,
  NumberMatcher,
  Router,
  StringMatcher,
  TextElement,
  cssSelector,
  it,
  textSelector,
} from '@lowgular/testgular';
import { ADMIN_CREDENTIALS, APP_CONFIG } from 'e2e/src/shared/app-config';
import { ROUTES } from 'e2e/src/shared/routes';
import { login } from 'e2e/src/utils/login';

it('Table should be displayed', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);
  await login(router, el, ADMIN_CREDENTIALS);

  await app.waitForTimeout(1000);
  await router.navigateAndWait(ROUTES.CHALLENGES);
  await app.waitForTimeout(4000);

  const table = el.locateChild(
    ContainerElement,
    cssSelector('lib-table-of-all-published-challenges')
  );
  const expectedHeadersData = ['#', 'Name', 'Solution Count', 'Action'];
  const headerRows = table.elementLocator.locateTableRows(
    TextElement,
    cssSelector('thead tr')
  );
  await headerRows.expectToHaveLength(1);
  const headerRow = await headerRows.getNthElement(0);
  await headerRow.expectToHaveLength(expectedHeadersData.length);
  await headerRow.forEachColumn(async (col, cI) => {
    await col.expectContent(expectedHeadersData[cI]);
  });

  const rows = table.elementLocator.locateTableRows(
    ContainerElement,
    cssSelector('tbody tr')
  );

  const rowTemplate = [
    NumberMatcher.positive(),
    new RegExp('^\\s*[A-Z].*'),
    NumberMatcher.unsigned(),
  ];

  await rows.forEachChild(async (row) => {
    await row.forEachColumn(async (col, cI) => {
      if (cI < 3) {
        await col.expectContent(rowTemplate[cI]);
      } else {
        const buttons = col.elementLocator.locateList(
          ButtonElement,
          cssSelector('button')
        );
        await buttons.expectToHaveLength(2);
      }
    });
  });
});

it('Should be redirect to detail', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);
  await login(router, el, ADMIN_CREDENTIALS);

  await app.waitForTimeout(1000);
  await router.navigateAndWait(ROUTES.CHALLENGES);
  await app.waitForTimeout(4000);

  const table = el.locateChild(
    ContainerElement,
    cssSelector('lib-table-of-all-published-challenges')
  );
  const rows = table.elementLocator.locateTableRows(
    ContainerElement,
    cssSelector('tbody tr')
  );
  const firstRow = await rows.getNthElement(0);
  const actionButtons = await firstRow.getNthColumn(3);
  const viewBtn = actionButtons.elementLocator.locateChild(
    ButtonElement,
    textSelector('View')
  );
  await viewBtn.click();
  await router.expectAndWaitForUrl(
    StringMatcher.mustContainWords([ROUTES.ADMIN_PUBLISHED_CHALLENGE])
  );
});
