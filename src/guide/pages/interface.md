# Interface, Enum 정의하고 사용하기
Typescript에서 타입을 정의하기 위해서는 Type과 Interface를 사용하며, [특별한 경우를 제외하고 Interface를 주로 사용합니다.](https://yceffort.kr/2021/03/typescript-interface-vs-type) 대표적으로 객체에 사용 및 타입 간의 확장을 위해서 Interface가 더 적합합니다. 우리가 구성하여 사용될 기준 Framework는 [Vitesse](https://github.com/antfu/vitesse)이며, 이를 기준으로 직접 해보는 형식으로 가이드를 구성하였습니다.
**Vitesse**를 기반으로 추가적인 기능들도 차후에 설명하겠습니다.
## Interface 선언
Interface의 선언은 기본적으로 아래의 룰을 따릅니다.
- interface는 프로젝트 전체에서 사용되는 Component나 Utils에 대해서는 `~/types`에 정의합니다.
- 각 서비스 별 디렉토리에 `types` 디렉토리에서 정의합니다.
- `export`를 명시하여, 외부에서 사용할 수 있게 선언합니다.
- 사용될 요소들은 각 타입을 제대로 정의하여 사용합니다. `any` 형식의 사용은 지양합니다.
- 선언 시, 이름 앞에 `I`를 붙입니다.
- 정의된 interface를 import 할 경우 `import type`으로 가져와야 합니다.

> **tip**: `~` 는 `/src` 디렉토리를 의미합니다.

```js
// 사용 사례
export interface IAvatar {
  id: string
  name: string
  color?: string
  budget: number
  unit: string
  trans?: number
  useReport: boolean
}
```
- `?`를 사용하는 경우는 그 값이 필수값이 아닐 경우이며, 이 기호가 없을 경우는 필수 값입니다.
- 필수 값을 경우 객체를 셋팅할 때, 값을 셋팅하지 않으면 안됩니다.
- interface 요소 안에 또 다른 interface나 enum을 사용할 수 있습니다.

```js
import type { FINANCIAL_TYPE, IN_OUT } from './enums'

export interface IFinancial {
  id: string
  parentType: FINANCIAL_TYPE | string
  childType: FINANCIAL_TYPE | string
  inout: IN_OUT
  amount: number
  worth: number
}
```
- `|` 기호를 통해 여러 타입을 지정할 수 있습니다.
- `enum` 형을 interface 선언하기 위해 type으로 사용하는 경우 `import type`으로 가져와 사용해야 합니다.

## Interface 사용 방법
Interface를 사용하는 건 독립적으로 제공되는 뭔가를 사용할 때 그 빛을 발합니다. 서버의 API 호출할 때, 이미 만들어진 컴포넌트를 호출할 때, 공통 함수를 호출할 때 등등 **이걸 사용하기 위해서는 어떤 파라미터를 전달해야 했지?** 라고 생각하며 항상 정의했던 대로 가서 확인했던 일은 현저히 줄어들 것입니다. 사용 할 때 `IDE`에서 가이드를 줄 것입니다. 필수 값을 정의하지 않았다면 않았다고 노티를 줄 것이고, 어떤 타입으로 넣어야 할지 가이드도 할 것입니다.
Interface는 Framework내 `~/types` 디렉토리에서 적절한 namespace를 가진 파일안에 선언될 것이며, 이를 가져와 사용하면 됩니다. 각 서비스에서 사용되는 경우 `~/[서비스 명]/types`에 위치합니다.
```js
import { IAvatar } from '~/types'
// ...
// 일반적인 상수로 선언할 때,
const bank: IAvatar = {
  id: 'bank',
  name: '부자은행',
  color: 'bg-gray-500',
  budget: 0,
  unit: '',
  useReport: false,
}
// ref로 선언할 때,
// ref는 타입 정의를 ref<> 안에서 정의합니다.
const bank = ref < IAvatar > ({
  id: 'bank',
  name: '부자은행',
  color: 'bg-gray-500',
  budget: 0,
  unit: '',
  useReport: false,
})
// reactive로 선언할 때,
const bank: IAvatar = reactive({
  id: 'bank',
  name: '부자은행',
  color: 'bg-gray-500',
  budget: 0,
  unit: '',
  useReport: false,
})

// id 값은 string으로 parameter 셋팅 되고, return 되는 값은 IAvatar 일 경우,
const getPlayer = (id: string): IAvatar => {
  // ...
}
```

## Enum 선언
열거형은 상태 (ex: 문서 진행 간 각각의 상태 값을 정의, 각각 레포트의 수입/지출 상태 정의 등) 값을 정의할 때, 많이 사용 됩니다. Enum은 특이하게 Object 혹은 Type으로 사용이 가능합니다.

Enum의 선언은 기본적으로 아래의 룰을 따릅니다.
- Enum은 프로젝트 전체에서 사용되는 Component나 Utils에 대해서는 `~/types/enums/` 아래 파일들에 선언합니다.
- 각 서비스 별 디렉토리에 `types/enums` 디렉토리에서 정의합니다.
- `export`를 명시하여, 외부에서 사용할 수 있게 선언합니다.
- Enum은 상수 선언이므로, 대문자로 구성하며, 단어와 단어 사이는 `_`로 표현합니다.
```js
// 일반적인 사용 방법
// interface 정의에 사용될 경우
import type { FINANCIAL_TYPE, IN_OUT } from './enums'

export enum IN_OUT {
  IN = 'in',
  OUT = 'out',
}

// 값을 넣지 않으면 자동으로 0부터 숫자로 셋팅됨 (배열은 아닙니다.)
export enum UNIT_POSITION {
  FRONT, // FRONT = 0
  BACK, // BACK = 1
}

export interface IFinancial {
  id: string
  parentType: FINANCIAL_TYPE | string
  childType: FINANCIAL_TYPE | string
  inout: IN_OUT
  amount: number
  worth: number
}
```
> **참고**: Enum 선언 간 값을 셋팅하지 않으면, 자동으로 0부터 카운팅 되어 셋팅됩니다. Object 형태로 만들어 질 때, Key 값을 중복하여 생성됩니다. 정의한 내역이 2개라면, Key 값은 4개 생성됩니다. Enum에 정의한 값이 몇개인지 카운팅 할적에는 위의 예제에 IN_OUT과 같이 값을 정의한 항목만 `Object.keys()`로 key 값을 추출하여 카운팅 하면 됩니다.

## Enum 사용 방법
기존 상수 값을 좀 더 유려하게 처리하는 방법인 Enum의 사용 법은 그리 어렵지 않습니다. 단지 선언에서 차이가 있는데 Type으로 사용할 것인지, 아니면 정의된 값을 사용할 것인지에 따라 선언하는 방식이 다릅니다. 해당 내용은 Interface항목에 정의했으니 같이 확인하십시오.
```js
enum IN_OUT {
  IN = 'in',
  OUT = 'out',
}

// ...
const reportState: IN_OUT = IN_OUT.IN

// 이미 형이 정의된 내역이면 바로 값을 넣어도 자동으로 형이 셋팅
const reportState = IN_OUT.IN
```
### [Sample 가기](/guide/samp/samp1)
