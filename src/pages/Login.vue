<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  username: '',
  password: '',
})

const checkUsername = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    ruleForm.username = value;
    callback()
  }
}

const validatePassword = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    ruleForm.password = value;
    callback()
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  password: [{validator: validatePassword, trigger: 'blur'}],
  username: [{validator: checkUsername, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const result = await fetch(`/api/login?name=${ruleForm.username}&password=${ruleForm.password}`, {method: 'GET'})
          .then(res => res.json())

      if (result.code === 0){
        localStorage.setItem('token', result.data)
        window.location.href = '/'
      } else {
        alert(result.message)
        console.log(result.message)
      }
    } else {
      console.log('error submit!')
    }
  })
}

</script>
<template>
  <div class="flex flex-col gap-4 items-center justify-center w-full h-screen">
    <div class="text-2xl font-bold">票务管理系统</div>
    <el-card style="min-width:  400px">
      <el-form
          label-position="top"
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model.number="ruleForm.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
        </el-form-item>

        <el-form-item>
          <el-button class="w-full" type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>