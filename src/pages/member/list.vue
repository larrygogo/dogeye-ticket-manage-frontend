<template>
  <div class="flex flex-col gap-2">
    <el-card shadow="never" :model="userName">
      <el-form :inline="true">
        <el-form-item label="昵称">
          <el-input placeholder="请输入昵称" v-model="userName.nickname"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserByName(userName.nickname)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between">
          <div class="text-lg font-bold">用户列表</div>
          <div class="flex justify-between">
            <div>
              <el-button type="primary" @click="createMemberModalOpen = true ">添加用户</el-button>
            </div>
          </div>
        </div>
        <el-table :data="data" style="width: 100%">
          <el-table-column prop="nickname" label="昵称" min-width="120"/>
          <el-table-column prop="name" label="姓名" min-width="120"/>
          <el-table-column prop="gender" label="性别" min-width="120"/>
          <el-table-column prop="age" label="年龄" min-width="120"/>
          <el-table-column prop="phone" label="电话" min-width="120"/>
          <el-table-column prop="email" label="邮箱" min-width="120"/>
          <el-table-column prop="membershipPoint" label="积分" min-width="120"/>
          <el-table-column prop="membership" label="是否会员" min-width="120"/>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="deleteClick(scope.row.uid)">
                删除
              </el-button>
              <el-button link type="primary" size="small" @click.prevent="handleClick(scope.row.uid)">
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[5, 10, 20, 30]"
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
      <el-form :model="form" label-width="auto">
        <el-form-item name="nickname" label="昵称">
          <el-input placeholder="请输入昵称" v-model="form.nickname"/>
        </el-form-item>
        <el-form-item name="name" label="姓名">
          <el-input placeholder="请输入姓名" v-model="form.name"/>
        </el-form-item>
        <el-form-item name="email" label="邮箱">
          <el-input placeholder="请输入邮箱" v-model="form.email"/>
        </el-form-item>
        <el-form-item name="gender" label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item name="age" label="年龄">
          <el-input placeholder="请输入年龄" v-model="form.age"/>
        </el-form-item>
        <el-form-item name="phone" label="电话">
          <el-input placeholder="请输入电话" v-model="form.phone"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="createMemberModalOpen = false">取消</el-button>
          <el-button type="primary" @click="createMemberModalOpen = false;createUser(form)">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
        v-model="updateMemberModalOpen"
        title="修改用户"
        width="500"
    >
      <el-form :model="updateForm" label-width="auto">
        <el-form-item name="nickname" label="昵称">
          <el-input placeholder="请输入昵称" v-model="updateForm.nickname"/>
        </el-form-item>
        <el-form-item name="name" label="姓名" >
          <el-input placeholder="请输入姓名" v-model="updateForm.name" :disabled="true"/>
        </el-form-item>
        <el-form-item name="email" label="邮箱">
          <el-input placeholder="请输入邮箱" v-model="updateForm.email"/>
        </el-form-item>
        <el-form-item name="gender" label="性别" >
          <el-radio-group v-model="updateForm.gender" :disabled="true">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item name="age" label="年龄" >
          <el-input placeholder="请输入年龄" v-model="updateForm.age" :disabled="true"/>
        </el-form-item>
        <el-form-item name="phone" label="电话">
          <el-input placeholder="请输入电话" v-model="updateForm.phone"/>
        </el-form-item>
        <el-form-item name="membershipPoint" label="积分">
          <el-input placeholder="请输入积分" v-model="updateForm.membershipPoint"/>
        </el-form-item>
        <el-form-item name="membership" label="是否会员">
          <el-input placeholder="是否是会员" v-model="updateForm.membership"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="updateMemberModalOpen = false">取消</el-button>
          <el-button type="primary" @click="updateMemberModalOpen = false; updateUser(updateForm)">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="centerDialogVisible.value" title="确认删除吗" width="500" center>
    <span>
      确认删除吗
    </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible.value = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible.value= false; deleteUser()">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>
<script lang="ts" setup>
import {reactive, ref, watch} from "vue";

const data = ref([])
const current = ref(1)
const pageSize = ref(10)
const total = ref(0)
const userName = reactive({
  nickname: '',
})

const form = reactive({
  nickname: '',
  name: '',
  phone: '',
  email: '',
  gender: 0,
  age: '',
  membership: '',
  membershipPoint: '',
})

const updateForm = reactive({
  uid: '',
  nickname: '',
  name: '',
  phone: '',
  email: '',
  gender: 0,
  age: '',
  membership: '',
  membershipPoint: '',
})

const createMemberModalOpen = ref(false)
const updateMemberModalOpen = ref(false)
const centerDialogVisible = reactive({
  value: false,
  uid: ''
})

const createUser = async (form : any) => {
  const result = await fetch("/api/user/register",{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify({
     ...form,
      gender: form.gender == 0 ? '男':'女'
    })
  }).then(res => res.json())
  console.log(form)
  if (result.code == 0) {
    const res = await getUsers({
      current: current.value,
      pageSize: pageSize.value
    })
    data.value = res.data
    total.value = Number(res.message)
  }
}

const handleClick = async (uid: number) => {
  console.log(uid)
  updateMemberModalOpen.value = true
  const result = await fetch(`/api/user/findUserById?uid=${uid}`)
      .then(res => res.json())
  updateForm.uid = result.data.uid
  updateForm.nickname = result.data.nickname
  updateForm.email = result.data.email
  updateForm.name = result.data.name
  updateForm.phone = result.data.phone
  updateForm.gender = result.data.gender== "男" ? 0:1
  updateForm.age = result.data.age
  updateForm.membership = result.data.membership
  updateForm.membershipPoint = result.data.membershipPoint
}
const updateUser = async (updateForm : any) => {
  const result = await fetch("/api/user/update",{
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify({
      ...updateForm,
      gender : updateForm.gender== 0? '男':'女'
    })
  }).then(res => res.json())
  console.log(updateForm)
  if (result.code == 0) {
    const res = await getUsers({
      current: current.value,
      pageSize: pageSize.value
    })
    data.value = res.data
    total.value = Number(res.message)
  }
}

const deleteUser = async () => {
  console.log(centerDialogVisible.uid)
  const result = await fetch(`/api/user/delete?uid=${centerDialogVisible.uid}`, {method: "delete"})
      .then(res => res.json())
  if (result.code == 0) {
    console.log("删除成功")
    const res = await getUsers({
      current: current.value,
      pageSize: pageSize.value
    })
    data.value = res.data
    total.value = Number(res.message)
  } else {
    alert(result.message)
  }
}
const deleteClick = (uid: string) => {
  centerDialogVisible.value = true
  centerDialogVisible.uid =  uid
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  current.value = val
}


const getUserByName = async (nickname: string) => {
  const result :{
    code: number,
    data: any,
    message: string
  } = await fetch(`/api/user/findByName?nickname=${nickname}`)
      .then(res => res.json())
  console.log(result)
  if (result.code == 0){
    data.value = result.data
    total.value = Number(result.message)
  }else {
    alert(result.message)
  }

}
const getUsers = async (params?: {
  current?: number
  pageSize?: number
}): Promise<{
  code: number
  data: any
  message: string
}> => {
  const {current, pageSize} = params || {}
  console.log(current, pageSize)
  return fetch(`/api/user/getUserList?pageNumber=${current}&pageSize=${pageSize}`)
      .then(res => res.json())
}

getUsers({
  current: 1,
  pageSize: 10
}).then(res => {
  if (res.code === 0) {
    data.value = res.data
    total.value = Number(res.message)
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
        if (res.code === 0) {
          data.value = res.data
          total.value = total.value = Number(res.message)
        }
      })
    }
)



</script>