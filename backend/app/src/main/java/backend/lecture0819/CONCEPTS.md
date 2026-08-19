# 8/19 강의 개념정리 (backend.lecture0819)

`src_0819.zip`(강사 배포 소스)을 `backend.lecture0819` 패키지로 반영한 내용에 대한 주제별 개념정리 + 예시 + edge case 모음.
8/18 소스에 이어지는 누적본으로, 대부분의 파일은 8/18과 동일하며 **예외 처리**와 **Front Controller + Singleton Factory + DI 기반 블로그 미니 프레임워크**가 새로 추가되었다.
전체 흐름: 변수/문자열/배열 → 연산자/제어문 → 생성자/캡슐화 → static → OOP(상속/다형성/추상화) → enum → 싱글턴/팩토리 → 제네릭 → Collections → 람다/Stream → **예외 처리** → **Front Controller 기반 계층형 설계**.

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
- `byte x = 10, y = 10; byte sum = x + y;`는 컴파일 에러(산술 연산 결과는 자동으로 `int`로 승격되므로 명시적 캐스팅 `(byte)(x+y)` 필요).
- 지역변수는 초기화 없이 사용하면 컴파일 에러(멤버변수는 기본값으로 자동 초기화되지만 지역변수는 아님).

---

## 2. String 비교 (`StringApp.java`)

**개념정리**
- `==` : 두 참조가 같은 객체(주소)를 가리키는지 비교
- `.equals()` : 문자열의 실제 내용(값)을 비교
- 문자열 리터럴(`"lgcns"`)은 String Pool을 공유하지만, `new String(...)`은 항상 heap에 새 객체를 만듦

**Edge Case**
- 리터럴로 선언하면 String Pool 재사용으로 `==`도 `true`가 되어 헷갈리기 쉬움 — 항상 `.equals()` 사용을 원칙으로.
- `str01.equals(null)`은 `NullPointerException`이 아니라 `false`를 반환(equals는 null-safe). 반대로 `null.equals(str01)`은 NPE 발생.

---

## 3. 배열 (`AryApp.java`)

**개념정리**
- 참조타입, 단일 데이터 타입만 저장, 고정 길이(런타임 re-sizing 불가), `.length` 속성
- 인덱스 기반 `for`문 vs 향상된(enhanced) `for`문

**Edge Case**
- `ary.length`를 초과하는 인덱스로 접근하면 `ArrayIndexOutOfBoundsException` 발생(컴파일 타임에 잡히지 않음) — 이 예외는 8/19의 예외 처리 주제([15. 예외 처리](#15-예외-처리-exceptionappjava-featuresexceptionexceptiondemojava))에서 실습용 사례로도 등장.
- 배열은 생성 후 크기 변경 불가 — 요소를 더 담아야 하면 `Arrays.copyOf()`로 새 배열을 만들거나 `ArrayList`로 전환해야 함.

---

## 4. 연산자와 제어문 (`OperatorApp.java` / `features/operator/OperatorDemo.java`)

**개념정리**
- 산술/관계/논리/삼항 연산자, `switch` 표현식(화살표 `->` 문법은 fall-through 없음)
- `for` / `while` / `do-while` 반복문
- 라벨(`outer:`, `inter:`)을 붙인 중첩 반복문에서의 `break`/`continue` 제어
- 매개변수/반환타입 유무에 따른 메서드 오버로딩(`register(String,String,String)` vs `register(BlogRequestDTO)`)

**Edge Case**
- 화살표(`->`) `switch` 문법은 fall-through가 없어 `break`가 불필요.
- 라벨 없는 `break`는 가장 안쪽 반복문만 빠져나가므로, 중첩 반복문 전체를 빠져나가려면 라벨(`outer: for(...) { break outer; }`)이 필요.
- ⚠️ **컴파일 에러 주의**: `OperatorDemo.register(...)`(`OperatorDemo.java:25,27,33,35`)는 `new BlogResponseDTO(201, "OK")`처럼 2개 인자 생성자를 호출하는데, 8/19에서 `BlogResponseDTO`에 `blogId/title/content/email/viewCnt` 필드가 추가되면서 Lombok `@AllArgsConstructor`가 만드는 생성자가 7개 인자로 바뀌어 **2-인자 생성자가 더 이상 존재하지 않는다.** 강사 배포 원본 소스 자체의 문제이며, 원본 코드를 그대로 유지하기 위해 수정하지 않고 반영했다 — 실제로 컴파일하려면 `BlogResponseDTO.builder().status(201).message("OK").build()`처럼 빌더를 쓰거나 `BlogResponseDTO`에 `(int,String)` 전용 생성자를 추가해야 한다.

---

## 5. 생성자와 캡슐화 (`CarApp.java`, `TeacherApp.java`)

**개념정리**
- 생성자 오버로딩: 매개변수 타입/개수를 달리해 여러 생성자 정의
- `this()`로 생성자 간 위임 가능(단, 생성자의 첫 줄에서만 호출 가능)
- 캡슐화: `private` 필드 + `getter`/`setter`로 접근 제어, 값 검증 로직 삽입 가능

**Edge Case**
- 필드가 `private`이면 직접 접근 시 컴파일 에러 — 반드시 getter/setter 경유해야 함.
- 생성자를 하나도 정의하지 않으면 컴파일러가 기본 생성자를 자동 추가하지만, 매개변수 있는 생성자를 하나라도 정의하면 기본 생성자는 자동 추가되지 않음.

---

## 6. static 키워드 (`StaticApp.java` / `features/stat/StaticDemo.java`)

**개념정리**
- 인스턴스 멤버: 객체를 통해서만 접근, 인스턴스마다 별도 존재
- static 멤버: 클래스명으로 접근, 모든 인스턴스가 공유하는 단일 값
- `static final`: 클래스 로딩 시 한 번 초기화되는 상수, 이후 재할당 불가

**Edge Case**
- static 메서드 내부에서는 인스턴스 필드/메서드에 직접 접근할 수 없음(`this`가 없기 때문).
- static 필드는 모든 인스턴스가 공유하므로, 한 인스턴스에서 값을 바꾸면 다른 모든 인스턴스에서도 바뀐 값이 보임.

---

## 7. 상속·다형성·추상화 (`OopApp.java`, `AbstractApp.java` / `features/oop/**`)

**개념정리**
- 상속(`extends`): `StudentDTO`/`TeacherDTO`/`ManagerDTO` → `PersonDTO`, `super()`로 부모 생성자 호출
- 변수타입의 다형성: 부모 타입 변수에 자식 객체를 담을 수 있음(업캐스팅은 암묵적), 다운캐스팅은 명시적 캐스팅 필요
- 추상 클래스(`abstract class Animal`): `new`로 직접 인스턴스화 불가
- 인터페이스(`interface Flyer`): 다중 구현(`implements`) 가능, 필드는 자동 `public static final`

**Edge Case**
- 잘못된 다운캐스팅은 `ClassCastException`을 던짐 — 안전하게 하려면 `instanceof` 검사 후 캐스팅.
- `abstract class`는 직접 인스턴스화하면 컴파일 에러.
- 오버라이딩된 메서드는 "동적 바인딩"되어, 변수 선언 타입이 아니라 실제 객체 타입의 메서드가 호출됨.

---

## 8. enum (`EnumApp.java` / `features/oop/util/Flag.java`)

**개념정리**
- 서로 관련된 상수 집합을 타입 안전하게 표현 (`STUDENT`, `TEACHER`, `MANAGER`)
- enum 인스턴스는 JVM에 유일하게 하나만 존재 → `==` 비교가 `.equals()`와 동일하게 안전

**Edge Case**
- 화살표 `switch` 문에서 모든 enum 상수를 다루지 않으면 컴파일 에러 없이 조용히 아무 것도 실행되지 않을 수 있음 — `default` 추가를 습관화.
- `Flag.valueOf("XXX")`처럼 존재하지 않는 이름을 넘기면 `IllegalArgumentException` 발생.

---

## 9. 싱글턴 / 팩토리 패턴 (`TvClientApp.java` / `features/oop/factory/BeanFactory.java`, `features/oop/tv/**`)

**개념정리**
- 싱글턴(Singleton): `private` 생성자 + `static getInstance()`로 애플리케이션 전체에서 인스턴스를 하나만 유지
- 팩토리(Factory): 조건에 따라 알맞은 구현체(`LgTV`/`SamsungTV`)를 생성해 반환
- 클라이언트는 인터페이스 타입으로만 다루므로 구체 클래스에 의존하지 않음(다형성 + DIP)

**Edge Case**
- `if(instance == null) instance = new LgTV();` 방식의 싱글턴은 **스레드 안전하지 않음** — 멀티스레드 환경에서 인스턴스가 두 개 생성될 수 있음.
- 이 싱글턴/팩토리 패턴은 8/19의 [16. Front Controller + Singleton Factory + DI](#16-front-controller--singleton-factory--di-blogreactappjava-featuresblogs)에서 `BlogBeanFactory`로 한 단계 더 확장된다.

---

## 10. 제네릭 (`GenericsApp.java` / `features/generics/ResponseTemplate.java`)

**개념정리**
- 제네릭 표기 관례: `T`(type), `E`(element), `K`(key), `V`(value), `N`(number)
- `<? extends T>`: T 및 하위타입만 허용, **읽기전용** / `<? super T>`: T 및 상위타입만 허용, **쓰기전용**
- 커스텀 제네릭 클래스(`ResponseTemplate<T>`)로 응답 코드/메시지/데이터를 타입 안전하게 래핑

**Edge Case**
- 제네릭은 **타입 소거(type erasure)** 방식이라 런타임에는 `T`의 실제 타입 정보가 사라짐.
- `List<? extends PersonDTO> list = ...`로 선언하면 `list.add(new StudentDTO())`가 컴파일 에러(PECS 원칙: Producer-Extends, Consumer-Super).

---

## 11. Collections API (`CollectionApp.java`)

**개념정리**
- `List`: 순서 존재, 중복 허용, 가변 길이 / `Set`: 중복 불허, 순서 미보장 / `Map`: `{key: value}` 쌍 저장
- Stream API: `filter → map → collect` 로 이어지는 선언적(함수형) 컬렉션 가공

**Edge Case**
- `List.of(...)` / `Arrays.asList(...)` 로 만든 리스트에 `.add()`를 호출하면 `UnsupportedOperationException`.
- `for-each` 중 컬렉션을 직접 수정하면 `ConcurrentModificationException` 발생 — `Iterator.remove()`나 `removeIf()` 사용.
- `HashMap`은 키의 순서를 보장하지 않음(입력 순서를 유지하려면 `LinkedHashMap`, 정렬이 필요하면 `TreeMap`).

---

## 12. 람다 / 함수형 인터페이스 / Stream (`StreamApp.java` / `features/lambda/InspireFunction.java`)

**개념정리**
- 함수형 인터페이스: 추상 메서드가 정확히 1개인 인터페이스(`@FunctionalInterface`)
- 표준 함수형 인터페이스: `Supplier<T>`, `Consumer<T>`, `Function<T,R>`, `Predicate<T>`
- Stream: 원본 컬렉션을 변경하지 않고 가공, 중간연산(`filter`/`map`)과 최종연산(`forEach`/`collect`)으로 구성

**Edge Case**
- 람다식 안에서 참조하는 외부 지역변수는 **effectively final**이어야 함.
- Stream은 **일회성(1회 소비)** — 최종연산을 거친 스트림을 재사용하면 `IllegalStateException`.

---

## 13. Lombok 어노테이션 (DTO 전반)

**개념정리**
- 평면 DTO(`BlogRequestDTO`, `BlogResponseDTO`): `@Builder @NoArgsConstructor @AllArgsConstructor @Getter @Setter`
- 상속 계층 DTO(`PersonDTO` ← `StudentDTO`/`TeacherDTO`/`ManagerDTO`): `@SuperBuilder @Getter @Setter @ToString`

**Edge Case**
- `@SuperBuilder`는 부모와 자식 클래스 모두에 붙여야 상속 계층에서 빌더가 정상 동작함.
- `@Builder`/`@AllArgsConstructor`를 함께 쓸 때 필드가 늘어나면 `@AllArgsConstructor`가 만드는 생성자의 인자 개수도 함께 바뀐다 — 4번 항목의 `OperatorDemo` 컴파일 에러가 정확히 이 함정 때문에 발생했다. 특정 인자 조합의 생성자가 필요하면 `@Builder` 사용을 강제하거나 별도 생성자를 직접 선언해야 한다.

---

## 14. 레이어드 아키텍처 예시 (`features/blogs/domain/dto`, `repository`, `service`)

**개념정리**
- `domain/dto`: 데이터 전달 객체(요청/응답 DTO)
- `repository`: 데이터 접근 계층(현재는 배열/List 기반 mock 데이터)
- `service`: 비즈니스 로직 계층, repository에 위임

**Edge Case**
- `features/users/domain/dto`의 `UserRequestDTO`/`UserResponseDTO`는 여전히 빈 스텁 클래스 — 다음 강의(팀 프로젝트 등)에서 구현될 자리.
- 이 레이어드 구조는 8/19에 [16. Front Controller + Singleton Factory + DI](#16-front-controller--singleton-factory--di-blogreactappjava-featuresblogs)에서 `controller`/`facade`/`factory`/`view` 계층이 추가되며 확장된다(`BlogRepository`/`BlogService` 그대로 두고, `BlogReactDao`/`BlogReactService`가 새 계층을 이룸).

---

## 15. 예외 처리 (`ExceptionApp.java`, `features/exception/ExceptionDemo.java`, `features/exception/util/InspireException.java`)

**개념정리**
- 예외 발생 시점: 컴파일 타임(checked, 예: `IOException`) vs 런타임(unchecked, `RuntimeException`과 그 하위)
- 처리 방법 ① `try { } catch(예외타입 e) { } finally { }` — `finally`는 예외 발생 여부와 무관하게 항상 실행
- 처리 방법 ② `throws`로 예외를 메서드 시그니처에 선언해 호출자에게 처리를 위임(전파)
- 다중 catch: `catch (ArrayIndexOutOfBoundsException | NullPointerException e)`처럼 `|`로 여러 예외 타입을 한 블록에서 처리
- 예외 설계: 의미 없는 표준 예외 대신, 의도를 드러내는 커스텀 예외(`InspireException extends Exception`)로 변환해 던짐(`throw new XXXException(...)`)

**예시** (`ExceptionApp.java:19-27`)
```java
try {
    line = br.readLine();       // IOException: checked exception, try-catch 또는 throws 강제
} catch (IOException e) {
    e.printStackTrace();
}
```

**예시** (`ExceptionDemo.java:33-41`)
```java
public void first(int x) throws InspireException {
    try {
        if (x < 0) {
            throw new InspireException("양의 정수만 가능합니다!!");
        }
    } finally {
        System.out.println("debug >>>> first method end");
    }
}
```

**Edge Case**
- `InspireException`은 `RuntimeException`이 아니라 `Exception`을 직접 상속하는 **checked exception**이므로, 호출부는 반드시 `try-catch`로 잡거나 `throws`로 다시 선언해야 컴파일된다(`ExceptionDemo.first()`가 `throws InspireException`을 명시한 이유).
- `try` 블록 안에서 `return`을 만나도 `finally` 블록은 실행된 뒤 반환된다 — `finally`에서 또 `return`을 하면 `try`의 반환값을 덮어써버려 예외를 삼키는 버그가 될 수 있다(이 소스에는 없지만 흔한 함정).
- 다중 catch(`ArrayIndexOutOfBoundsException | NullPointerException`)에 묶인 예외 변수 `e`는 **암묵적으로 `final`** 취급되어 catch 블록 안에서 재할당하면 컴파일 에러.
- checked exception을 남발해 모든 메서드에 `throws Exception`을 붙이면 호출자가 예외 종류를 구분해 처리하기 어려워짐 — 이 소스처럼 의미 있는 커스텀 예외 타입을 만드는 것이 권장되는 이유.

---

## 16. Front Controller + Singleton Factory + DI (`BlogReactApp.java`, `features/blogs/**`)

**개념정리**
- `BlogReactView`: `Scanner`로 사용자 입력을 받는 콘솔 UI. 메뉴 번호를 `switch`로 분기하고, 잘못된 입력은 `try-catch`로 잡아 재입력을 유도(무한루프 + 예외처리 조합).
- `BlogFrontController`: 모든 요청이 거쳐가는 단일 진입점(Front Controller 패턴). `endPoint` 문자열(`"list.inspire"`)을 받아 `BlogBeanFactory`에서 알맞은 컨트롤러를 조회해 위임.
- `BlogBeanFactory`: 싱글턴(`getInstance()`) + `Map<String, Object>`로 `endPoint → controller 인스턴스`를 등록해두는 간이 DI 컨테이너. 생성자에서 `BlogReactDao` → `BlogReactServiceImpl` → `ListController` 순으로 **생성자 주입(constructor injection)** 체인을 구성.
- `ListController` → `BlogReactService`(인터페이스) → `BlogReactServiceImpl`(구현체) → `BlogReactDao` 순으로 이어지는 계층형 호출 흐름. `BlogReactService`는 인터페이스로 분리되어 있어 구현체를 교체해도 `ListController`는 영향을 받지 않음(DIP).
- `BlogReactServiceImpl`은 `list()`만 구현되어 있고 나머지(`read`/`insert`/`update`/`delete`/`search`)는 `UnsupportedOperationException`을 던지는 스텁 상태 — 다음 강의에서 채워질 자리.

**예시** (`BlogBeanFactory.java:24-31`)
```java
private BlogBeanFactory() {
    map = new HashMap<>();
    dao = new BlogReactDao();
    service = new BlogReactServiceImpl(dao);          // 생성자 주입
    map.put("list.inspire", new ListController(service));
}
```

**예시** (`BlogReactView.java:56-64`) — Front Controller 호출 흐름
```java
String endPoint = "list.inspire";
List<BlogResponseDTO> response = front.list(endPoint);
response.stream().forEach(System.out::println);
```

**Edge Case**
- `BlogBeanFactory.getInstance()`도 [9번 항목](#9-싱글턴--팩토리-패턴-tvclientappjava--featuresoopfactorybeanfactoryjava)의 `BeanFactory`와 동일하게 `if(instance == null)` 방식이라 **스레드 안전하지 않다.**
- `BlogFrontController.list(endPoint)`에서 `factory.getBean(endPoint)`가 `null`을 반환하는 경우(존재하지 않는 endPoint)를 별도로 검증하지 않아, `(ListController)controller`에서 `null`을 캐스팅한 뒤 `.list()`를 호출하는 순간 `NullPointerException`이 발생할 수 있음.
- `BlogFrontController.java`에는 실제로 쓰이지 않는 `import javax.swing.ListCellRenderer;`가 남아있음 — 컴파일 에러는 아니지만(미사용 import 경고), IDE 자동완성 흔적으로 보이는 코드 잔재.
- `BlogReactView.landingPage()`는 메뉴 `2~6`번을 아직 구현하지 않은 채(`default: break;`) 무한 `while(true)` 루프이므로, `99`(종료)를 선택하지 않는 한 계속 메뉴만 다시 출력함 — 아직 미완성 상태의 학습용 스켈레톤.

---

## 참고: 반영 시 정리한 이슈
- `backend.lecture0819` 패키지는 `lecture0813`/`lecture0814`/`lecture0818`과 동일한 컨벤션(zero-padded 폴더명, `App.java` 루트 드라이버 + `features/**` 서브패키지)을 따랐다.
- 강사 원본 소스 코드/주석/로직은 수정 없이 그대로 반영했다. 다만 [4번 항목](#4-연산자와-제어문-operatorappjava--featuresoperatoroperatordemojava)에서 설명한 대로, `BlogResponseDTO` 필드 추가로 인해 `OperatorDemo.register(...)`가 **현재 컴파일되지 않는 상태**임을 확인했다 — 원본 그대로 유지했으므로 실습 시 `BlogResponseDTO.builder()...build()` 형태로 고쳐 쓰거나 강사에게 확인이 필요하다.
