import { defineConfig } from 'umi';
import { preference } from './preference.config';
import routes from './routes';

const config = defineConfig({
  layout: {
    ...preference,
  },
  theme: {
    'root-entry-name': 'variable',
  },
  routes,
});

export default config;
