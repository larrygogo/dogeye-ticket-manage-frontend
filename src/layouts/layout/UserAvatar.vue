<template>
  <el-avatar
      :src="props.avatar"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  avatar: string
}>()
</script>