<template>
  <div class="pc-class">
    <Layout :style="{minHeight: '100vh'}">
      <!-- Header 開始 -->
      <Header>
        <Row type="flex">
          <Col span='4' class="header-logo">
            <router-link to="/index">
              <img :src="logo">
            </router-link>
          </Col>
          <Col span="12">
            <Menu
              theme="dark"
              mode="horizontal"
              :active-name="activeName"
            >
              <template v-for="(item, index) in allRoutes">
                <MenuItem :key="'menu-'+index" :name="item.name" :to="item.path">
                  <span :key="'span-'+index">{{$t(item.name)}}</span>
                </MenuItem>
              </template>
            </Menu>
          </Col>
          <Col span="6">
          <!-- 語言選單 -->
          <Select @on-change="langChange" v-model="$i18n.locale">
            <Option
                :key="index"
                v-for="(item, index) in locale"
                :label="item"
                :value="index">
            </Option>
          </Select>
          </Col>
        </Row>
      </Header>
    <!-- Header 結束 -->
      <Layout>
        <Content class="content-wrap">
          <router-view />
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
      <div :height="100" :bottom="100" :right="10">
        <img :src="arrow" class="top-img"/>
      </div>
    </BackTop>
    <!-- 回到頂端的按鈕結束 -->
  </div>
</template>

<script>
import platformConfig from '@/config/PlatformConfig'
import { defaultRoute } from '@/main'
import arrow from '@/assets/pc/go_top.png'

export default {
  data () {
    return {
      logo: platformConfig.logo,
      allRoutes: defaultRoute[0].children,
      locale: platformConfig.locale,
      activeName: 'index',
      arrow
    }
  },
  methods: {
    langChange (value) {
      sessionStorage.setItem('locale', value)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
.pc-class {
  .ivu-layout {
    /* header開始 */
    .ivu-layout-header {
      .header-logo {
        display: flex;
        align-items: center;
        img {
          width: 90px;
          display: block;
        }
      }
      .ivu-select {
        width: 100px;
      }
    }
    /* header結束 */
    .content-wrap {
      padding: 0 16px 16px;
    }
  }
/* to-top按鈕開始 */
  .top-img {
    display: block;
    width: 80%;
  }
/* to-top按鈕結束 */
}
</style>
