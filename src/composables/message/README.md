# 반환 메세지 박스
반환 값을 필요로 하는 [메시지박스](https://element-plus.org/en-US/component/message-box.html)를 비동기 함수 호출 형식으로 사용하기 위하여 
래핑된 composition-api 모듈입니다.
<br />
만약 반환 메세지 박스의 인자인 컴포넌트/VNode가 특정 예약어(`submit` | `cancel`)의 Emit이 구현되어 있다면 해당 이벤트를 수신 대기하여 값을 반환합니다.

## 이벤트 목록
|이벤트명|기능|
|---|---|
|submit|submit 이벤트의 인자를 반환합니다.|
|cancel|창이 닫히며 `cancel emitted` 메세지로 에러를 반환합니다.|


## Component를 이용하여 사용하는 방법
1. vue 파일을 작성하여 component를 작성합니다.
```html
<!-- /components/MsgForm.vue -->

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

interface IFormData {
  domains: DomainItem[]
  email: string
}
interface DomainItem {
  key: number
  value: string
}

const props = defineProps<{ initialData: Partial<IFormData> }>()
const emit = defineEmits<{
  (e: 'submit', value: IFormData): void
  (e: 'cancel'): void
}>()

const formRef = ref<FormInstance>()
const defaultForm: IFormData = {
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
}

const formData = reactive<IFormData>(defaultForm)
watchEffect(() => {
  formData.email = props.initialData.email ?? formData.email
})

const removeDomain = (item: DomainItem) => {
  const index = formData.domains.indexOf(item)
  if (index !== -1)
    formData.domains.splice(index, 1)
}

const addDomain = () => {
  formData.domains.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  formEl.validate((valid) => {
    if (valid) {
      emit('submit', formData)
    }
    else {
      console.log('error submit!')
      return false
    }
  })
}

defineExpose({ formData })
</script>

<template>
  <el-form ref="formRef" :model="formData" label-width="120px" class="demo-dynamic">
    <el-form-item
      prop="email" label="Email" :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <el-input v-model="formData.email" />
    </el-form-item>
    <el-form-item
      v-for="(domain, index) in formData.domains" :key="domain.key" :label="`Domain${index}`"
      :prop="`domains.${index}.value`" :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
    >
      <el-input v-model="domain.value" />
      <el-button class="mt-2" @click.prevent="removeDomain(domain)">
        Delete
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="addDomain">
        도메인 추가
      </el-button>
      <el-button type="primary" @click="submitForm(formRef)">
        제출
      </el-button>
      <el-button @click="() => $emit('cancel')">
        닫기
      </el-button>
    </el-form-item>
  </el-form>
</template>
```
2. 반환 메세지를 사용합니다.
```html
<!-- .../pages/index.vue -->
<script setup lang="ts">
import MsgForm from '~/components/MsgForm.vue'

const { showFromNode, showFromFile } = useReturnMessage()

async function openVueFile() {
  const result = await showFromFile({
    component: MsgForm,
    props: {
      initialData: {
        email: 'qwepoi3218@naver.com',
      },
      onSubmit: () => {
        console.info('emitted submit')
      },
    },
  })
  console.log('result: ', result)
}
</script>
<template>
    <el-button plain @click="openVueFile">
      open with Vue File
    </el-button>
</template>
```

## VNode & Tsx
    VNode 와 Tsx를 사용하여 이용하는 방법을 기술합니다.

1. 정의
```tsx
// src/components/MsgList.tsx
export const List = defineComponent({
  name: 'List',
  props: {
    data: {
      required: true,
      type: Array as PropType<IListItem[]>,
      validation: (d: any) => d.length > 0,
    },
  },
  emits: {
    submit(data: IListItem) {
      return data
    },
    cancel() {
      console.log('cancel in msg list')
      return true
    },
  },
  setup(props, { emit }) {
    return () => (
      <div>
        <strong>List</strong>
        <ul>
          {vFor(props.data, (v) => {
            return <li
              key={v.id}
              onClick={() => {
                console.log(v)
                emit('submit', v)
              }}
            >{v.name}</li>
          })}
        </ul>
        <button onClick={() => emit('cancel')}>닫기</button>
      </div>
    )
  },
})

function vFor<T>(arr: T[], callback: (children: T, index: number) => any) {
  return arr.map((v, index) => {
    return callback(v, index)
  })
}
``` 
2. 사용
```html
<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { IListItem } from '~/components/MsgList'
import { List } from '~/components/MsgList'
const { t } = useI18n()
const { showFromNode, showFromFile } = useReturnMessage()

const getListNode = () => h(List, {
  data: [
    { id: '1', name: 'sp' },
    { id: '2', name: 'hi' },
  ],
}, {})
async function openTsx() {
  const vNode = getListNode()
  showFromNode<IListItem>(vNode)
    .then((result) => { console.log(result) })
    .catch(err => console.error(err))
}
</script>

<template>
  <div>
    <el-button plain @click="openTsx">
      open with Tsx Form
    </el-button>
  </div>
</template>



```