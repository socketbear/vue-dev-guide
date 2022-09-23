<script setup lang="ts">
const todo: { text: string } = reactive({ text: '' })
</script>

<template>
  <div>
    <div>TO DO</div>
    <el-form :inline="true" :model="todo">
      <el-form-item label="Text">
        <el-input v-model="todo.text" placeholder="TO-DO 항목을 입력해주세요." />
      </el-form-item>
    </el-form>
  </div>
</template>

  <route lang="yaml">
meta:
  layout: guide
  </route>

