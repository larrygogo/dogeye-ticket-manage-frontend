<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between">
      <div class="text-lg font-bold">仪表盘</div>
<!--      <div class="flex gap-2">-->
<!--        <el-date-picker-->
<!--            v-model="dateRange"-->
<!--            type="daterange"-->
<!--            range-separator="To"-->
<!--            start-placeholder="Start date"-->
<!--            end-placeholder="End date"-->
<!--        />-->
<!--        <el-button type="primary">搜索</el-button>-->
<!--      </div>-->
    </div>
    <div class="grid grid-cols-4 gap-4">
      <el-card shadow="never">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-sm">
            <div>总电影数</div>
            <Video class="size-5"/>
          </div>
          <div class="text-3xl font-mono font-bold">123</div>
        </div>
      </el-card>
      <el-card shadow="never">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-sm">
            <div>会员数</div>
            <Users class="size-5"/>
          </div>
          <div class="text-3xl font-mono font-bold">123</div>
        </div>
      </el-card>
      <el-card shadow="never">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-sm">
            <div>总电影数</div>
            <Video class="size-5"/>
          </div>
          <div class="text-3xl font-mono font-bold">123</div>
        </div>
      </el-card>
      <el-card shadow="never">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-sm">
            <div>售出票数</div>
            <Ticket class="size-5"/>
          </div>
          <div class="text-3xl font-mono font-bold">123,023</div>
        </div>
      </el-card>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <el-card class="col-span-3" shadow="never">
        <div class="flex flex-col gap-2">
          <div class="text-lg font-bold">销量预览</div>
          <div class="h-96">
            <v-chart
                style="height: 100%"
                :option="barChartOptions"
            />
          </div>
        </div>
      </el-card>
      <el-card shadow="never">
        <div class="flex flex-col gap-2">
          <div class="text-lg font-bold">票房排名</div>
          <div class="h-96">
            <div class="flex justify-between py-1" v-for="i in 10">
              <div class="flex gap-1">
                <div class="w-10">{{ i }}</div>
                <div>复仇者联盟</div>
              </div>
              <div class="font-mono text-lg">123,023</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
// import {subDays} from "date-fns";
import {Video, Users, Ticket} from "lucide-vue-next"

// const dateRange = ref<[Date, Date]>([subDays(new Date(), 7), new Date()])
const barChartOptions = ref({
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ["2024-05-30", "2024-05-31", "2024-06-01", "2024-06-02", "2024-06-03", "2024-06-06"]
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
})
</script>