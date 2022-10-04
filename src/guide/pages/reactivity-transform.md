# `Reactivity transform` 간단히 살펴보기
해당 기능은 Composition API 기반의 기능이며, **실험적인** 기능입니다. (Vuejs 버전 업에 따라 달라질 수 있습니다.) 특별히 사용할 이유가 있지 않는 경우 무시해도 좋습니다. 이 기능은 쉽게 설명해서, `ref()` 등 `.value`를 사용해야 만 할 경우 더 편리하게 사용할 수 있게 지원하는 기능힙니다. [공식문서](https://vuejs.org/guide/extras/reactivity-transform.html#refs-vs-reactive-variables)가 잘 나와 있으니 같이 참고 하십시오.
```vue
<script setup>
let count = $ref(0)

console.log(count)

function increment() {
  count++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```
위 예제를 살펴 보면, `.value` 없이도, `ref()`에 대한 반응형 사용이 가능합니다. `$` 하나를 추가한 것 뿐 입니다. 이는 `computed` 등 `.value`가 사용되는 대부분에 다 통용이 됩니다. 이 기능은 반응형으로 조회하는 형식에서 더 나은 경험을 줍니다. 특히, `vueuse`를 사용할 경우 궁합이 좋습니다.
```js
import { useMouse } from '@vueuse/core'

const { x, y } = $(useMouse())

console.log(x, y)
```
위 예제처럼 단순히 분리 선언하여 사용 가능합니다. 원래 분리 선언일 경우 반응형이 되지 않기 때문에, 따로 `toRef()`를 사용해야 합니다.

[To-Do 예제, `todo-phase2`](/guide/samp/todo-phase2)를 살펴 보면 **component** 내에서 Props 사용 시, `defineProps`에서 바로 type을 정의합니다. 원래 이렇게 사용 못하고, 좀 더 복잡한 방법을 사용해야 하지만, `Reactivity transform`를 통해 간략히 사용 가능합니다.