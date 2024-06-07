<template>
  <div class="flex flex-col gap-2">
    <el-card shadow="never">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between">
          <div class="text-lg font-bold">订单管理</div>
          <div class="flex justify-between">
            <div>
              <el-button type="primary">创建订单</el-button>
            </div>
          </div>
        </div>
        <el-table :data="data" style="width: 100%">˚
          <el-table-column prop="orderId" label="订单编号" min-width="200"/>
          <el-table-column prop="filmId" label="片名" min-width="200"/>
          <el-table-column prop="sessionId" label="影厅" min-width="120">
            <template #default="scope">
              {{ scope.row.sessionId }} 号厅
            </template>
          </el-table-column>

          <el-table-column prop="seat" label="座位" min-width="120"/>
          <el-table-column prop="uid" label="姓名" min-width="120"/>
          <el-table-column prop="phone" label="手机号" min-width="120"/>
          <el-table-column prop="price" label="价格" min-width="120">
            <template #default="scope">
              {{ scope.row.price }} 元
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="120">
            <template #default="scope">
              <el-tag>{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="orderDate" label="创建时间" min-width="200">
            <template #default="scope">
              {{ scope.row.orderDate }}
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleClick(scope.row.orderId)">
                删除
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
  </div>

  <el-dialog v-model="centerDialogVisible.value" title="确认删除吗" width="500" center>
    <span>
      确认删除吗
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible.value = false">取消</el-button>
        <el-button type="primary" @click="centerDialogVisible.value= false; deleteOrder()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>
<script lang="ts" setup>
import {reactive, ref, watch} from "vue";

const data = ref([])
const current = ref(1)
const pageSize = ref(5)
const total = ref(0)

const centerDialogVisible = reactive({
  value: false,
  orderId: ''
})

const handleClick = async (orderId: string) => {
  centerDialogVisible.value = true
  centerDialogVisible.orderId = orderId
}

const deleteOrder = async () => {
  console.log(centerDialogVisible.orderId)
  const result = await fetch(`/api/order/deleteById?orderId=${centerDialogVisible.orderId}`, {method: "delete",
  headers:{
    Authorization: localStorage.getItem('token') || 'token'
  }})
      .then(res => res.json())
  if (result.code == 0) {
    console.log("删除成功")
    const res = await getOrders({
      current: current.value,
      pageSize: pageSize.value
    })
    data.value = res.data
    total.value = Number(res.message)
  } else {
    alert(result.message)
  }
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  current.value = val
}

const getOrders = async (params?: {
  current?: number
  pageSize?: number
}): Promise<{
  code: number
  data: any
  message: string
}> => {
  const {current, pageSize} = params || {}
  console.log(current, pageSize)
  return await fetch(`/api/order/getOrderList?pageNumber=${current}&pageSize=${pageSize}`, {
    headers: {
      Authorization: localStorage.getItem('token') || 'token'
    }
  })
      .then(res => res.json())
}

getOrders({
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
      getOrders({
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