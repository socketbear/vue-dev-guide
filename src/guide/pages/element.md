# `element plus` 사용하기
`vuejs`를 사용하면서, 가장 많이 사용한 경험이 있는 component set은 element ui입니다. vue3로 올라오면서 element ui도 [`element plus`](https://element-plus.org/en-US/)라는 이름으로 변경되고, 많음 부분이 업데이트 되었습니다. element plus는 많은 부분에 대해 좋은 컴포넌트를 제공하고, vue3를 잘 사용할 수 있도록 규칙적으로 작성되어 있습니다. 문제는 element plus를 그대로 사용하기에는 거대하고 큰 몸체를 가지고 있기 때문입니다. 다행히도, Framework에서는 사용하는 부분만 가져와 사용하고 빌드할 수 있게 `resolver`가 구성되어 있습니다. 이를 통해, 필요한 부분만 `import` 도 없이 사용이 가능합니다.
> **tip**: 간혹, 사용한 component에서 사용 에러가 나올 경우, 오탈자인 경우가 대부분입니다. 다시 찾아보세요.

## `element plus` 사용하기
[`element plus`](https://element-plus.org/en-US/)의 사이트로 들어가 우측 상단의 **Component**를 클릭해서 들어가면, 제공되는 컴포넌트들을 볼 수 있습니다. 여기서 사용할 때, 코드 그대로 가져와 `<template />` 영역에 넣어 사용하면 됩니다. `import` 없이 resovler가 알아서 가져와 사용합니다. 예를 들어, `button`을 사용하고 싶다면, 아래와 같이 사용하면 됩니다.

```html
<el-button type="primary" disabled>Primary</el-button>
<el-button type="success" disabled>Success</el-button>
```
`src/guide/pages/samp/el-todo.vue` 파일을 보면 좀 더 자세한 사용법을 볼 수 있습니다.