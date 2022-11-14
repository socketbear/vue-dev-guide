# Css Style 작업을 위한 `.scss` 사용하기
CSS를 그대로 사용하는 것은 험난한 일입니다. 옛것을 그대로 사용하는 것은 낭만이 있는 방법이지만, 생산성과 편의성을 위해서 CSS는 전처리기가 포함된 좋은 라이브러리들이 생겨났습니다. stylus, less, sass, scss, postcss 등이 그것입니다. 이 문서에서는 guide 문서를 기반으로 만들어진 framework 기반에서 `scss`를 사용하는 방법을 다룹니다. **Framework**는 `scss`를 사용하기 위해 `sass` 라이브러리가 개발환경에서 설치되어  사용합니다. Vitejs에서는 별다른 설정 없이, `sass` 라이브러리만 설치해도 사용할 수 있게 구성해 줍니다.

## `.scss` 파일 만들기
`.css` 든 `.scss` 든, 이러한 스타일 파일들은 퍼블리셔가 작성합니다. 작성 경우 크게 두 가지 타입으로 나눠 집니다. 서비스 전체에 걸쳐 반영되는 main 혹은 global 급의 스타일과, 각 subpath 내 서비스 별 급의 스타일로 나눠집니다. **main** 급 스타일 파일들은 `src/styles`에서 작성됩니다. **subpath** 급 스타일 파일들은 각 서비스의 폴더 내 `styles` 폴더에서 작성됩니다. 이렇게 작성된 스타일 파일들은 main 급은 `App.vue`에서 import 되고, subpath 급은 각 서비스의 `index.vue`에서 import 됩니다. 물론, 각 서비스의 `index.vue`에서 import 되는 스타일 파일들은 `App.vue`에서 import 되는 스타일 파일들을 포함합니다.

해당 예시는 `src/styles/test.scss`와 `src/guide/pages/samp/scss-test.vue`를 확인 하면 됩니다. 참고로, 해당 `scss` 파일은 `App.vue`에서 import 되고 있습니다.

## 변수 사용하기
`.scss`는 위와 같이 간단하게 사용할 수 있습니다. 문제는 변수를 선언해서 사용하는 경우입니다. `Vitejs` 환경에서는 **on-demand** 형식으로 필요에 의해서 불러와 사용하는 방식이기 때문에 전반적으로 영향을 미치는 변수의 경우 이러한 `scss` 들이 사용하기 전에 선언되어야 합니다. 이러한 경우 vitejs에서는 `vite.config.js`에서 `css.preprocessorOptions`를 통해 전역 변수를 선언할 수 있습니다. 해당 예시는 `vite.config.js`에서 `css.preprocessorOptions`를 통해 전역 변수를 선언하는 방법을 보여줍니다. 해당 예제의 변수를 선언한 파일은 `src/styles/_variables.scss`입니다.

```js
// vite.config.js
// SCSS 전역 사용
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/_variables";',
      },
    },
  },
```

## 스타일 적용 가이드
* `src/styles` 폴더에 `scss` 파일을 생성합니다.
* 서비스 전체에서 사용하는 스타일은 `main.scss` 혹은 `global.scss`에서 정의하고, `App.vue`에서 import 합니다.
* 서비스 상위(로그인, 레이아웃 등)에서 사용하는 page 나 component 경우, `src/styles/pages` 혹은 `src/styles/components`에 `scss` 파일을 생성하고, 해당 `scss` 파일을 import 합니다. 파일명은  사용되는 `.vue` 맞추는 것을 권장합니다.
* 각 서비스 내에서 사용되는 스타일들은 각 서비스 내 `styles` 폴더에 `scss` 파일을 생성합니다.
* `scss` 파일을 생성할 때, `scss` 파일명은 `kebab-case`를 사용합니다.
* 변수와 같이 전역적으로 사전에 시작되는 파일들은 `_`를 붙여서 생성합니다.
* 사전에 정의된 css 셋은 [UnoCSS](https://github.com/unocss/unocss)를 우선으로 사용합니다. tailwind나 windiCSS와 같은 형식으로 사용 가능합니다.