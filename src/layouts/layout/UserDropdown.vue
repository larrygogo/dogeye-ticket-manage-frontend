<template>
  <el-dropdown ref="dropdown" trigger="click">
    <span class="el-dropdown-link">
      <user-avatar avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {DropdownInstance} from "element-plus";
import UserAvatar from "./UserAvatar.vue";
const dropdown = ref<DropdownInstance>()
</script>