import Main from '@/pc/views/Main'
import Index from '@/pc/views/Index'

// -----------------------------------------mobile區開始
import MainMobile from '@/mobile/views/Main'
import IndexMobile from '@/mobile/views/Index'

export default ({
  defaultRoutes: [
    {
      path: '/pc/',
      name: 'Main',
      component: Main,
      children: [
        { path: '/index', component: Index, name: 'index', id: '1-1' },
        { path: '/info', component: () => import(/* webpackChunkName: "Info" */ '@/pc/views/Info'), name: 'info', id: '2-1' }
      ]
    }
  ],
  defaultRoutesMobile: [
    {
      path: '/mobile/',
      name: 'Main',
      component: MainMobile,
      children: [
        { path: '/mobile/index', component: IndexMobile, name: 'index' },
        { path: '/mobile/info', component: () => import(/* webpackChunkName: "Info" */ '@/mobile/views/Info'), name: 'info' }
      ]
    }
  ]
})
