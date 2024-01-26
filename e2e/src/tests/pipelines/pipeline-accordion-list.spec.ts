import {
  App,
  ElementLocator,
  Router,
  StringMatcher,
  cssSelector,
  it,
} from '@lowgular/testgular';
import { PipelineAccordionItemElement } from 'e2e/src/elements/pipeline-accordion-item';
import {
  APP_CONFIG,
  USER_CHALLENGE_DATA,
  USER_CREDENTIALS,
} from 'e2e/src/shared/app-config';
import { ROUTES } from 'e2e/src/shared/routes';
import { login } from 'e2e/src/utils/login';

it('First item should be open on start', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);
  await login(router, el, USER_CREDENTIALS);

  await app.waitForTimeout(2000);
  await router.navigateAndWait(
    `${ROUTES.USER_PUBLISHED_CHALLENGE}/${USER_CHALLENGE_DATA.completedChallengeId}/${ROUTES.MY_SOLUTIONS}`
  );
  await app.waitForTimeout(10000);
  const accordion = el.locateList(
    PipelineAccordionItemElement,
    cssSelector('.accordion-item')
  );
  const firstItem = await accordion.getNthElement(0);
  firstItem.selectors = {
    header: cssSelector('.accordion-header'),
    headerText: cssSelector(
      StringMatcher.mustContainWords(['Solution', 'with', 'id'])
    ),
    status: cssSelector('lib-pipeline-status'),
    body: cssSelector('.accordion-body'),
    pipeline: cssSelector('lib-pipeline-run-details'),
  };
  await firstItem.expectBodyVisible(true);
});

it('Item should be close after click', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);
  await login(router, el, USER_CREDENTIALS);

  await app.waitForTimeout(2000);
  await router.navigateAndWait(
    `${ROUTES.USER_PUBLISHED_CHALLENGE}/${USER_CHALLENGE_DATA.completedChallengeId}/${ROUTES.MY_SOLUTIONS}`
  );
  await app.waitForTimeout(10000);
  const accordion = el.locateList(
    PipelineAccordionItemElement,
    cssSelector('.accordion-item')
  );
  const firstItem = await accordion.getNthElement(0);
  firstItem.selectors = {
    header: cssSelector('.accordion-header'),
    headerText: cssSelector(
      StringMatcher.mustContainWords(['Solution', 'with', 'id'])
    ),
    status: cssSelector('lib-pipeline-status'),
    body: cssSelector('.accordion-body'),
    pipeline: cssSelector('lib-pipeline-run-details'),
  };
  await firstItem.toggle();
  await app.waitForTimeout(1000);
  await firstItem.expectBodyVisible(false);
});

it('Pipeline should be displayed', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);
  await login(router, el, USER_CREDENTIALS);

  await app.waitForTimeout(2000);
  await router.navigateAndWait(
    `${ROUTES.USER_PUBLISHED_CHALLENGE}/${USER_CHALLENGE_DATA.completedChallengeId}/${ROUTES.MY_SOLUTIONS}`
  );
  await app.waitForTimeout(10000);
  const accordion = el.locateList(
    PipelineAccordionItemElement,
    cssSelector('.accordion-item')
  );
  await accordion.forEachChild(async (item) => {
    item.selectors = {
      header: cssSelector('.accordion-header'),
      headerText: cssSelector(
        StringMatcher.mustContainWords(['Solution', 'with', 'id'])
      ),
      status: cssSelector('lib-pipeline-status'),
      body: cssSelector('.accordion-body'),
      pipeline: cssSelector('lib-pipeline-run-details'),
    };
    const isOpen: boolean = await item.isBodyVisible();
    if (isOpen) {
      await item.expectPipelineVisible(true);
    } else {
      await item.expectPipelineVisible(false);
    }
  });
});

it('Pipeline Status should be displayed', APP_CONFIG, async (app: App) => {
  const router = app.inject(Router);
  const el = app.inject(ElementLocator);
  await login(router, el, USER_CREDENTIALS);

  await app.waitForTimeout(2000);
  await router.navigateAndWait(
    `${ROUTES.USER_PUBLISHED_CHALLENGE}/${USER_CHALLENGE_DATA.completedChallengeId}/${ROUTES.MY_SOLUTIONS}`
  );
  await app.waitForTimeout(10000);
  const accordion = el.locateList(
    PipelineAccordionItemElement,
    cssSelector('.accordion-item')
  );
  await accordion.forEachChild(async (item) => {
    item.selectors = {
      header: cssSelector('.accordion-header'),
      headerText: cssSelector(
        StringMatcher.mustContainWords(['Solution', 'with', 'id'])
      ),
      status: cssSelector('lib-pipeline-status'),
      body: cssSelector('.accordion-body'),
      pipeline: cssSelector('lib-pipeline-run-details'),
    };
    await item.expectStatusVisible(true);
  });
});
