// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const CREDENTIALS: { login: string; password: string } = JSON.parse(
  process.env.CREDENTIALS
);

const APP_URL = process.env['APP_URL'];

export const APP_CONFIG = {
  appUrl: APP_URL,
  routes: {},
  module: {},
};
