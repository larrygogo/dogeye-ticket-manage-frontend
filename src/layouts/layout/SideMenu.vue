<template>
  <div class="border-r">
    <div class="h-[60px] flex gap-2 items-center px-2">
      <div>
        <img alt="logo" class="size-8" :src="settings.logo"/>
      </div>
      <div class="font-semibold">{{ settings.title }}</div>
    </div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo border-r-0"
        router
    >
      <el-menu-item index="/">
        <el-icon>
          <Gauge/>
        </el-icon>
        <span>仪表盘</span>
      </el-menu-item>
      <el-menu-item index="/film">
        <el-icon>
          <Video/>
        </el-icon>
        <span>电影管理</span>
      </el-menu-item>
      <el-menu-item index="/order">
        <el-icon>
          <Ticket/>
        </el-icon>
        <span>订单管理</span>
      </el-menu-item>
      <el-menu-item index="/admin">
        <el-icon>
          <UserRoundCog />
        </el-icon>
        <span>管理员管理</span>
      </el-menu-item>
      <el-menu-item index="/member">
        <el-icon>
          <Users/>
        </el-icon>
        <span>用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import {Gauge, Video, Ticket, Users, UserRoundCog} from 'lucide-vue-next'
import {useSettingsStore} from "@/stores/settings.ts";
import {ref} from "vue";
const activeIndex = ref('dashboard')

const settings = useSettingsStore()
</script>