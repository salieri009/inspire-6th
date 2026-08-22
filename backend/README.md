# backend

LG CNS Inspire 6기 백엔드(Java/Gradle) 강의 아카이브. 강사가 매 수업일 배포하는 소스 zip을
`backend.lectureMMDD` 패키지로 하루 단위로 반영해온 결과물이며, 특히 `features/blogs/**`는 여러 날에
걸쳐 계속 확장되어온 하나의 미니 애플리케이션이다. 이 문서는 git 커밋 로그를 다시 훑어보며 "코드가 어떤
순서로, 왜 그렇게 만들어졌는지"와 "날짜별로 어떤 개념이 쌓여왔는지"를 한 곳에서 정리한 것이다.

**빌드/실행**: JDK 21 toolchain(`app/build.gradle`), `./gradlew compileJava`로 컴파일. `application`
플러그인의 기본 실행 클래스는 `backend.App`(`mainClass = 'backend.App'`)이며, 각 `lectureMMDD` 패키지의
`XxxApp.java` 드라이버들은 개별적으로 `main()`을 가진 데모 진입점이다.
Windows에서는 `gradlew.bat`을 쓰되, 08-11~08-21 사이에 커밋되어 있던 버전은 0바이트로 깨져 있었으니(아래
"알려진 이슈" 참고) 그 시기 코드를 과거 커밋에서 되돌려 받는다면 유의할 것.

---

## 타임라인 / 코딩 로그

`dev` 브랜치 기준 선형 히스토리, backend 관련 첫 커밋은 `ddd4121`(2026-08-11)이다. 그 이전
(2026-07-28~08-11, 37개 커밋)은 별개의 프론트엔드(HTML/CSS/React) 학습 트랙이라 여기서는 다루지 않는다.

| Phase | 기간 | 주요 커밋 | 내용 |
|---|---|---|---|
| 1. 스캐폴드 + 손코딩 practice | 08-11~08-13 | `ddd4121`, `d01ef76`, `6ac62df`, `65eeaa2` | Gradle 프로젝트 구성(wrapper, build.gradle, 버전 카탈로그); `App.java`/`blogApp.java`/`statsApp.java` 컴파일 오류 수정; Lombok 의존성 추가; static/GuessGame, 배열/OOP 연습 코드 |
| 2. lecture0813 임포트 | 08-13 | `9430eb2`, `f785dbd` | 첫 강사 zip 반영(26개 파일 변경): 변수, 연산자, static, 문자열, 생성자, 배열, 블로그 DTO 계층, 상속 |
| 3. lecture0814 임포트 | 08-14 | `3ec07ac` | 39개 파일 변경: `@SuperBuilder`, enum 기반 팩토리 CRUD, 추상화, 싱글턴+팩토리(TV/BeanFactory) |
| 4. lecture0818 임포트 | 08-18 | `4e192f2` | 45개 파일 변경 + 첫 `CONCEPTS.md`: 제네릭, Collections, 람다/Stream |
| 5. lecture0819 임포트 | 08-19 | `4213efa` | 57개 파일 변경 + `CONCEPTS.md`: 예외 처리, Front Controller + Singleton Factory + DI 블로그 미니 프레임워크 도입 |
| 6. lecture0820 임포트 + 완성 + 정리 | 08-20 | `188a403`, `b657719`, `d75a789` | 60개 파일 변경(Streams API) + 컴파일 버그 2건 동봉 수정; 죽은 practice 스텁/미사용 guava 의존성 제거; 블로그 CRUD(insert/read/search) 완성 |
| 7. 인프라 + 전날 버그 수정 | 08-21 | `3089c1f`, `9f10691` | 깨져있던 Windows Gradle wrapper(`gradlew.bat`) 복구; lecture0819의 read 기능 완성으로 전체 모듈 빌드 차단 문제 해소 |
| 8. lecture0821 임포트 | 08-22(커밋일) | `29e98fb` | 65개 파일 변경 + `CONCEPTS.md`: I/O 스트림, 직렬화, 파일 영속성, CRUD 완성, `ResponseEntity<T>` |

각 해시는 `git show --stat <hash>` / `git show <hash>`로 더 깊이 들여다볼 수 있다.

---

## 논리적 흐름

1. **스캐폴드가 먼저다.** 어떤 zip도 반영하기 전에 Gradle 프로젝트 자체(wrapper, `build.gradle`, 버전
   카탈로그)가 서 있어야 했고, 그 과정에서 이미 있던 손코딩 practice 파일들(`App.java`, `blogApp.java`,
   `statsApp.java`)의 컴파일 오류부터 잡아야 했다(`d01ef76`). Lombok도 이 시점에 추가됐다 — 이후 모든
   날짜의 DTO들이 `@Builder`/`@Getter`/`@Setter`에 의존하게 되는 전제 조건이다.
2. **하루 단위 zip 임포트가 몸통이다.** `lecture0813`부터 `lecture0821`까지, 각 커밋은 그날 배포된 강사
   zip을 `backend.lectureMMDD` 패키지로 그대로 옮기는 것이 기본 동작이다(패키지 선언/`import`만
   재작성). 이후 날짜의 zip은 이전 날짜 파일을 대부분 그대로 포함하고 있어서, 실제로는 매일 "전날 +
   오늘의 델타"에 가깝다 — 그래서 0818부터는 순수 신규 파일 수보다 "무엇이 바뀌었는가"가 더 중요한
   정보가 된다.
3. **`features/blogs/**`가 유일하게 계속 진화하는 부분이다.** `car`/`oop/*`/`operator`/`stat`/`users`/
   `var`/`generics`/`lambda`/`exception` 같은 나머지 데모 패키지들은 0818~0819 이후로는 더 이상 자라지
   않는다. 반면 블로그 기능은 "평평한 DTO + Repository + Service"(0813)에서 시작해 "Front Controller +
   Singleton Factory + DI 미니 프레임워크"(0819)로, 그다음 CRUD 엔드포인트가 하나씩 늘어나며(0820:
   insert/search, 0821: update/delete + 파일 영속성 + `ResponseEntity<T>`) 실제로 리팩터링/기능추가가
   반복되는 살아있는 코드베이스처럼 움직인다. 아래 "디렉터리 구조 참고"의 성장 표 참고.
4. **두 개의 반복되는 유지보수 실(thread)이 "매일 임포트"만으로는 설명 안 되는 커밋들을 만든다.**
   - `BlogResponseDTO`의 2-인자 생성자(`status`, `message`) 누락: 강사 원본 zip 자체가 이 생성자 없이
     배포되는데, `OperatorDemo.java`가 매번 이 생성자를 호출한다. `188a403`에서 0819/0820에 한 번,
     `29e98fb`에서 0821에 다시 한 번 — 강사 소스가 고쳐지지 않는 한 앞으로도 반복될 가능성이 높은
     패턴.
   - `gradlew.bat`이 `d01ef76`(08-11)부터 `3089c1f`(08-21)까지 **약 10일간 0바이트로 깨져 있었다.**
     Windows에서 cmd/PowerShell/IDE의 Gradle 연동이 그 기간 내내 실행 자체가 안 됐다는 뜻이며, 그
     기간 동안 에디터에서 보였던 광범위한 Lombok/JDT 오류 표시의 유력한 원인으로 지목된다.
5. **`9f10691`은 "하루 늦게 원인이 드러난" 특이 케이스다.** 0820에서 이미 완성한 것과 똑같은 `read`
   기능을 누군가 0819 패키지에 손으로 옮겨 적다가 문법 오류(`sout(...)`, `Interger parse(...)`, 존재하지
   않는 `ReadController` 참조)를 남겼고, 이 한 파일의 문법 오류가 **전체 모듈의 컴파일을 막고 있었다.**
   0820과 동일한 패턴으로 기능을 마저 완성해 해소했다 — "왜 0819를 다시 손대는가"에 대한 답은 "새 기능을
   위해서"가 아니라 "빌드가 깨져 있어서"다.

---

## 지식 기반 진행 (개념 로드맵)

App 드라이버 등장 순서(그날 처음 추가된 것, 누적):

| 날짜 | 새로 추가된 App 드라이버 | 비고 |
|---|---|---|
| 0813 | `App`, `AryApp`, `BlogApp`, `CarApp`, `GuessGameApp`, `OopApp`, `OperatorApp`, `StaticApp`, `StringApp`, `TeacherApp`, `VariableApp` | 최초 스냅샷(11개) |
| 0814 | `AbstractApp`, `EnumApp`, `TvClientApp` | 추상클래스, enum, 싱글턴/팩토리 |
| 0818 | `CollectionApp`, `GenericsApp`, `StreamApp` | 제네릭, Collections, 람다/Stream |
| 0819 | `BlogReactApp`, `ExceptionApp` | 예외 처리, Front Controller 프레임워크 |
| 0820 | `BlogStreamApp` | Streams API(filter/map/collect/groupingBy/Optional) |
| 0821 | `IOStreamApp` | I/O 스트림, 직렬화 |

`lecture0818`/`lecture0819`/`lecture0821`은 각각 자체 `CONCEPTS.md`를 갖고 있어 개념정리 + 예시 +
edge case까지 상세히 문서화되어 있다 — 깊이 있게 보려면 아래 링크를 따라가면 된다:

- [`lecture0818/CONCEPTS.md`](app/src/main/java/backend/lecture0818/CONCEPTS.md) — 제네릭, Collections API, 람다/함수형 인터페이스/Stream 등 §1~14 (변수~레이어드 아키텍처까지 그날 기준 누적 전체를 다룸)
- [`lecture0819/CONCEPTS.md`](app/src/main/java/backend/lecture0819/CONCEPTS.md) — 위 §1~14에 예외 처리(§15), Front Controller + Singleton Factory + DI(§16) 추가 (역시 누적 전체 문서)
- [`lecture0821/CONCEPTS.md`](app/src/main/java/backend/lecture0821/CONCEPTS.md) — 그날 새로 배운 것만: I/O 스트림, 객체 직렬화/역직렬화, 파일 영속성, CRUD 완성, `ResponseEntity<T>` 패턴(§1~6, 0813~0820 누적 개념은 다시 싣지 않고 위 문서를 참조하도록 되어 있음)

`lecture0813`/`lecture0814`/`lecture0820`은 아직 전용 `CONCEPTS.md`가 없다 — App 드라이버/패키지
구성으로 짐작할 수 있는 그날의 핵심 주제만 간단히 남긴다:
- **0813**: 변수·타입, 문자열 비교(`==` vs `.equals()`), 배열, 연산자/제어문, 생성자 오버로딩과 캡슐화,
  static 키워드, 상속(`PersonDTO`→`Student/Teacher/ManagerDTO`) 기초.
- **0814**: 추상 클래스/인터페이스(`Animal`/`Flyer`), enum, 싱글턴+팩토리 패턴(`TvClientApp`,
  `BeanFactory`) — `@SuperBuilder`로 상속 계층 DTO 빌더 확장.
- **0820**: `BlogStreamApp`의 Streams API 실전 활용(filter/map/collect/groupingBy/Optional) — 코드
  자체는 [`lecture0819/CONCEPTS.md`](app/src/main/java/backend/lecture0819/CONCEPTS.md)의 §12(람다/Stream)
  연장선.

---

## 디렉터리 구조 참고

- **패키지 컨벤션**: 매일 배포되는 원본 zip은 `package features...;`(레포 접두어 없음)로 되어 있고,
  이를 `backend/app/src/main/java/backend/lectureMMDD/`로 옮기며 `package
  backend.lectureMMDD.features...;`로, 드라이버 클래스는 `package backend.lectureMMDD;`로 다시 쓴다.
  내부 `import features....` 구문도 동일하게 재작성한다.
- **`features/blogs/**` 성장 표** (날짜 간 구조 diff, 연속 두 날짜 비교):

  | 구간 | 추가/변경 | 결과 |
  |---|---|---|
  | 0813→0818 | (변화 없음) | `domain/dto`, `repository`(`BlogRepository`), `service`(`BlogService`)만 존재 |
  | 0818→0819 | `controller/{List,Read}Controller`, `facade/BlogFrontController`, `factory/BlogBeanFactory`, `repository/BlogReactDao`(신규, 기존 `BlogRepository`와 별도), `service/{BlogReactService, BlogReactServiceImpl}`, `view/BlogReactView` | Front Controller + Singleton Factory + DI 골격 도입 |
  | 0819→0820 | `controller/{Insert,Search}Controller` | list+read+insert+search 4개 컨트롤러 |
  | 0820→0821 | `controller/{Delete,File,Update}Controller`, `util/ResponseEntity.java` | CRUD 전체(7개 컨트롤러) + 파일 영속성 + `ResponseEntity<T>` |

- **`Java_practice/`와 `backend/` 루트의 `App.java`/`oopApp.java`/`statsApp.java`**는 `lectureMMDD`
  컨벤션이 생기기 전(2026-08-13 이전)의 손코딩 연습 코드다 — 7번째 강의일이 아니라 스캐폴드 단계의
  잔재이니 혼동하지 말 것.

---

## 알려진 이슈 / 참고사항

- **`BlogResponseDTO` 2-인자 생성자 누락**: 강사 배포 zip의 `BlogResponseDTO`는 Lombok
  `@NoArgsConstructor`/`@AllArgsConstructor`만 갖고 있어 `OperatorDemo.register(...)`가 호출하는
  `new BlogResponseDTO(201, "OK")` 같은 2-인자 생성자가 없다. `lecture0819`/`lecture0820`/`lecture0821`
  모두 이 생성자를 직접 추가해 반영했다 — 새 lecture 폴더를 추가할 때도 `OperatorDemo.java`가 이
  패턴을 쓰는지 먼저 확인할 것.
- **Windows Gradle wrapper 이력**: `gradlew.bat`이 한때(08-11~08-21) 0바이트로 깨진 채 커밋되어 있었다.
  지금은 `gradlew wrapper --gradle-version 9.2.0`으로 복구된 상태(`3089c1f`)이지만, 과거 커밋을 직접
  체크아웃해 그 시절 코드를 실행해봐야 한다면 Windows에서는 동작하지 않는다는 점을 기억할 것(Unix
  `gradlew` 스크립트는 그 기간에도 항상 정상이었다).
- **`.LCK*.java~` 파일들**: 에디터(NetBeans 계열 Java 언어 서버)가 파일을 열어둔 동안 생성하는 잠금
  파일로, 내용이 비어 있고 git에 커밋된 적이 없다. 작업 중 종종 나타났다가 사라지므로 무시해도 된다.
