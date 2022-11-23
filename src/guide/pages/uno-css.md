# `Uno CSS`와 shortcuts 구성하기
Tailwindcss가 나오면서 css를 작성하는 방법이 많이 바뀌었습니다. Class를 utility 형태로 사용하면서, css를 `.css` 가 아닌, html 내에서 작성하고, 이를 통해 궁극적으로 추가/수정의 편리성, Copy & Paste의 용의성을 가지고 왔습니다. 이후, windicss 등이 나왔고, 주요한 골자인 class를 utility 형태로 사용한다는 것은 편하지 않았습니다. `Uno CSS`도 마찬가지 입니다. tailwindcss를 기존에 사용하고 있어도 문제 없이 사용 가능하게 **tailwind** 전용 **사전 정의 셋**을 제공하고 있습니다.

## `shortcuts` 기능 사용하기
이미 지정된 사전 정의 셋을 사용만 하기에는 부족할 수 있습니다. Bootstrap과 같이 기본적인 class를 사용하고 싶을 수도 있고, 특정 class를 사용하고 싶을 수도 있습니다. 이럴 때, `shortcuts` 기능을 사용하면 됩니다. `shortcuts` 기능은 `unocss.config.ts` 내 `shortcuts` 항목에 추가 하면됩니다.
```js
export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['tiny-btn', 'border px-1 hover:bg-green-600 hover:text-white hover:border-green-600 active:bg-green-300'],
    ['tiny-del-btn', 'border px-1 hover:enabled:bg-red-600 hover:enabled:text-white hover:enabled:border-red-600 active:enabled:bg-red-300 disabled:cursor-not-allowed disabled:text-gray-300'],
  ],
})
```
이차원 배열로 구성되며, shortcut 구성을 하는 방법은 다음과 같습니다.
```js
['shortcut-name', 'class1 class2 class3 ...']
```

이 외 많은 기능들이 있습니다. [`Uno CSS` 사이트](https://github.com/unocss/unocss)를 참고하십시오.