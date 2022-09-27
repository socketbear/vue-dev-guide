<script setup lang="ts">
import type { ITodo } from '~/guide/types'
import { TODO_STATUS } from '~/guide/types/enums'
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

const changeTodoStatus = (todo: ITodo) => {
  if (todo.status === TODO_STATUS.DONE || todo.status === TODO_STATUS.EXCEPTED)
    todo.done = true
  else
    todo.done = false
}

const deleteTodo = () => {
  const deleteTargetIds = checks.value.map((row: ITodo) => row.id)
  todoList.value = todoList.value.filter(todo => !deleteTargetIds.includes(todo.id))
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
      <table class="w-full my-2 border border-slate-400">
        <!-- checkbox, text, 완료 버튼 순으로 column 구성 -->
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
        <tr v-for="todo in todoList" :key="todo.id">
          <!-- checkbox -->
          <td class="border border-slate-300">
            <input v-model="checks" type="checkbox" :value="todo">
          </td>
          <!-- 상태 -->
          <td class="border border-slate-300">
            <!-- TODO_STATUS를 이용하여 select로 구성 -->
            <select v-model="todo.status" class="border my-1 w-10/12" @change="changeTodoStatus(todo)">
              <option :value="TODO_STATUS.PREPARE">
                준비
              </option>
              <option :value="TODO_STATUS.IN_PROGRESS">
                진행 중
              </option>
              <option :value="TODO_STATUS.DONE">
                완료
              </option>
              <option :value="TODO_STATUS.EXCEPTED">
                제외
              </option>
            </select>
          </td>
          <!-- text -->
          <td class="border border-slate-300">
            <p :class="`${todo.done ? 'line-through text-gray-400' : ''} ${todo.status === TODO_STATUS.IN_PROGRESS ? 'font-bold text-green-600' : ''}`">
              {{ todo.text }}
            </p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: guide
</route>
