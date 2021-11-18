import 'core-js' // ! ES6 IE 適配
import Vue from 'vue'
import App from './App'
import routes from './router'
import Router from 'vue-router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import i18n from './lang'

Vue.use(Router)
Vue.use(ViewUI)

let isPhone = false;

(function () {
  const device = navigator.userAgent
  if (device.includes('Mobile')) {
    isPhone = true
  }
}
)()

export const defaultRoute = isPhone ? routes.defaultRoutesMobile : routes.defaultRoutes

const router = new Router({
  base: '',
  routes: defaultRoute
})

// 避免報Uncaught (in promise) NavigationDuplicated
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export const allRoutes = (function () {
  const rawRoutes = []
  rawRoutes.push(defaultRoute[0].path)
  defaultRoute[0].children.forEach(route => {
    rawRoutes.push(route.path)
  })
  return rawRoutes
})()

router.beforeEach((to, from, next) => {
  if (allRoutes.includes(to.path)) {
    next()
  } else {
    if (isPhone) {
      next('/mobile/index')
    } else {
      next('/index')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  // template: '<App/>'
  render: h => h(App)
})
