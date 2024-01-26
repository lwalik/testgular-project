// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export interface CredentialsModel {
  readonly login: string;
  readonly password: string;
}

export interface UserChallengeDataModel {
  readonly completedChallengeId: string;
  readonly challengeSolutionId: string;
  readonly uiReportId: string;
}

export const USER_CREDENTIALS: CredentialsModel = JSON.parse(
  process.env.USER_CREDENTIALS
);

export const ADMIN_CREDENTIALS: CredentialsModel = JSON.parse(
  process.env.ADMIN_CREDENTIALS
);

export const USER_CHALLENGE_DATA: UserChallengeDataModel = JSON.parse(
  process.env.USER_CHALLENGE_DATA
);

const APP_URL = process.env['APP_URL'];

export const APP_CONFIG = {
  appUrl: APP_URL,
  routes: {},
  module: {},
};
