<script setup lang="ts">
import TodoListComp from '~/guide/components/todo/phase3/TodoList.vue'
import { useTodoStore } from '~/guide/store/todo'

let todoText = $ref<string>('')
const todoStore = useTodoStore()

const addTodo = () => {
  todoStore.addTodo(todoText)
  todoText = ''
}

const deleteTodo = () => {
  todoStore.deleteTodo()
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
        <button class="tiny-del-btn" :disabled="!todoStore.checkedLength" @click="deleteTodo">
          선택 할일 지우기
        </button>
      </div>
      <TodoListComp class="w-full my-2 border border-slate-400" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: guide
</route>
