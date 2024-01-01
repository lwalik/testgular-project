// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export interface CredentialsModel {
  login: string;
  password: string;
}

export const USER_CREDENTIALS: CredentialsModel = JSON.parse(
  process.env.USER_CREDENTIALS
);

export const ADMIN_CREDENTIALS: CredentialsModel = JSON.parse(
  process.env.ADMIN_CREDENTIALS
);

const APP_URL = process.env['APP_URL'];

export const APP_CONFIG = {
  appUrl: APP_URL,
  routes: {},
  module: {},
};
