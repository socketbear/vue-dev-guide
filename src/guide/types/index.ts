import type { TODO_STATUS } from './enums'

export interface ITodo {
  id: string
  status: TODO_STATUS
  text: string
  done: boolean
}
