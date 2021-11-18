<template>
  <div class="mobile-class">
    <Layout :style="{minHeight: '100vh'}">
      <Header>
          <Row type="flex" justify="space-between">
            <Col span='6' class="header-logo">
              <router-link to="/index">
                <img :src="logo">
              </router-link>
            </Col>
            <Col span='6'>
              <nav class="main-nav">
                <Burger></Burger>
              </nav>
            </Col>
          </Row>
          <Sidebar>
            <ul class="sidebar-panel-nav">
              <li>
                <Select @on-change="langChange" v-model="$i18n.locale">
                  <Option
                    :key="index"
                    v-for="(item, index) in locale"
                    :label="item"
                    :value="index">
                  </Option>
                </Select>
              </li>
              <li v-for="(item, index) in allRoutes" :class="$refs[item.name] ? 'menu menu-acitve' : 'menu'" :key="index" :ref="item.name">
                <span @click="changePage(item)">{{$t(item.name)}}</span>
              </li>
            </ul>
          </Sidebar>
      </Header>
      <Layout>
        <Content>
          <transition name="fade-transform" mode="out-in">
              <router-view />
          </transition>
        </Content>
      </Layout>
    </Layout>
    <!-- Footer 開始 -->
    <Footer>
      <Row type="flex" justify="center">
        <Col>
          <p>{{$t('copyRight')}}</p>
        </Col>
      </Row>
    </Footer>
    <!-- Footer 結束 -->
    <!-- 回到頂端的按鈕開始 (圖要記得換掉) -->
    <BackTop>
      <div :height="100" :bottom="100" :right="0">
        <img :src="arrow" class="top-img"/>
      </div>
    </BackTop>
    <!-- 回到頂端的按鈕結束 -->
  </div>
</template>

<script>
import Burger from '@/mobile/components/Menu/Burger.vue'
import Sidebar from '@/mobile/components/Menu/Sidebar.vue'
import { mutations } from '@/util/burger.js'
import platformConfig from '@/config/PlatformConfig'
import { defaultRoute } from '@/main'
import arrow from '@/assets/pc/go_top.png'

export default {
  data () {
    return {
      logo: platformConfig.logo,
      arrow,
      allRoutes: defaultRoute[0].children,
      locale: platformConfig.locale
    }
  },
  methods: {
    closeSidebarPanel: mutations.toggleNav,
    backToIndex () {
      this.$router.push({
        path: '/mobile/index'
      })
      Object.keys(this.$refs).forEach(key => {
        this.$refs[key] = false
      })
      this.$refs.Index = true
    },
    changePage (item) {
      this.$router.push({
        path: item.path
      })
      Object.keys(this.$refs).forEach(key => {
        this.$refs[key] = false
      })
      this.$refs[item.name] = true
      // console.log(this.$refs)
      this.closeSidebarPanel()
    },
    langChange (value) {
      sessionStorage.setItem('locale', value)
      this.closeSidebarPanel()
      window.location.reload()
    }
  },
  components: {
    Burger,
    Sidebar
  }
}
</script>

<style lang="scss">
.mobile-class {
  .ivu-layout {
    /* header開始 */
    .ivu-layout-header {
      padding: 0px;
      .header-logo {
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 80px;
        }
      }
      .main-nav {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
        overflow-x: hidden;
        overflow-y: hidden;
      }
      /* Mobile漢堡選單開始 */
      ul.sidebar-panel-nav {
        list-style-type: none;
          li {
            text-decoration: none;
            font-size: 1.5rem;
            display: block;
            padding-bottom: 0.5em;
            text-align: center
            span {
              text-decoration: none;
              display: block;
              padding-bottom: 0.5em;
              text-align: center;
            }
          }
      }
      .menu {
        display: -webkit-flex!important;
        display:         flex!important;
        -webkit-align-items: center;
                align-items: center;
        -webkit-justify-content: center;
                justify-content: center;
      }
      .ivu-select {
        width: 100px;
      }
      .ivu-select-selection {
        border: none;
      }
      /* Mobile漢堡選單結束 */
    }
  /* header結束 */
  }
/* to-top按鈕開始 */
  .top-img {
    display: block;
    width: 80%;
  }
/* to-top按鈕結束 */
}
</style>
