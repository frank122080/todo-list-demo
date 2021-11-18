<template>
    <div class="sidebar">
        <!-- <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div> -->
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel" :style="{background:'url(' + background + ') no-repeat center', backgroundSize: 'cover'}">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
import { store, mutations } from '@/util/burger.js'
import background from '@/assets/mobile/main/BG_HM_02.png'

export default {
  data () {
    return {
      background: background
    }
  },
  methods: {
    closeSidebarPanel: mutations.toggleNav
  },
  computed: {
    isPanelOpen () {
      return store.isNavOpen
    }
  }
}
</script>
<style>
  .slide-enter-active,
  .slide-leave-active
  {
    transition: transform 0.2s ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s
  }

  .sidebar-backdrop {
    background-color: rgba(19, 15, 64, .4);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .sidebar-panel {
    overflow-y: auto;
    background-color: rgba(7, 8, 11, .7) ;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    /* width: 300px; */
  }
  .sidebar {
    overflow: auto
  }
</style>
