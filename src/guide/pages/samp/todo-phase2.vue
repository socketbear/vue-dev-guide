<script setup lang="ts">
import type { ITodo } from '~/guide/types'
import { TODO_STATUS } from '~/guide/types/enums'
import TodoListComp from '~/guide/components/todo/phase2/TodoList.vue'
const todoText = ref<string>('')
const todoList = ref<ITodo[]>([])
const checks = ref<ITodo[]>([])

const addTodo = () => {
  if (!todoText.value)
    return

  todoList.value.push({
    id: getUniqueId(),
    status: TODO_STATUS.PREPARE,
    text: todoText.value,
    done: false,
  })
  todoText.value = ''
}

const deleteTodo = () => {
  const deleteTargetIds = checks.value.map((row: ITodo) => row.id)
  todoList.value = todoList.value.filter(todo => !deleteTargetIds.includes(todo.id))
  checks.value = []
}

const checked = (todo: ITodo) => {
  checks.value.push(todo)
}

const unchecked = (todo: ITodo) => {
  checks.value = checks.value.filter(row => row.id !== todo.id)
}

const changeTodoStatus = (todo: ITodo) => {
  const target = todoList.value.find(row => row.id === todo.id)
  if (target) {
    target.status = todo.status
    target.done = todo.done
  }
}
</script>

<template>
  <!-- todo 샘플 페이지 -->
  <div>
    <div class="text-xl font-bold">
      TO-DO, 할일 목록
    </div>
    <!-- todo 입력 폼 -->
    <div class="w-full lg:w-1/2 mx-auto my-2">
      <form @submit.prevent="addTodo">
        <label for="todoText" class="mr-2">내 할일</label>
        <input v-model="todoText" type="text" name="todoText" class="border p-1 mr-2" placeholder="할일을 입력해주세요.">
        <button class="tiny-btn">
          추가
        </button>
      </form>
      <!-- todo 목록 테이블 -->
      <div class="w-full flex justify-end">
        <button class="tiny-del-btn" :disabled="!checks.length" @click="deleteTodo">
          선택 할일 지우기
        </button>
      </div>
      <TodoListComp :todo-list="todoList" class="w-full my-2 border border-slate-400" @check="checked" @uncheck="unchecked" @change-status="changeTodoStatus" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: guide
</route>
