# Interface, Enum 정의하고 사용하기
Typescript에서 타입을 정의하기 위해서는 Type과 Interface를 사용하며, [특별한 경우를 제외하고 Interface를 주로 사용합니다.](https://yceffort.kr/2021/03/typescript-interface-vs-type) 대표적으로 객체에 사용 및 타입 간의 확장을 위해서 Interface가 더 적합합니다. 우리가 구성하여 사용될 기준 Framework는 [Vitesse](https://github.com/antfu/vitesse)이며, 이를 기준으로 직접 해보는 형식으로 가이드를 구성하였습니다.
**Vitesse**를 기반으로 추가적인 기능들도 차후에 설명하겠습니다.
## Interface 선언
Interface의 선언은 기본적으로 아래의 룰을 따릅니다.
- interface는 **재사용**이 필요한 경우 (API 사용 간 request, response 정의 등) `types/` 아래 파일들에 선언합니다.
- `export`를 명시하여, 외부에서 사용할 수 있게 선언합니다.
- 사용될 요소들은 각 타입을 제대로 정의하여 사용합니다. `any` 형식의 사용은 지양합니다.
- 선언 시, 이름 앞에 `I`를 붙입니다.

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
  inout: Inout
  amount: number
  worth: number
}
```
- `|` 기호를 통해 여러 타입을 지정할 수 있습니다.

## Interface 사용 방법

### [Sample 가기](/guide/samp/samp1)