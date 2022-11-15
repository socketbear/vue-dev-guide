<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

const url = ref<string>('/comm/hello')
const getHello = async () => {
  const res = await request(url.value, { method: 'GET' })
  console.log('data :>>>> ', res)
}
</script>

<template>
  <div>
    <h2>Fetch Page</h2>
  </div>
  <div class="w-128 mx-auto">
    <el-input v-model="url" placeholder="Please input">
      <template #prepend>
        /api/v1
      </template>
      <template #append>
        <el-button :icon="Search" @click="getHello" />
      </template>
    </el-input>
  </div>
</template>

<route lang="yaml">
meta:
  layout: guide
</route>

