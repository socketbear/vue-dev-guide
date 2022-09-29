# To-Do Page를 만들어 보기 (Component, Store 활용)
**To-Do** 기능을 가진 Page를 단계별로 만들어 보면서 각 사용하는 방법을 확인하십시오. 한개 페이지에 모든 구성을 넣어 제공하는 것부터, component 기반, store 활용까지 단계별로 구성했습니다.

## [Phase 1. Page 단위 개발](/guide/samp/todo-phase1)
`/guide/samp/todo-phase1.vue` 파일의 내용을 참고하여 각 단계별 설명합니다.
```html
// export 된 interface를 선언할 경우 type 항목이 붙습니다.
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
          <td class="border border-slate-300">
            <input v-model="checks" type="checkbox" :value="todo">
          </td>
          <td class="border border-slate-300">
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
```
### 설명
- 서버스 내 공통으로 사용되는 **interface**는 서비스 도메인 별 `types` 디렉토리에 구성합니다. **enum**은 `types/enums` 디렉토리에 구성합니다.
- **To-Do** 에서 주로 사용되는 변수들을 위에 선언합니다. 반응형을 위하여 `ref` 함께 타입을 지정합니다.
- `<template />` 영역에서 사용을 위한 `return`으로 정의하는 것은 없습니다. 선언과 동시에 사용 가능합니다. 단지, 반응형 대응이 필요한 경우 `ref`, `reactive` 사용을 염두 하십시오. 반응형이 필요 없는 경우에는 `ref`, `reactive`를 사용할 필요가 없습니다.
- 하단 `<route />`에서 사용되는 **Layout**을 정의할 수 있습니다. 이 부분이 없으면, 자동으로 Layout 내 `default.vue`를 사용합니다.

## [Phase 2. Component 단위 개발](/guide/samp/todo-phase2)
`/guide/samp/todo-phase2.vue` 파일의 내용을 참고하십시오. 샘플 페이지 결과물을 볼때에는 Page 단위 개발과 같지만 소스는 전혀 다릅니다. 소스를 꼭 확인하세요.
### 관련 파일
- `/guide/samp/todo-phase2.vue`: Page를 구성
```vue
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

```
- `/guide/components/todo/phase2/TodoList.vue`: To-Do 리스트가 출력 되는 `<table />`로 구성된 Component
```vue
<script setup lang="ts">
import Todo from './Todo.vue'
import type { ITodo } from '~/guide/types'
const { todoList } = defineProps<{ todoList: ITodo[] }>()

const emit = defineEmits<{
  (e: 'check', todo: ITodo): void
  (e: 'uncheck', todo: ITodo): void
  (e: 'changeStatus', todo: ITodo): void
}>()

const checked = (todo: ITodo) => {
  emit('check', todo)
}
const unchecked = (todo: ITodo) => {
  emit('uncheck', todo)
}
const changeStatus = (todo: ITodo) => {
  emit('changeStatus', todo)
}
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
    <Todo v-for="todo in todoList" :key="todo.id" :todo="todo" @check="checked" @uncheck="unchecked" @change-status="changeStatus" />
  </table>
</template>
```
- `/guide/components/todo/phase2/Todo.vue`: To-Do 항목 하나이며, `<tr />`로 구성된 Component
```vue
<script setup lang="ts">
import type { ITodo } from '~/guide/types'
import { TODO_STATUS } from '~/guide/types/enums'

const props = defineProps<{ todo: ITodo }>()
const emit = defineEmits<{
  (e: 'check', todo: ITodo): void
  (e: 'uncheck', todo: ITodo): void
  (e: 'changeStatus', todo: ITodo): void
}>()
// $ref는 Reactivity transform 기능으로, .value를 사용하지 않아도, 반응형이 지원됩니다.
const todo = $ref<ITodo>(Object.assign({}, props.todo))
const check = ref(false)

const changeCheckbox = () => {
  if (check.value)
    emit('check', todo)

  else
    emit('uncheck', todo)
}

const changeStatus = () => {
  if (todo.status === TODO_STATUS.DONE || todo.status === TODO_STATUS.EXCEPTED)
    todo.done = true
  else
    todo.done = false

  emit('changeStatus', todo)
}
</script>

<template>
  <tr>
    <td class="border border-slate-300">
      <input v-model="check" type="checkbox" @change="changeCheckbox">
    </td>
    <td class="border border-slate-300">
      <select v-model="todo.status" class="border my-1 w-10/12" @change="changeStatus">
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
</template>

```
### 설명
- Page에서 List를, List에서 항목을 호출하는 형식으로 총 3개 파일입니다.
- `Todo` 에서 발생한 이벤트는 `TodoList`를 거쳐 Page로 가게 됩니다. 중간 단계인 `TodoList`에서 연계를 위해 관련 이벤트 정의가 필요합니다.

## Phase 3
Component로 쪼개어 개발하게 되면 필연적으로 `props`를 통해 컴포넌트들에게 Model을 주게 됩니다. 이 경우, props로 받게되는 데이터를 컴포넌트에서는 **변경해서는 안됩니다**. 불변성을 해치게 되면 다른 컴포넌트에 어떠한 Side effect가 도출 될 지 모릅니다. **Phase 2** 단계에서는 이를 회피하기 위해 `Todo`에서 값을 복사하여 사용합니다. 한편, 이벤트 경우에도 실제 발생하는 것은 `Todo`이지만, 소비되는 곳은 Page입니다. 중간에 위치된 `TodoList`에서 이를 연계할 수 있게 귀찮은 `emit` 선언을 해야만 합니다.

Component가 독립적으로 개발되는 경우 상관이 없지만, 그렇지 않는 경우 **Flux** 패턴을 가진 기능을 사용하는데, 우리는 `Pinia`가 있습니다.