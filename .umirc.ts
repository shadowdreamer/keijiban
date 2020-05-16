import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [
    { exact: true, path: '/', component: 'index' },
    { exact: true, path: '/post/:id', component: 'post' },
  ],
});
