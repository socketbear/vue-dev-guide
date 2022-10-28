# 동적 Page Path 구성과 Layout 적용하기
`Vite`에는 Webpack과 같이 많은 **플러그인**들이 존재합니다. 그중 `Pages` 플러그인을 통해 `pages` 디렉토리에 기정의한 규칙으로 배치된 파일들을 기준으로 자동 path를 생성해 주고 있습니다. 편리한 기능이지만, 복잡한 서비스들을 가진 웹 서비스일 경우, 적절히 사용하는 구조에 따라 나눠야 하는 경우가 있습니다.
```
# path에 따른 구조 예시
src/
  ├── features/
  │  └── dashboard/
  │     ├── code/
  │     ├── components/
  │     ├── types/
  │     └── pages/
  ├── admin/
  │   ├── code/
  │   ├── components/
  │   ├── types/
  │   └── pages/
  └── pages/
```
위 내용을 보면, **features**, **admin** 서비스를 따로 디렉토리 구성하여, 그 안에 각각의 개별 주요 디렉토리(components, types, pages ...)를 통해 분리 한것을 확인할 수 있습니다. 이렇게 되면 `src` 디렉토리 바로 아래에 있는 건 전체 서비스에서 사용하는 공통을 의미하고, 각 서비스 디렉토리 안에 내역들은 각 서비스에서만 사용하는 것들로 정의가 가능합니다. 이게 필요한 이유는, `src` 바로 아래에 정의한 것들은 자동 import 됨에 따라 전역에서 사용할 수 있기 때문에, 각 사용성에 따라 분리가 필요합니다. (너무 많으면 로딩 및 개발의 불편함을 초래합니다.)
```js
// vite.config.js
export default {
  plugins: [
    Pages({
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
        { dir: 'src/features/**/pages', baseRoute: 'features' },
        { dir: 'src/admin/pages', baseRoute: 'admin' },
      ],
    }),
  ],
}
```
각 서비스를 나눠진다 해도, `Vite`의 `Pages` 플러그인을 사용할 수 있습니다. 위와 같이 등록하게 되면, **sub-path**로 각 서비스들을 접근하여 사용할 수 있습니다.
## Links
- https://github.com/hannoeru/vite-plugin-pages