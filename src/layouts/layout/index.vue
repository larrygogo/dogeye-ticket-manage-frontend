<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <side-menu class="h-screen" />
      </el-aside>
      <el-container direction="vertical">
        <global-header />
        <el-main class="bg-gray-50">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import SideMenu from './SideMenu.vue'
import GlobalHeader from './GlobalHeader.vue'
</script>
