# Coding Guide
- 순수 함수를 사용할 경우, `parameter`와 `return` 되는 값은 **Type** 정의 하십시오. 일반적인 함수도 `parameter`가 있는 경우 필수로 **Type** 정의해야합니다.
- Component, page의 명칭은 **고유**해야 합니다. 자동으로 `import` 기능을 사용함에 따라 동일한 명칭을 가진 파일들이 존재하면 무한 루프가 발생할 수 있습니다. `directoryAsNamespace: true` 로 사용하는 경우 디렉토리 path를 넣어야 사용이 가능합니다. (현재 반영된 상태)
- 공통으로 사용되는 Component 만 `~/components`에 넣어야 합니다.
- 특정 영역에서 사용되는 Component는 따로 서비스 별 디렉토리를 만들어 구성합니다. 서비스 별 디렉토리 구성 방안은 [동적 Page Path 구성과 Layout 적용하기](/guide/dynamic-path)에서 확인 하십시오.
- **Component** 구성 시, `props`로 값을 전달 할 경우, 하나의 **Object**로 만들어서 전달하지 마십시오.
```html
<!-- recommended -->
<range-slider
  :values="[10, 20]"
  :min="0"
  :max="100"
  :step="5"
  @on-slide="updateInputs"
  @on-end="updateResults"
>
</range-slider>

<!-- avoid -->
<range-slider :config="complexConfigObject"></range-slider>
```
- 함수에서 함수를 또 그안에서 함수를 호출하는 형식보다 함수 안에서 순서대로 함수들이 실행하게 끔 하십시오. 함수 사용이 tree 구조 처럼 깊어지게 된다면, 찾는 것도 디버깅 하는 것도 어려워 집니다. 또한, **재사용성**이 있는 함수라면 순수함수 형태로 만드는 것이 좋습니다.
```js
// 이렇게 개발하지 마십시오.
function c() {
  d()
}
function a() {
  c()
}
function b() {
  a()
}

// 이런 형식으로 사용할 수 있게 하십시오.
function a() {
  b()
  c()
  d()
}
```
- 주석을 작성할 경우, 소스에 맞게 제대로 작성해야 합니다. 잘못된 주석은 소스를 읽기 힘들게 하는 주범입니다. 특히, Copy & Paste 경우 주석과 함께 할 경우, 주석을 그대로 두지 마십시오. 꼭 확인하여 수정이 필요하면 수정을 해야 합니다. 또한, 주석은 아래와 같이 작성 가이를 따릅니다.
```js
// ! 크리티컬한 설명일 경우, 꼭 알아야 할 내용

// * 중요한 내용을 설명일 경우

// TODO: 향후 해야할 일을 설명 경우

// FIXME: 향후 수정이 필요한 내용일 경우 (하드 코딩 등)

// ? 소스를 볼 다른 개발자에게 문의할 경우

// 일반적인 주석
```
- 추가 중
