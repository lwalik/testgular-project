import {
  App,
  ElementLocator,
  Router,
  StringMatcher,
  cssSelector,
  it,
} from '@lowgular/testgular';
import { PipelineAccordionItemElement } from 'e2e/src/elements/pipeline-accordion-item';
import { APP_CONFIG, USER_CREDENTIALS } from 'e2e/src/shared/app-config';
import { BACKGROUND_COLORS } from 'e2e/src/shared/colors';
import { ROUTES } from 'e2e/src/shared/routes';
import { PIPELINE_STATUS } from 'e2e/src/shared/statuses';
import { login } from 'e2e/src/utils/login';

// it('First item should be open on start', APP_CONFIG, async (app: App) => {
//   const completedChallengeId: string = '7sPPkGGggbTsHR31qAY0';
//   const router = app.inject(Router);
//   const el = app.inject(ElementLocator);
//   await login(router, el, USER_CREDENTIALS);

//   await app.waitForTimeout(2000);
//   await router.navigateAndWait(
//     `${ROUTES.PUBLISHED_CHALLENGE}/${completedChallengeId}`
//   );
//   await app.waitForTimeout(10000);
//   const accordion = el.locateList(
//     PipelineAccordionItemElement,
//     cssSelector('.accordion-item')
//   );
//   const firstItem = await accordion.getNthElement(0);
//   firstItem.selectors = {
//     header: cssSelector('.accordion-header'),
//     headerText: cssSelector(
//       StringMatcher.mustContainWords(['Solution', 'with', 'id'])
//     ),
//     status: cssSelector('lib-pipeline-status'),
//     body: cssSelector('.accordion-body'),
// pipeline: cssSelector('lib-pipeline-run-details')
//   };
//   await firstItem.expectBodyVisible(true);
// });

// it('Item should be close after click', APP_CONFIG, async (app: App) => {
//   const completedChallengeId: string = '7sPPkGGggbTsHR31qAY0';
//   const router = app.inject(Router);
//   const el = app.inject(ElementLocator);
//   await login(router, el, USER_CREDENTIALS);

//   await app.waitForTimeout(2000);
//   await router.navigateAndWait(
//     `${ROUTES.PUBLISHED_CHALLENGE}/${completedChallengeId}`
//   );
//   await app.waitForTimeout(10000);
//   const accordion = el.locateList(
//     PipelineAccordionItemElement,
//     cssSelector('.accordion-item')
//   );
//   const firstItem = await accordion.getNthElement(0);
//   firstItem.selectors = {
//     header: cssSelector('.accordion-header'),
//     headerText: cssSelector(
//       StringMatcher.mustContainWords(['Solution', 'with', 'id'])
//     ),
//     status: cssSelector('lib-pipeline-status'),
//     body: cssSelector('.accordion-body'),
// pipeline: cssSelector('lib-pipeline-run-details')
//   };
//   await firstItem.toggle();
//   await app.waitForTimeout(1000);
//   await firstItem.expectBodyVisible(false);
// });

// it('Pipeline should be displayed', APP_CONFIG, async (app: App) => {
//   const completedChallengeId: string = '7sPPkGGggbTsHR31qAY0';
//   const router = app.inject(Router);
//   const el = app.inject(ElementLocator);
//   await login(router, el, USER_CREDENTIALS);

//   await app.waitForTimeout(2000);
//   await router.navigateAndWait(
//     `${ROUTES.PUBLISHED_CHALLENGE}/${completedChallengeId}`
//   );
//   await app.waitForTimeout(10000);
//   const accordion = el.locateList(
//     PipelineAccordionItemElement,
//     cssSelector('.accordion-item')
//   );
//   await accordion.forEachChild(async (item) => {
//     item.selectors = {
//       header: cssSelector('.accordion-header'),
//       headerText: cssSelector(
//         StringMatcher.mustContainWords(['Solution', 'with', 'id'])
//       ),
//       status: cssSelector('lib-pipeline-status'),
//       body: cssSelector('.accordion-body'),
//       pipeline: cssSelector('lib-pipeline-run-details'),
//     };
//     const isOpen: boolean = await item.isBodyVisible();
//     if (isOpen) {
//       await item.expectPipelineVisible(true);
//     } else {
//       await item.expectPipelineVisible(false);
//     }
//   });
// });

// it('Pipeline Status should be displayed', APP_CONFIG, async (app: App) => {
//   const completedChallengeId: string = '7sPPkGGggbTsHR31qAY0';
//   const router = app.inject(Router);
//   const el = app.inject(ElementLocator);
//   await login(router, el, USER_CREDENTIALS);

//   await app.waitForTimeout(2000);
//   await router.navigateAndWait(
//     `${ROUTES.PUBLISHED_CHALLENGE}/${completedChallengeId}`
//   );
//   await app.waitForTimeout(10000);
//   const accordion = el.locateList(
//     PipelineAccordionItemElement,
//     cssSelector('.accordion-item')
//   );
//   await accordion.forEachChild(async (item) => {
//     item.selectors = {
//       header: cssSelector('.accordion-header'),
//       headerText: cssSelector(
//         StringMatcher.mustContainWords(['Solution', 'with', 'id'])
//       ),
//       status: cssSelector('lib-pipeline-status'),
//       body: cssSelector('.accordion-body'),
//       pipeline: cssSelector('lib-pipeline-run-details'),
//     };
//     await item.expectStatusVisible(true);
//   });
// });

it(
  'Pipeline Status color should depends on status value',
  APP_CONFIG,
  async (app: App) => {
    const completedChallengeId: string = '7sPPkGGggbTsHR31qAY0';
    const pipelineStatusColorMap: Record<PIPELINE_STATUS, BACKGROUND_COLORS> = {
      [PIPELINE_STATUS.ACCEPTED]: BACKGROUND_COLORS.GREEN,
      [PIPELINE_STATUS.REJECTED]: BACKGROUND_COLORS.RED,
      [PIPELINE_STATUS.SCHEDULED]: BACKGROUND_COLORS.GRAY,
      [PIPELINE_STATUS.RUNNING]: BACKGROUND_COLORS.GRAY,
    };
    const router = app.inject(Router);
    const el = app.inject(ElementLocator);
    await login(router, el, USER_CREDENTIALS);

    await app.waitForTimeout(2000);
    await router.navigateAndWait(
      `${ROUTES.PUBLISHED_CHALLENGE}/${completedChallengeId}`
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
      const statusText = await item.getStatusText();
      // TODO sprawdzic i pobrac kolor
    });
  }
);
