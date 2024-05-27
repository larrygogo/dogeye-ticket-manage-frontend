<template>
  <el-dialog
      v-model="props.open"
      title="Tips"
      width="500"
      :before-close="props.beforeClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="props.open = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {ref} from "vue";
const props = defineProps<{
  open: boolean
  beforeClose: () => void

}>()
</script>