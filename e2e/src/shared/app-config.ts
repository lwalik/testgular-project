// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const USER_CREDENTIALS: { login: string; password: string } = JSON.parse(
  process.env.USER_CREDENTIALS
);

export const ADMIN_CREDENTIALS: { login: string; password: string } =
  JSON.parse(process.env.ADMIN_CREDENTIALS);

const APP_URL = process.env['APP_URL'];

export const APP_CONFIG = {
  appUrl: APP_URL,
  routes: {},
  module: {},
};
