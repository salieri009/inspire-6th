# 8/18 강의 개념정리 (backend.lecture0818)

`src_0818.zip`(강사 배포 소스)을 `backend.lecture0818` 패키지로 반영한 내용에 대한 주제별 개념정리 + 예시 + edge case 모음.
전체 흐름: 변수/문자열/배열 → 연산자/제어문 → 생성자/캡슐화 → static → OOP(상속/다형성/추상화) → enum → 싱글턴/팩토리 → 제네릭 → Collections → 람다/Stream.

---

## 1. 변수와 타입 (`VariableApp.java`)

**개념정리**
- 기본타입(primitive): 값 자체를 저장 (`int`, `double`, `char`, `boolean` 등)
- 참조타입(reference): 주소값을 저장, `new`로 생성하거나 배열/클래스 등
- 변수 스코프: 클래스 블록 선언 → 멤버변수 / 메서드 블록 선언 → 지역변수
- Wrapper Class를 통한 Boxing(기본→참조) / UnBoxing(참조→기본)

**예시** (`VariableApp.java:39-40`)
```java
Integer ii = 10 ;             // 오토박싱: int -> Integer
System.out.println( 10 + ii );// 언박싱되어 산술 연산: 20
```

**Edge Case**
- `Integer` 캐시 범위(-128 ~ 127) 안의 값은 `==` 비교가 우연히 `true`가 되지만, 범위를 벗어나면 서로 다른 객체라 `false`가 됨 → 항상 `.equals()`로 비교해야 함.
- `byte x = 10, y = 10; byte sum = x + y;`는 컴파일 에러(산술 연산 결과는 자동으로 `int`로 승격되므로 명시적 캐스팅 `(byte)(x+y)` 필요) — `VariableApp.java:47`에서 실제로 캐스팅하는 이유.
- 지역변수는 초기화 없이 사용하면 컴파일 에러(멤버변수는 기본값으로 자동 초기화되지만 지역변수는 아님).

---

## 2. String 비교 (`StringApp.java`)

**개념정리**
- `==` : 두 참조가 같은 객체(주소)를 가리키는지 비교
- `.equals()` : 문자열의 실제 내용(값)을 비교
- 문자열 리터럴(`"lgcns"`)은 String Pool을 공유하지만, `new String(...)`은 항상 heap에 새 객체를 만듦

**예시** (`StringApp.java:7-20`)
```java
String str01 = new String("lgcns");
String str02 = new String("lgcns");
str01 == str02;        // false (서로 다른 객체)
str01.equals(str02);   // true  (내용은 동일)
```

**Edge Case**
- 리터럴로 선언하면(`String a = "lgcns"; String b = "lgcns";`) String Pool 재사용으로 `==`도 `true`가 되어 헷갈리기 쉬움 — 코드 스타일에 따라 결과가 달라지므로 항상 `.equals()` 사용을 원칙으로.
- `str01.equals(null)`은 `NullPointerException`이 아니라 `false`를 반환(equals는 null-safe하게 구현되어 있음). 반대로 `null.equals(str01)`은 NPE 발생.

---

## 3. 배열 (`AryApp.java`)

**개념정리**
- 참조타입, 단일 데이터 타입만 저장, 고정 길이(런타임 re-sizing 불가), `.length` 속성
- 인덱스 기반 `for`문 vs 향상된(enhanced) `for`문
- 빈 슬롯(`null`)을 만나면 `break`로 순회를 끝내는 "널 종단 배열" 패턴

**예시** (`AryApp.java:46-58`)
```java
for(int idx=0 ; idx < blogsAry.length ; idx++) {
    BlogResponseDTO data = blogsAry[idx];
    if(data == null) break;   // 값이 채워지지 않은 지점에서 순회 종료
    System.out.println(data.getMessage());
}
```

**Edge Case**
- `ary.length`를 초과하는 인덱스로 접근하면 `ArrayIndexOutOfBoundsException` 발생(컴파일 타임에 잡히지 않음).
- 배열은 생성 후 크기 변경 불가 — 요소를 더 담아야 하면 `Arrays.copyOf()`로 새 배열을 만들거나 `ArrayList`로 전환해야 함.
- 향상된 for문(`for(boolean data : ary)`)에서는 인덱스를 알 수 없고, 순회 중 배열 요소를 변경할 수는 있어도 배열 자체 크기는 바꿀 수 없음.

---

## 4. 연산자와 제어문 (`OperatorApp.java` / `features/operator/OperatorDemo.java`)

**개념정리**
- 산술/관계/논리/삼항 연산자, `switch` 표현식(화살표 `->` 문법은 fall-through 없음)
- `for` / `while` / `do-while` 반복문
- 라벨(`outer:`, `inter:`)을 붙인 중첩 반복문에서의 `break`/`continue` 제어

**예시**: `popStr("inspire lgcns camp 6th")` — `charAt`으로 문자열을 뒤에서부터 순회하며 뒤집기

**Edge Case**
- 기존 `switch(x) { case 1: ... }` 문법은 `break`를 빠뜨리면 다음 case로 fall-through 되지만, 화살표(`->`) 표현식 문법은 fall-through가 없어 `break` 자체가 불필요 — 두 문법을 섞어 쓰면 혼란 발생.
- 라벨 없는 `break`는 가장 안쪽 반복문만 빠져나가므로, 중첩 반복문 전체를 빠져나가려면 반드시 라벨(`outer: for(...) { ... break outer; }`)이 필요.
- `do-while`은 조건 검사 전에 최소 1회 실행되므로, 조건이 처음부터 거짓이어도 본문이 한 번은 실행됨(일반 `while`과의 차이).

---

## 5. 생성자와 캡슐화 (`CarApp.java`, `TeacherApp.java`)

**개념정리**
- 생성자 오버로딩: 매개변수 타입/개수를 달리해 여러 생성자 정의
- `this()`로 생성자 간 위임 가능(단, 생성자의 첫 줄에서만 호출 가능)
- 캡슐화: `private` 필드 + `getter`/`setter`로 접근 제어, 값 검증 로직 삽입 가능

**예시** (`TeacherApp.java:17`)
```java
teacher.name = "inspire";   // public 필드라 직접 접근 가능(검증 로직을 넣을 수 없음)
teacher.setName("임정섭");   // setter를 거치면 검증/가공 로직 삽입 가능
```

**Edge Case**
- 필드가 `private`이면 `audi.brand = "아우디"`처럼 직접 접근 시 컴파일 에러 — 반드시 getter/setter 경유해야 함(`CarApp.java`의 주석 처리된 코드가 이 실패 사례).
- 생성자를 하나도 정의하지 않으면 컴파일러가 기본 생성자를 자동 추가하지만, 매개변수 있는 생성자를 하나라도 정의하면 기본 생성자는 자동 추가되지 않음(`new Car()` 호출이 실패하게 될 수 있음).
- `this()` 위임은 생성자 본문 첫 줄에서만 허용되며, 순환 위임(생성자 A가 B를 호출하고 B가 다시 A를 호출)은 컴파일 에러.

---

## 6. static 키워드 (`StaticApp.java` / `features/stat/StaticDemo.java`)

**개념정리**
- 인스턴스 멤버: 객체(`demo`)를 통해서만 접근, 인스턴스마다 별도 존재
- static 멤버: 클래스명(`StaticDemo.xxx`)으로 접근, 모든 인스턴스가 공유하는 단일 값
- `static final`: 클래스 로딩 시 한 번 초기화되는 상수, 이후 재할당 불가

**예시** (`StaticApp.java:12-15`)
```java
System.out.println(StaticDemo.staticMessage); // 인스턴스 없이 클래스명으로 접근
System.out.println(StaticDemo.PI);             // static final 상수
```

**Edge Case**
- static 메서드 내부에서는 인스턴스 필드/메서드에 직접 접근할 수 없음(`this`가 없기 때문) — 반드시 인스턴스를 매개변수로 받거나 새로 생성해야 함.
- `static final` 필드에 재할당을 시도하면(`StaticDemo.PI = 3.15`) 컴파일 에러.
- static 필드는 모든 인스턴스가 공유하므로, 한 인스턴스에서 값을 바꾸면 다른 모든 인스턴스에서도 바뀐 값이 보임 — 상태를 인스턴스별로 유지하고 싶다면 static으로 선언하면 안 됨.

---

## 7. 상속·다형성·추상화 (`OopApp.java`, `AbstractApp.java` / `features/oop/**`)

**개념정리**
- 상속(`extends`): `StudentDTO`/`TeacherDTO`/`ManagerDTO` → `PersonDTO`, `super()`로 부모 생성자 호출
- 변수타입의 다형성: 부모 타입 변수에 자식 객체를 담을 수 있음(업캐스팅은 암묵적)
- 다운캐스팅: 자식 고유 필드/메서드에 접근하려면 `(ManagerDTO)manager`처럼 명시적 캐스팅 필요
- 추상 클래스(`abstract class Animal`): `new`로 직접 인스턴스화 불가, 하위 클래스가 abstract 메서드 구현 의무
- 인터페이스(`interface Flyer`): 다중 구현(`implements`) 가능, 필드는 자동 `public static final`
- 매개변수의 다형성: `OopService.makePerson(Flag, ...)`처럼 enum으로 어떤 하위타입을 만들지 분기(팩토리 메서드 패턴)

**예시** (`OopApp.java:38-46`)
```java
PersonDTO manager = new ManagerDTO("김혜림", 20, "서울", "교육사무국");
System.out.println(manager.getName());              // 부모 타입 메서드는 바로 호출 가능
System.out.println(((ManagerDTO)manager).getDept()); // 자식 고유 필드는 다운캐스팅 필요
```

**Edge Case**
- 잘못된 다운캐스팅은 `ClassCastException`을 던짐 — 예를 들어 실제 객체가 `StudentDTO`인데 `(ManagerDTO)`로 캐스팅하면 런타임 예외. 안전하게 하려면 `instanceof` 검사 후 캐스팅(`OopApp.java`의 주석 처리된 코드가 이 안전한 패턴을 보여줌).
- `abstract class`는 `new Animal()`처럼 직접 인스턴스화하면 컴파일 에러.
- 오버라이딩된 메서드(`personInfo()`)는 "동적 바인딩"되어, 변수 선언 타입이 아니라 실제 객체 타입의 메서드가 호출됨(`PersonDTO per = ary[idx]`여도 실제로는 `TeacherDTO.personInfo()`가 실행).
- 인터페이스를 구현하고도 메서드를 구현하지 않으면(`SuperMan`이 `throw new UnsupportedOperationException()`으로 스텁 처리한 것처럼) 컴파일은 되지만 호출 시점에 런타임 예외가 발생.

---

## 8. enum (`EnumApp.java` / `features/oop/util/Flag.java`)

**개념정리**
- 서로 관련된 상수 집합을 타입 안전하게 표현 (`STUDENT`, `TEACHER`, `MANAGER`)
- `switch` 화살표 표기에서 case 값으로 상수명만 사용
- enum 인스턴스는 JVM에 유일하게 하나만 존재 → `==` 비교가 `.equals()`와 동일하게 안전

**예시** (`EnumApp.java:10-14`)
```java
switch (flag) {
    case STUDENT -> System.out.println("학생");
    case TEACHER -> System.out.println("강사");
    case MANAGER -> System.out.println("매니저");
}
```

**Edge Case**
- 화살표 `switch` 문에서 모든 enum 상수를 다루지 않으면(`default` 없이 일부만 처리) 컴파일 에러가 나지 않고 그냥 아무 것도 실행되지 않을 수 있음 — 새 enum 상수가 추가됐을 때 switch 케이스를 놓치기 쉬우므로 주의(`default` 추가를 습관화).
- enum은 생성자를 `private`으로만 선언 가능(외부에서 `new Flag(...)` 불가) — 상수는 클래스 로딩 시 한 번만 생성됨.
- `Flag.valueOf("XXX")`처럼 존재하지 않는 이름을 넘기면 `IllegalArgumentException` 발생.

---

## 9. 싱글턴 / 팩토리 패턴 (`TvClientApp.java` / `features/oop/factory/BeanFactory.java`, `features/oop/tv/**`)

**개념정리**
- 싱글턴(Singleton): `private` 생성자 + `static getInstance()`로 애플리케이션 전체에서 인스턴스를 하나만 유지
- 팩토리(Factory): 브랜드 문자열 등 조건에 따라 알맞은 구현체(`LgTV`/`SamsungTV`)를 생성해 반환
- 클라이언트는 `TV` 인터페이스 타입으로만 다루므로 구체 클래스에 의존하지 않음(다형성 + DIP)

**예시** (`TvClientApp.java:10-13`)
```java
BeanFactory factory = BeanFactory.getInstance();
TV tv = factory.getBrand("lg");
tv.turnOn();
```

**Edge Case**
- 이 코드의 싱글턴 구현(`if(instance == null) instance = new LgTV();`)은 **스레드 안전하지 않음** — 멀티스레드 환경에서 동시에 `getInstance()`를 호출하면 인스턴스가 두 개 생성될 수 있음(실무에서는 `synchronized` 또는 `enum` 싱글턴, 정적 초기화 방식을 사용).
- `private` 생성자는 일반적인 방법으로는 우회 불가하지만, 리플렉션(`Constructor.setAccessible(true)`)으로는 우회 가능 — 완벽한 차단은 아님(참고 지식).
- `factory.getBrand("samsung")`처럼 오타나 지원하지 않는 브랜드 문자열을 넘기면 `null`을 반환할 수 있어, 반환값을 바로 `tv.turnOn()` 하면 `NullPointerException` 위험.

---

## 10. 제네릭 (`GenericsApp.java` / `features/generics/ResponseTemplate.java`)

**개념정리**
- 제네릭 표기 관례: `T`(type), `E`(element), `K`(key), `V`(value), `N`(number)
- `<? extends T>`: T 및 하위타입만 허용, **읽기전용**(꺼내 쓰기는 가능, 넣기는 사실상 불가)
- `<? super T>`: T 및 상위타입만 허용, **쓰기전용**(넣기는 가능, 꺼낼 때는 Object로만 안전)
- 커스텀 제네릭 클래스(`ResponseTemplate<T>`)로 응답 코드/메시지/데이터를 타입 안전하게 래핑

**예시** (`GenericsApp.java:40-41`)
```java
ResponseTemplate<List<PersonDTO>> response =
    new ResponseTemplate<List<PersonDTO>>(200, "OK", personList);
```

**Edge Case**
- 제네릭은 **타입 소거(type erasure)** 방식이라 런타임에는 `T`의 실제 타입 정보가 사라짐 — `new T()`처럼 제네릭 타입 파라미터로 직접 인스턴스를 생성할 수 없고, `List<String>`과 `List<Integer>`는 런타임에 같은 클래스(`List`)로 취급됨.
- `List<? extends PersonDTO> list = ...` 로 선언하면 `list.add(new StudentDTO())`가 컴파일 에러 — 컴파일러가 실제 타입을 알 수 없어 안전하지 않다고 판단하기 때문(PECS 원칙: Producer-Extends, Consumer-Super).
- 원시 타입(raw type, `List list = new ArrayList()`처럼 제네릭 없이 선언)을 사용하면 타입 안전성을 잃고 `ClassCastException`을 런타임에 만날 위험이 커짐 — `lecture818/Colleciton.java`의 `list list = new ArrayList()`가 바로 이런 오류(대문자 `List`가 아니라 소문자 `list`를 타입으로 착각한 오타)의 예.

---

## 11. Collections API (`CollectionApp.java`)

**개념정리**
- `List`: 순서 존재, 중복 허용, 가변 길이
- `Set`: 중복 불허, 순서 미보장(구현체에 따라 다름 — `HashSet`은 순서 보장 X)
- `Map`: `{key: value}` 쌍 저장, JSON 객체와 유사한 구조
- Boxing/UnBoxing: `int` ↔ `Integer` 등 Wrapper Class 상호 변환
- Stream API: `filter → map → collect` 로 이어지는 선언적(함수형) 컬렉션 가공

**예시** (`CollectionApp.java:84-87`)
```java
List<String> filteringList = personList.stream()
    .filter(s -> s.getName().startsWith("j"))
    .map(s -> s.getName().toUpperCase())
    .collect(Collectors.toList());
```

**Edge Case**
- `List.of(...)` / `Arrays.asList(...)` 로 만든 리스트에 `.add()`를 호출하면 `UnsupportedOperationException` — 불변(또는 고정 크기) 리스트이기 때문(`Arrays.asList`는 크기 고정, `set()`은 가능하지만 `add()`/`remove()`는 불가).
- `for(String s : list) { list.remove(s); }` 처럼 `for-each` 중 컬렉션을 직접 수정하면 `ConcurrentModificationException` 발생 — `Iterator.remove()`나 `removeIf()`를 사용해야 안전.
- `HashMap`은 키의 순서를 보장하지 않음(입력 순서를 유지하려면 `LinkedHashMap`, 정렬이 필요하면 `TreeMap` 사용).
- `HashSet`에 중복 값을 `add()`해도 예외 없이 무시됨(`set.add("jslim")`을 두 번 호출해도 크기는 늘지 않음) — `CollectionApp.java:100-104`에서 확인 가능.
- `HashMap`은 `null` 키를 1개까지 허용하지만, `Hashtable`/`ConcurrentHashMap`은 `null` 키/값 자체를 허용하지 않아 `NullPointerException` 발생.

---

## 12. 람다 / 함수형 인터페이스 / Stream (`StreamApp.java` / `features/lambda/InspireFunction.java`)

**개념정리**
- 함수형 인터페이스: 추상 메서드가 정확히 1개인 인터페이스(`@FunctionalInterface`), 람다식을 대입할 수 있음
- 표준 함수형 인터페이스: `Supplier<T>`(공급, 매개변수 없이 값 반환), `Consumer<T>`(소비, 반환값 없음), `Function<T,R>`(입력→출력 변환), `Predicate<T>`(조건 판별→boolean)
- `Consumer.andThen()`으로 소비 동작을 체이닝
- Stream: 원본 컬렉션을 변경하지 않고 가공, 중간연산(0~N개, `filter`/`map`)과 최종연산(1개, `forEach`/`collect`)으로 구성, 메서드 참조(`System.out::println`)

**예시** (`StreamApp.java:36-40`)
```java
Consumer<String> consumer = (str) -> System.out.println(str.split(" ")[0]);
consumer.andThen(System.out::println).accept("lgcns inspire");
```

**Edge Case**
- 람다식 안에서 참조하는 외부 지역변수는 **effectively final**(값이 바뀌지 않는 변수)이어야 함 — 람다 안에서 외부 지역변수를 재할당하면 컴파일 에러.
- Stream은 **일회성(1회 소비)** — 한 번 최종연산(`forEach`, `collect` 등)을 거친 스트림 객체를 재사용하면 `IllegalStateException: stream has already been operated upon or closed` 발생(`StreamApp.java:79`에서 `brands.stream()`을 다시 호출해 새 스트림을 만드는 이유).
- `Predicate.test()`는 boxed `Boolean`을 반환하도록 코드가 짜여 있으면(`Boolean isFlag = predicate.test(...)`) 언박싱 과정에서 `null`이 들어올 경우 `NullPointerException` 위험.
- `Optional`을 다루지 않고 `stream().filter(...).findFirst().get()`처럼 바로 `get()`을 호출하면, 조건에 맞는 요소가 없을 때 `NoSuchElementException` 발생.

---

## 13. Lombok 어노테이션 (DTO 전반)

**개념정리**
- 평면 DTO(`BlogRequestDTO`, `BlogResponseDTO`): `@Builder @NoArgsConstructor @AllArgsConstructor @Getter @Setter`
- 상속 계층 DTO(`PersonDTO` ← `StudentDTO`/`TeacherDTO`/`ManagerDTO`): `@SuperBuilder @Getter @Setter @ToString`

**Edge Case**
- `@SuperBuilder`는 **부모와 자식 클래스 모두에** 붙여야 상속 계층에서 빌더가 정상 동작함 — 부모에만 붙이고 자식에 빠뜨리면 컴파일 에러.
- `@Builder`와 `@NoArgsConstructor`를 함께 쓰면 "이미 정의된 생성자와 충돌" 경고/에러가 날 수 있어, 보통 `@AllArgsConstructor`를 같이 붙여 `@Builder`가 사용할 생성자를 명시해줘야 함.
- `@Data`(getter/setter/toString/equals/hashCode 자동 생성)와 `@ToString(callSuper=true)`를 혼용할 때, `callSuper`를 빠뜨리면 부모 필드가 `toString()` 결과에 안 보여 디버깅 시 혼란을 줄 수 있음.

---

## 14. 레이어드 아키텍처 예시 (`features/blogs/domain/dto`, `repository`, `service`)

**개념정리**
- `domain/dto`: 데이터 전달 객체(요청/응답 DTO)
- `repository`: 데이터 접근 계층(현재는 배열 기반 mock 데이터)
- `service`: 비즈니스 로직 계층, repository에 위임

**Edge Case**
- `features/users/domain/dto`의 `UserRequestDTO`/`UserResponseDTO`는 현재 빈 스텁 클래스 — 다음 강의(팀 프로젝트 등)에서 구현될 자리로 보이며, 아직 필드/어노테이션이 없어 그대로 사용하면 컴파일은 되지만 아무 기능이 없음.
- `BlogRepository`가 배열 기반 mock 데이터를 반환하는 구조라, 실제 DB 연동 없이도 서비스 계층 테스트가 가능하지만 데이터가 애플리케이션 재시작 시 초기화됨(영속성 없음)을 인지해야 함.

---

## 참고: 반영 시 정리한 이슈
- 기존 `backend/lecture818/Colleciton.java`(오타 `imporrt`, 클래스명 `Colleciton`, 소문자 `list` 타입, 문법 오류 `==`)는 삭제하고, 강사 소스의 정상 동작하는 `CollectionApp.java`로 대체했습니다.
- `backend.lecture0818` 패키지는 `lecture0813`/`lecture0814`와 동일한 컨벤션(zero-padded 폴더명, `App.java` 루트 드라이버 + `features/**` 서브패키지, "[학습 정리]" 한글 주석)을 따랐습니다.
