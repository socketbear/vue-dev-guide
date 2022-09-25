# `<script setup lang="ts">`로 들어가기
Vue2부터 Vue3로 가면서 가장 획기적으로 추가된 기능은 바로 **Composition API**입니다. 관심사의 분리를 관심사 끼리 뭉치고, 스토리를 읽듯이 소스를 읽을 수 있게 합니다. Vue2에서도 Composition API를 사용할 수 있게 제공 하는 기능을 가지고 조금씩 맛을 보았다면, [Vue3로 가면서 사용이 더 편해진 `script setup`을 사용해 볼 때 입니다.](https://vuejs.org/api/sfc-script-setup.html) 그리고, **Typescript**는 이제 기본적으로 사용하게 됩니다. 그 이점에 대해서는 많은 좋은 문서들이 있으니 참고하십시오.

## Composition API와 함께하는 `Script Setup` 사용
Vue2에서도 지원되는 `Composition API` 사용 시, `setup()` 함수에서 기존 기능과 혼용해서 사용 했었습니다. 이때 가장 귀찮은 것 중 하나가 **DOM**에서 사용하기 위해서 `return`을 통해 대상 오브젝트들을 밖으로 사용할 수 있게 선언했다면, 이제는 그렇지 않아도 됩니다. `const` 등 상수든 변수든 선언되면 `return` 과 상관없이 바로 사용할 수 있습니다.

```vue
<script setup>
// 상수를 선언하고,
const msg = 'Hello!'

// 함수를 선언하고,
function log() {
  console.log(msg)
}
</script>

<template>
  <!-- 그대로 사용 -->
  <button @click="log">
    {{ msg }}
  </button>
</template>
```

하지만, `props`와 `emit`은 사용하기 위해서 정의를 먼저 해야 합니다. 나머지는 Vue2의 Composition API와 같습니다.

```js
// props를 정의하는 방법
const { title, typeList, financialId } = defineProps<IFinancialStatementProps>()
```
- props 정의는 `defineProps`를 사용합니다.
- **Typescript**에서 지원하는 Interface를 통해 해당 Component에서 사용하는 props를 **타입** 정의합니다.
- 독립된 컴포넌트는 자신이 받을 props의 타입 정의 해야 완전한 독립성을 유지할 수 있습니다. (코딩의 실수가 줄어듭니다!)
- 타입을 정의하고 사용하는 건 [Interface 문서](/guide/interface)를 확인하십시오.
> 참고: **defineProps**에서 바로 타입을 정의할 수 없지만, `vite-plugin-vue-type-imports` 플러그인을 통해 가능하게 되었습니다.

```js
const emit = defineEmits(['change', 'delete'])
// ...
const updateData = () => {
  emit('change', financial)
}
```
- emit 정의는 `defineEmits`를 사용합니다.
- 이후, 기존 사용하는 방식 그대로 활용하십시오.