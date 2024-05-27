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
              <el-button type="primary" @click="createMemberModalOpen = true">添加用户</el-button>
            </div>
          </div>
        </div>
        <el-table :data="data" style="width: 100%">
          <el-table-column prop="nickname" label="昵称" min-width="120"/>
          <el-table-column prop="fullName" label="姓名" min-width="120"/>
          <el-table-column prop="gender" label="性别" min-width="120"/>
          <el-table-column prop="age" label="年龄" min-width="120"/>
          <el-table-column prop="phone" label="电话" min-width="120"/>
          <el-table-column prop="integral" label="积分" min-width="120"/>
          <el-table-column prop="isVip" label="是否会员" min-width="120">
            <template #default="{row}">
              <el-tag v-if="row.isVip" type="primary">是</el-tag>
              <el-tag v-else type="danger">否</el-tag>
            </template>
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
        v-model="createMemberModalOpen"
        title="创建用户"
        width="500"
    >
      <el-form>
        <el-form-item label="昵称">
          <el-input placeholder="请输入昵称"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group>
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input placeholder="请输入年龄"/>
        </el-form-item>
        <el-form-item label="电话">
          <el-input placeholder="请输入电话"/>
        </el-form-item>
        <el-form-item label="积分">
          <el-input placeholder="请输入积分"/>
        </el-form-item>
        <el-form-item label="是否会员">
          <el-radio-group>
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="createMemberModalOpen = false">取消</el-button>
          <el-button type="primary" @click="createMemberModalOpen = false">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import {ref, watch} from "vue";

const data = ref([])
const current = ref(1)
const pageSize = ref(10)
const total = ref(0)

const createMemberModalOpen = ref(false)

const handleClick = () => {
  console.log('click')
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  current.value = val
}

const getUsers = async (params?: {
  current?: number
  pageSize?: number
}) => {
  const {current, pageSize} = params || {}
  console.log(current, pageSize)
  return fetch(`/api/member/list?page=${current}&pageSize=${pageSize}`)
      .then(res => res.json())
}

getUsers({
  current: 1,
  pageSize: 10
}).then(res => {
  if (res.code === 200) {
    data.value = res.data.list
    total.value = res.data.total
  }
})


watch(
    [current, pageSize],
    (value) => {
      const [current, pageSize] = value
      getUsers({
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