# Coding Guide
- 순수 함수를 사용할 경우, `parameter`와 `return` 되는 값은 **Type** 정의 하십시오. 일반적인 함수도 `parameter`가 있는 경우 필수로 **Type** 정의해야합니다.
- Component, page의 명칭은 **고유**해야 합니다. 자동으로 `import` 기능을 사용함에 따라 동일한 명칭을 가진 파일들이 존재하면 무한 루프가 발생할 수 있습니다. `directoryAsNamespace: true` 로 사용하는 경우 디렉토리 path를 넣어야 사용이 가능합니다. (현재 반영된 상태)
- 공통으로 사용되는 Component 만 `~/components`에 넣어야 합니다.
- 특정 영역에서 사용되는 Component는 따로 서비스 별 디렉토리를 만들어 구성합니다.
- 추가 중
