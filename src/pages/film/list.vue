<template>
  <el-card shadow="never">
    <div class="flex flex-col gap-4">
      <div class="flex justify-between">
        <div class="text-lg font-bold">影片管理</div>
        <div class="flex justify-between">
          <div>
            <el-button type="primary">添加影片</el-button>
          </div>
        </div>
      </div>
      <el-table :data="data" style="width: 100%">˚
        <el-table-column prop="filmName" label="片名" min-width="200"/>
        <el-table-column prop="filmType" label="类型" min-width="120"/>
        <el-table-column prop="language" label="语言" min-width="120"/>
        <el-table-column prop="filmDuration" label="时长" min-width="120">
          <template #default="{row}">
            {{row.filmDuration}} 分钟
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
  return fetch(`/api/film/list?page=${current}&pageSize=${pageSize}`)
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