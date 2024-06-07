<template>
  <div class="flex flex-col gap-2">
    <el-card shadow="never">
      <el-form :inline="true" :model="adminName">
        <el-form-item label="昵称">
          <el-input placeholder="请输入昵称" v-model="adminName.name"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getAdminByName(adminName.name)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between">
          <div class="text-lg font-bold">管理员列表</div>
          <div class="flex justify-between">
            <div>
              <el-button type="primary" @click="createAdminModalOpen = true; createAdmin(form)">创建管理员</el-button>
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
            <template #default="scope">
              <el-button link type="primary" size="small" @click="deleteClick(scope.row.adminId)">
                删除
              </el-button>
              <el-button link type="primary" size="small" @click.prevent="handleClick(scope.row.adminId)">
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
        v-model="createAdminModalOpen"
        title="创建管理员"
        width="500"
    >
      <el-form :model="form" label-width="auto">
        <el-form-item name="name" label="昵称">
          <el-input placeholder="请输入昵称" v-model="form.name"/>
        </el-form-item>
        <el-form-item name="idCard" label="身份证">
          <el-input placeholder="请输入账号" v-model="form.idCard"/>
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
          <el-button type="primary" @click="createAdminModalOpen = false;  createAdmin(form)">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
        v-model="updateAdminModalOpen"
        title="修改管理员"
        width="500"
    >
      <el-form :model="updateForm" label-width="auto">
        <el-form-item name="name" label="昵称" >
          <el-input placeholder="请输入昵称" v-model="updateForm.name" :disabled="true"/>
        </el-form-item>
        <el-form-item name="idCard" label="身份证" >
          <el-input placeholder="请输入账号" v-model="updateForm.idCard" :disabled="true"/>
        </el-form-item>
        <el-form-item name="phone" label="电话">
          <el-input placeholder="请输入电话" v-model="updateForm.phone"/>
        </el-form-item>
        <el-form-item name="gender" label="性别" >
          <el-radio-group v-model="updateForm.gender" :disabled="true">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item name="roles" label="角色">
          <el-input placeholder="请输入角色" v-model="updateForm.roles"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="updateAdminModalOpen = false">取消</el-button>
          <el-button type="primary" @click="updateAdminModalOpen = false; updateAdmin(updateForm)">
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
          <el-button type="primary" @click="centerDialogVisible.value= false; deleteAdmin()">
            确定
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
const pageSize = ref(5)
const total = ref(0)
const adminName = reactive({
  name: '',
})

const form = reactive({
  name: '',
  idCard: '',
  password: '',
  phone: '',
  gender: 0,
  roles: ''
})
const updateForm = reactive({
  adminId:'',
  name: '',
  idCard: '',
  password: '',
  phone: '',
  gender: 0,
  roles: ''
})

const updateAdminModalOpen = ref(false)
const createAdminModalOpen = ref(false)
const centerDialogVisible = reactive({
  value: false,
  id: ''
})

const getAdminByName = async (name: string) => {
  const result :{
    code: number,
    data: any,
    message: string
  } = await fetch(`/api/admin/findByName?name=${name}`,{
    headers: {
      Authorization: localStorage.getItem('token') || 'token'
    }
  })
      .then(res => res.json())
  console.log(result)
  if (result.code == 0){
    data.value = result.data
    total.value = result.data.length
  }else {
    alert(result.message)
  }

}

const deleteClick = (id: string) => {
  centerDialogVisible.value = true
  centerDialogVisible.id =  id
}

const deleteAdmin = async () => {
  console.log(centerDialogVisible.id)
  const result = await fetch(`/api/admin/deleteById?adminId=${centerDialogVisible.id}`, {method: "delete",
  headers:{
    Authorization: localStorage.getItem('token') || 'token'
  }})
      .then(res => res.json())
  if (result.code == 0) {
    console.log("删除成功")
    const res = await getAdmins({
      current: current.value,
      pageSize: pageSize.value
    })
    data.value = res.data
    total.value = Number(res.message)
  } else {
    alert(result.message)
  }
}

const handleClick = async (id: number) => {
  updateAdminModalOpen.value = true;
  const result = await fetch(`/api/admin/getById?adminId=${id}`,{
    headers:{
      Authorization: localStorage.getItem('token') || 'token'
    }
  })
      .then(res => res.json())
  updateForm.adminId = result.data.adminId
  updateForm.name =  result.data.name
  updateForm.idCard = result.data.idCard
  updateForm.phone = result.data.phone
  updateForm.roles = result.data.roles
  updateForm.gender = result.data.gender == "男" ? 0:1
}

const createAdmin = async (form : any) => {
  const result = await fetch("/api/admin/add",{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || 'token'
    },
    body:  JSON.stringify({
      ...form,
      gender: form.gender == 0 ? '男':'女'
    })
  }).then(res => res.json())
  console.log(form)
  if (result.code == 0) {
    const res = await getAdmins({
      current: current.value,
      pageSize: pageSize.value
    })
    data.value = res.data
    total.value = Number(res.message)
  }
}

const updateAdmin = async (updateForm : any) => {
  const result = await fetch("/api/admin/updateById",{
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || 'token'
    },
    body:  JSON.stringify({
      ...updateForm,
      gender: updateForm.gender == 0? '男':'女',
    })
  }).then(res => res.json())
  console.log(updateForm)
  if (result.code == 0) {
    const res = await getAdmins({
      current: current.value,
      pageSize: pageSize.value
    })
    data.value = res.data
    total.value = Number(res.message)
  }
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  current.value = val
}

const getAdmins = async (params?: {
  current?: number
  pageSize?: number
}): Promise<{
  code: number
  data: any
  message: string
}> => {
  const {current, pageSize} = params || {}
  console.log(current, pageSize)
  return fetch(`/api/admin/getAdminList?pageNumber=${current}&pageSize=${pageSize}`,{
    headers:{
      Authorization: localStorage.getItem('token') || 'token'
    }
  })
      .then(res => res.json())
}

getAdmins({
  current: 1,
  pageSize: 5
}).then(res => {
  if (res.code === 0) {
    data.value = res.data
    console.log(data)
    total.value = Number(res.message)
  }
})


watch(
    [current, pageSize],
    (value) => {
      const [current, pageSize] = value
      getAdmins({
        current: current,
        pageSize: pageSize
      }).then(res => {
        if (res.code === 0) {
          data.value = res.data
          console.log(data)
          total.value = Number(res.message)
        }
      })
    }
)

</script>