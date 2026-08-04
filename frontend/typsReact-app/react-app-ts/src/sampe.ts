// let userName : string = "John Doe";
// let number : number = 42;
// let isActive : boolean = true;
// 등등 typeScript의 기본 타입을 사용하여 변수를 선언할 수 있습니다.
// 
// tsc는 파일 경로를 직접 넘기기보다 프로젝트 루트에서 실행하는 게 안전합니다.
// 예: `npx tsc -p tsconfig.app.json --noEmit`
//
// `npx tsc C:\path\to\sampe.ts`처럼 파일을 직접 넘기면 tsconfig.json과 충돌해서 TS5112가 날 수 있습니다.
// typeOf 하면 type 을 주고
// npx tsc --noEmimt
// 이건 검증하는거임
//

// typscript 기반으로 할려면
// interface 를 ㅅ사용해서 객체지향적인 접근법을 해야함


interface User {
  name: string;
  password: string;
  age: number;
  isActive: boolean;
}

const user : User = {
    name: "John Doe",
    password: "securepassword",
    age: 30,
    isActive: true
}

// 등으로 이렇게 user 를 interface 로 정의하고 객체를 생성할 수 있음
// 보다 안정성이 늘어나고, 타입스크립트의 장점을 살릴 수 있음

let userAry: User[] = [
]
// 이건 user 객체를 여러개 넣을수도잇음

function addUser(newUser: User): void {
}

이렇게 해도 되고

function showMessage(user: User): string {
}
이렇게 parameter 로 user 를 받아서 string 을 return 할수도 있음

let unionType: string | number = "Hello"; // string 또는 number 타입을 가질 수 있음
// union type 은 여러 타입을 허용할 수 있음
// .? 는 optional chaining 으로, 객체의 속성이 존재하지 않을 때 에러를 방지할 수 있음
