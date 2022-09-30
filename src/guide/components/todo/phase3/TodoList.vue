<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Todo from './Todo.vue'
import { useTodoStore } from '~/guide/store/todo'

const todoStore = useTodoStore()
const { todoList } = storeToRefs(todoStore)
</script>

<template>
  <table class="w-full my-2 border border-slate-400">
    <tr class="bg-slate-100">
      <th class="w-1/12 border border-slate-300" />
      <th class="w-3/12 border border-slate-300">
        상태
      </th>
      <th class="w-8/12 border border-slate-300">
        할일
      </th>
    </tr>
    <!-- todo 목록 -->
    <tr v-if="todoList.length === 0">
      <td class="border border-slate-300 text-slate-300" colspan="3">
        할 일을 추가해 주세요.
      </td>
    </tr>
    <Todo v-for="todo in todoList" :key="todo.id" :todo="todo" />
  </table>
</template>

