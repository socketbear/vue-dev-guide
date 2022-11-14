# Composable 영역 사용하기
개발 간 편리성을 향상 시키기 위해서 많은 기능들이 있습니다. Framework 내 `Composable` 디렉토리 아래에 구성된 `export` 항목들은 자동으로 **Global**하게 사용할 수 있습니다. 디렉토리 하단의 파일들에 정의된 항목들은 `export` 여부에 따라 자동 등록됩니다.
```js
// ~/composable/utils.ts
export const getUniqueId = (length = 16): string => {
  return Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace('.', '')
}
```
위 내용은 `~/composable/utils.ts` 위치에 정의되어 있습니다. `import` 할 필요 없이 `getUniqueId()`는 어느 곳이든 사용이 가능합니다.
> **참고**: `composable` 디렉토리 아래에 한 depth 더 들어가 디렉토리를 생성한다면, `index.ts`만 대응됩니다.

`composable`은 **typescript**로 구성한 라이브러리 들이 존재해야 하며, 공통으로 사용되지 않을 경우 여기에 정의하지 마십시오. 그리고, 최대한 **순수 함수** 형태로 구성하십시오.