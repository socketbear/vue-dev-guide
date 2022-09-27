<script setup lang="ts">
import type { ITodo } from '~/guide/types'
import { TODO_STATUS } from '~/guide/types/enums'

const todoText = ref<string>('')
const todoList = ref<ITodo[]>([])
const todoTable = ref()

const addTodo = () => {
  todoList.value.push({
    id: Math.random().toString(36).slice(2),
    status: TODO_STATUS.PREPARE,
    text: todoText.value,
    done: false,
  })
  todoText.value = ''
}

const deleteTodo = () => {
  const selectionRows = todoTable.value?.getSelectionRows()
  if (!selectionRows)
    return

  const deleteTargetIds = selectionRows?.map((row: ITodo) => row.id)
  todoList.value = todoList.value.filter(todo => !deleteTargetIds?.includes(todo.id))
}
</script>

<template>
  <div>
    <div>TO DO</div>
    <el-form :inline="true" label-width="120px" @submit.prevent="addTodo">
      <el-form-item label="Text">
        <el-input v-model="todoText" placeholder="TO-DO 항목을 입력해주세요." />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addTodo">
          추가
        </el-button>
        <el-button type="primary" @click="deleteTodo">
          삭제
        </el-button>
      </el-form-item>
    </el-form>
    <div class="w-1/2 mx-auto">
      <el-table ref="todoTable" :data="todoList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="text" label="Text">
          <template #default="{ row }">
            <p :class="`${row.done ? 'line-through text-gray-400' : ''}`">
              {{ row.text }}
            </p>
            <p class="hidden line-through text-gray-400" />
          </template>
        </el-table-column>
        <el-table-column label="Action">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click="() => (row.done = !row.done)"
            >
              {{ row.done ? '완료' : '미완료' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

  <route lang="yaml">
meta:
  layout: guide
  </route>

