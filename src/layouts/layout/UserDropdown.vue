<template>
  <el-dropdown ref="dropdown" trigger="click">
    <span class="flex items-center gap-2 el-dropdown-link">
      <user-avatar :avatar="useUserStore().avatar"/>
      <span>{{ useUserStore().name }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="exit()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {DropdownInstance} from "element-plus";
import UserAvatar from "./UserAvatar.vue";
import {useUserStore} from "@/stores/user.ts";

const dropdown = ref<DropdownInstance>()

const exit = () => {
  useUserStore().logout()
}
</script>