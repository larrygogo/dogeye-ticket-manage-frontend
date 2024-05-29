<template>
  <div class="flex flex-col gap-2">
    <el-card shadow="never">
      <el-form :inline="true">
        <el-form-item label="订单号">
          <el-input placeholder="请输入订单号"/>
        </el-form-item>
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
          <div class="text-lg font-bold">订单管理</div>
          <div class="flex justify-between">
            <div>
              <el-button type="primary">创建订单</el-button>
            </div>
          </div>
        </div>
        <el-table :data="data" style="width: 100%">˚
          <el-table-column prop="orderId" label="订单编号" min-width="200"/>
          <el-table-column prop="filmName" label="片名" min-width="200"/>
          <el-table-column prop="cinemaId" label="影厅" min-width="120">
            <template #default="{row}">
              {{ row.cinemaId }} 号厅
            </template>
          </el-table-column>

          <el-table-column prop="seat" label="座位" min-width="120"/>
          <el-table-column prop="name" label="姓名" min-width="120"/>
          <el-table-column prop="phone" label="手机号" min-width="120"/>
          <el-table-column prop="price" label="价格" min-width="120">
            <template #default="{row}">
              {{ row.price }} 元
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="120">
            <template #default="{row}">
              <el-tag>{{ row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="orderDate" label="创建时间" min-width="200">
            <template #default="{row}">
              {{ row.orderDate }}
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
  </div>
</template>
<script lang="ts" setup>
import {ref, watchEffect} from "vue";
import {FilmInfo} from "@/types/film.ts";

const data = ref<FilmInfo[]>([])
const current = ref(1)
const pageSize = ref(10)
const total = ref(0)

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
  return fetch(`/api/order/list?page=${current}&pageSize=${pageSize}`)
      .then(res => res.json())
}

watchEffect(() => {
  getUsers({
    current: current.value,
    pageSize: pageSize.value
  }).then(res => {
    if (res.code === 200) {
      data.value = res.data.list
      total.value = res.data.total
      current.value = res.data.page
      pageSize.value = res.data.pageSize
    }
  })
})


</script>