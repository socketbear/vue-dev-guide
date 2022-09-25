# Vue Dev Guide
Typescript를 사용하는 것은 이제 필수입니다. Prototype 스타일의 언어인 자바스크립트는 자유롭고 제한이 없다보니, 소스에 대한 검증이나 테스트가 다른 언어들 보다 어렵고, 타인의 소스를 읽는 것도 어렵습니다. 다시 말하자면 자유롭다는 것은 각각 개인들이 작성하는 소스도 규칙성이 많이 달라도 같은 목표를 달려갈 수 있지만, 반대로 남의 소스를 읽기 힘들다는 것입니다. Typescript는 `Type`이 추가 되었고, 이로 인해 얻게 되는 이점도 강력해졌습니다. `.` 만 누르면 자동으로 제안되는 가이드가 자바스크립트에서는 유추되어 나왔지만, 정의된 타입이 있어야 하는 Typescript에서는 **제대로** 된 가이드가 가능해 집니다. 또한, 서버와 통신 시, DTO 레벨의 각각 Parameter들에 대한 검증도 할 수 있고, 내가 정의한 컴포넌트나 타입을 사용할 때, 사용하는 사람이 제대로, 뭔가를 빼먹어서 오동작 하는 것을 애초에 막아 줍니다.

개발 가이드에서는 Typescript를 설명하지는 않습니다. 이 개발 가이드 보다 더 멋지고, 잘 되어 있는 [설명서](https://typescript-kr.github.io/)들이 많습니다. 이 가이드의 중점은 Vue3로 개발을 할 때, 필요한 부분만 집어서 설명합니다. 그리고, Vue를 알고 Vue2에서 개발 경험이 있는 사람들을 대상으로 구성했습니다. 본 개발 가이드에 오류가 있다면 이슈를 남겨주세요.

## 목차
- [`<script setup lang="ts">`로 들어가기](/guide/script-setup)
- [Interface, Enum 정의하고 사용하기](/guide/interface)
- To-Do Page를 만들어 보기 (Component, Store 활용)
- Composable 영역 사용하기
- [동적 Page Path 구성과 Layout 적용하기](/guide/dynamic-path)
- `<script setup lang="ts">` 내 주요 요소 사용 방법 알아보기
- Vue 사례 별 Interface 적용 방법 알아보기
- `Reactivity transform` 간단히 살펴보기
- [Mockup 기능과 fetch 사용하기](/guide/mockup)
- i18n 사용하기
- `element plus` 사용하기
- `Vue Use` 사용하기
- `Uno CSS` 사전 정의 셋 구성하기
- [Coding Guide](/guide/code)