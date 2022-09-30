import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ITodo } from '~/guide/types'
import { TODO_STATUS } from '~/guide/types/enums'

export const useTodoStore = defineStore('todo', () => {
  const todoList = ref<ITodo[]>([])
  const checks = ref<ITodo[]>([])

  const checkedLength = computed(() => checks.value.length)

  function addTodo(todoText: string) {
    if (!todoText)
      return

    todoList.value.push({
      id: getUniqueId(),
      status: TODO_STATUS.PREPARE,
      text: todoText,
      done: false,
    })
  }

  function deleteTodo() {
    const deleteTargetIds = checks.value.map((row: ITodo) => row.id)
    todoList.value = todoList.value.filter(todo => !deleteTargetIds.includes(todo.id))

    checks.value = []
  }

  function doCheck(todo: ITodo) {
    checks.value.push(todo)
  }

  function doUncheck(todo: ITodo) {
    checks.value = checks.value.filter(row => row.id !== todo.id)
  }

  function changeTodoStatus(todo: ITodo) {
    const target = todoList.value.find(row => row.id === todo.id)
    if (target) {
      target.status = todo.status
      target.done = todo.done
    }
  }

  return {
    todoList,
    checks,
    checkedLength,
    addTodo,
    deleteTodo,
    doCheck,
    doUncheck,
    changeTodoStatus,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
