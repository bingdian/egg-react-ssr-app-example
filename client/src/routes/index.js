import Loadable from '@loadable/component';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "home" */ '../pages/Home')),
  },

  {
    path: '/about',
    name: 'About',
    component: Loadable(/* #__LOADABLE__ */ () => import(/* webpackChunkName: "about" */ '../pages/About')),
  },
];

export default routes;
