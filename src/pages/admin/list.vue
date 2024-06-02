<template>
  <div class="flex flex-col gap-2">
    <el-card shadow="never">
      <el-form :inline="true">
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between">
          <div class="text-lg font-bold">用户列表</div>
          <div class="flex justify-between">
            <div>
              <el-button type="primary" @click="createAdminModalOpen = true">创建管理员</el-button>
            </div>
          </div>
        </div>
        <el-table :data="data" style="width: 100%">
          <el-table-column prop="name" label="昵称" min-width="120"/>
          <el-table-column prop="idCard" label="身份证" min-width="120"/>
          <el-table-column prop="phone" label="手机号" min-width="120"/>
          <el-table-column prop="gender" label="性别" min-width="120"/>
          <el-table-column prop="roles" label="角色" min-width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="handleClick">
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total"
        />
      </div>
    </el-card>
    <el-dialog
        v-model="createAdminModalOpen"
        title="创建管理员"
        width="500"
    >
      <el-form :model="form" label-width="auto">
        <el-form-item name="name" label="昵称">
          <el-input placeholder="请输入昵称" v-model="form.name"/>
        </el-form-item>
        <el-form-item name="idcard" label="身份证">
          <el-input placeholder="请输入账号" v-model="form.idcard"/>
        </el-form-item>
        <el-form-item name="phone" label="电话">
          <el-input placeholder="请输入电话" v-model="form.phone"/>
        </el-form-item>
        <el-form-item name="password" label="密码">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
        </el-form-item>
        <el-form-item name="gender" label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item name="roles" label="角色">
          <el-input placeholder="请输入角色" v-model="form.roles"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="createAdminModalOpen = false">取消</el-button>
          <el-button type="primary" @click="createAdminModalOpen = false">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref, watch} from "vue";

const data = ref()
const current = ref(1)
const pageSize = ref(10)
const total = ref(0)

const form = reactive({
  name: '',
  idCard: '',
  password: '',
  phone: '',
  gender: '',
  roles: ''
})

const createAdminModalOpen = ref(false)

const handleClick = () => {
  console.log('click')
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  current.value = val
}

const getFilms = async (params?: {
  current?: number
  pageSize?: number
}): Promise<{
  code: number
  data: any
  message: string
}> => {
  const {current, pageSize} = params || {}
  console.log(current, pageSize)
  const result =  fetch(`/api/admin/getAdminList?pageNumber=${current}&pageSize=${pageSize}`)
      .then(res => res.json())
  console.log(result)
  return result
}

getFilms({
  current: 1,
  pageSize: 10
}).then(res => {
  if (res.code === 0) {
    data.value = res.data
    console.log(data)
    total.value = res.data.length
  }
})


watch(
    [current, pageSize],
    (value) => {
      const [current, pageSize] = value
      getFilms({
        current: current,
        pageSize: pageSize
      }).then(res => {
        if (res.code === 200) {
          data.value = res.data.list
          total.value = res.data.total
        }
      })
    }
)


</script>