# TIP & Tricks
## links
- [Json 값을 가지로 Type 추출하기](https://transform.tools/json-to-typescript)

## 항목
### `pnpm run dev`에서 아래와 같은 에러가 출력될 경우.
```cmd
C:\workspace\vue-dev-guide\node_modules\.pnpm\bindings@1.5.0\node_modules\bindings\bindings.js:126
  err = new Error(
        ^

Error: Could not locate the bindings file. Tried:
 → C:\workspace\vue-dev-guide\node_modules\.pnpm\deasync@0.1.20\node_modules\deasync\build\deasync.node  
 ```
이 경우, `node-gyp` 사용하는 빌드 문제이며, `pnpm rebuild` 명령을 수행하면 된다. (Python 3.x 설치 필요)