import { defineConfig } from 'umi';
import { layout } from './plugin.config';
import routes from './routes';

const config = defineConfig({
  layout,
  routes,
});

export default config;


