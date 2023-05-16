# Number Format 형식으로 출력하는 Input
내부 v-model은 Number 형식으로 저장되지만, 사용자에게는 Number Format 형식으로 보여주는 Input 입니다. 아래의 Input에 숫자를 입력하게 되면, 서식화 되어 `,` 가 출력됩니다. 해당 Input은 숫자만 입력할 수 있고, Component로 구현되어 있습니다.

해당 예제 소스를 통해, Vue3와 Typescript 환경에서 `v-model`을 사용하는 방법과, `Computed()`의 `get`, `set` 기능을 확인할 수 있습니다.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  Minus,
  Plus,
} from '@element-plus/icons-vue'
import CustForm from '../../components/cust/NumberFormatInput.vue'
const amount = ref(0)
</script>

<template>
  <div class="flex items-center">
    <p class="my-1 mr-2 font-bold">
      숫자 입력 >
    </p>
    <CustForm v-model="amount" />
    <el-button-group class="ml-4" size="small">
      <el-button type="primary" :icon="Plus" @click="amount += 500" />
      <el-button type="primary" :icon="Minus" @click="amount -= 500" />
    </el-button-group>
  </div>
</template>
```
## 소스 코드
### Parents
`src\guide\pages\snippets\num-form.md` 파일 내 사용된 소스 코드입니다.
```html
<CustForm v-model="amount" />
```
 - 만들어진 Component를 사용하는 부모 Component 입니다. `v-model`을 사용하여, 내부의 `modelValue`에 대응하게 됩니다.
### Component
`src\guide\components\cust\NumberFormatInput.vue` 파일 내 사용된 소스 코드입니다.
```vue
<script setup lang="ts">
const { modelValue } = defineProps<{
  modelValue: number
}>()

const emit = defineEmits(['update:modelValue'])

const localedNumber = computed({
  get: () => {
    return Intl.NumberFormat('ko-KR').format(modelValue)
  },
  set: (val) => {
    if (!val)
      val = '0'
    const numStr = val.replace(/[^0-9]/g, '')

    emit('update:modelValue', Number(numStr))
  },
})
</script>

<template>
  <input v-model="localedNumber" type="text" class="border-2 p-1">
</template>
```
 - `v-model`을 사용하기 위해서는, `modelValue`라는 이름의 `props`를 정의해야 합니다. `defineProps`를 사용하여, `modelValue`라는 이름의 `props`를 정의하고, `number` 타입으로 정의합니다.
 - `v-model`을 사용하기 위해서는, `update:modelValue`라는 이름의 `emit`을 정의해야 합니다. `defineEmits`를 사용하여, `update:modelValue`라는 이름의 `emit`을 정의합니다. 이를 통해 실제 `v-model`로 연결된 `modelValue`에 값을 할당할 수 있습니다.
 - `computed`를 사용하여, `get`과 `set`을 정의합니다. `get`은 `modelValue`를 `NumberFormat`을 사용하여, `,`를 추가하여 출력합니다. `set`은 `modelValue`에 값을 할당하기 전에, `,`를 제거하고, `Number`로 변환하여 할당합니다.