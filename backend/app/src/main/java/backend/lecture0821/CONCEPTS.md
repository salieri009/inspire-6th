# 8/21 강의 개념정리 (backend.lecture0821)

`src_0821.zip`(강사 배포 소스)을 `backend.lecture0821` 패키지로 반영한 내용에 대한 주제별 개념정리 + 예시 + edge case 모음.
8/20 소스에 이어지는 누적본으로, 변수/문자열/배열/연산자/OOP/enum/싱글턴-팩토리/제네릭/Collections/람다-Stream/예외처리/Front Controller 골격은
8/19~8/20과 동일하다(해당 개념은 [`lecture0819/CONCEPTS.md`](../lecture0819/CONCEPTS.md) 참고). 이 문서는 **8/21에 새로 배운 내용만** 다룬다:
**I/O 스트림 → 객체 직렬화/역직렬화 → 블로그 프레임워크에 파일 영속성 적용 → CRUD(update/delete) 완성 → `ResponseEntity<T>` 응답 래퍼 패턴**.

---

## 1. I/O 스트림 기초: byte vs char (`IOStreamApp.java`)

**개념정리**
- **byte 단위** 입출력: `InputStream`/`OutputStream` (예: `System.in.read()` — 1바이트씩 읽음, `int`로 반환)
- **char(2byte) 단위** 입출력: `Reader`/`Writer` (예: `BufferedReader(new InputStreamReader(System.in))` — 한 줄 단위로 읽음)
- 파일 대상 byte 스트림: `FileInputStream`/`FileOutputStream` / 파일 대상 char 스트림: `FileReader`/`FileWriter`
- **try-with-resources**: `try(BufferedReader br = new BufferedReader(...)) { ... }` — 블록이 끝나면 `AutoCloseable` 리소스가 자동으로 `close()` 되어, 수동 `finally { br.close(); }`가 불필요해짐

**예시** (`IOStreamApp.java` 상단 주석 처리된 단계별 예제 — byte → char → try-with-resources 순으로 학습 진행)
```java
// 1) byte 단위: System.in.read()
int input = System.in.read();

// 2) char 단위 + 수동 close (finally)
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
try { br.readLine(); } finally { br.close(); }

// 3) try-with-resources로 close() 자동화
try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
    br.readLine();
}
```

**Edge Case**
- `System.in.read()`는 `IOException`을 던질 수 있는 **checked exception**이라 `try-catch` 또는 `throws` 강제 — 8/19에 배운 예외 처리 규칙 그대로 적용됨.
- try-with-resources는 리소스 타입이 `AutoCloseable`(또는 `Closeable`)을 구현해야만 사용 가능 — 아무 객체나 넣을 수 있는 게 아님.

---

## 2. 파일 텍스트 입출력 (`IOStreamApp.java`)

**개념정리**
- `FileReader(new File(path), StandardCharsets.UTF_8)` / `FileWriter(new File(path), StandardCharsets.UTF_8)` — 파일 인코딩을 명시적으로 지정해 한글 깨짐을 방지
- 읽기: `BufferedReader.readLine()`을 `null`이 될 때까지 반복 호출해 한 줄씩 순회
- 쓰기: `BufferedWriter.write(String)`으로 문자열을 파일에 기록

**Edge Case**
- `StandardCharsets.UTF_8`을 생략하면 플랫폼 기본 인코딩(OS/JVM 설정에 따라 다름)을 사용하게 되어, 한글 등 비-ASCII 문자가 환경에 따라 깨질 수 있음 — 항상 명시적으로 지정하는 습관이 중요.
- 파일이 존재하지 않는 경로로 `FileReader`를 열면 `FileNotFoundException`(checked) 발생.

---

## 3. 객체 직렬화 / 역직렬화 (`IOStreamApp.java`, `BlogResponseDTO.java`)

**개념정리**
- **직렬화(Serialization)**: 메모리상의 객체를 byte로 변환하는 것. **역직렬화(Deserialization)**: byte를 다시 객체로 복원하는 것.
- 왜 필요한가: ① 객체를 파일로 저장 ② 네트워크 전송 ③ 다른 메모리 영역으로 이동 ④ DB 저장 등, 객체를 JVM 힙 바깥으로 내보내거나 다시 들여올 때 필요.
- 직렬화 대상 클래스는 반드시 `java.io.Serializable` 마커 인터페이스를 구현해야 함 — 메서드는 없고 "이 클래스는 직렬화 가능하다"는 표시 역할만 함.
- `ObjectOutputStream.writeObject(obj)` / `ObjectInputStream.readObject()`로 객체(또는 `List<T>` 같은 컬렉션 전체)를 그대로 파일에 쓰고 읽음.

**예시** (`BlogResponseDTO.java:18`)
```java
public class BlogResponseDTO implements Serializable {
```

**예시** (`IOStreamApp.java:105-106`) — `List<BlogResponseDTO>`를 통째로 역직렬화
```java
try(ObjectInputStream ois = new ObjectInputStream(new FileInputStream(new File(path)))) {
    List<BlogResponseDTO> list = (List<BlogResponseDTO>)ois.readObject();
    list.forEach(System.out::println);
} catch(Exception e) {
    e.printStackTrace();
}
```

**Edge Case**
- `readObject()`의 반환 타입은 `Object`이므로 `(List<BlogResponseDTO>)`로 다운캐스팅해야 하며, 이는 **unchecked cast**라 컴파일러가 "Type safety" 경고를 낸다 — 제네릭은 타입 소거([lecture0819 10번](../lecture0819/CONCEPTS.md#10-제네릭-genericsappjava--featuresgenericsresponsetemplatejava) 참고) 때문에 런타임에 실제 리스트 원소 타입까지는 검증할 수 없음.
- 리스트에 담긴 `BlogResponseDTO`가 `Serializable`을 구현하지 않으면 `writeObject()` 호출 시 `NotSerializableException` 런타임 예외 발생.
- 직렬화된 파일(`object.txt`, `blogs.txt`)이 아직 없는 상태에서 역직렬화를 시도하면 `FileNotFoundException` — 이 예제도 `try-catch`로 감싸 `e.printStackTrace()`만 하고 넘어가도록 되어 있음(운영 코드라면 사용자에게 알맞은 처리가 필요).

---

## 4. 블로그 프레임워크에 파일 영속성 적용 (`FileController.java`, `BlogReactService(Impl).java`, `BlogReactDao.java`, `BlogReactView.java`)

**개념정리**
- 지금까지(8/19~8/20) `BlogReactDao`는 앱을 재시작하면 초기화되는 인메모리 `List`였다 — 오늘은 `./blogs.txt`에 객체 직렬화로 저장/복원해 **파일 기반 영속성**을 추가.
- `BlogReactService`에 `saveToFile()`/`loadToFile()` 두 메서드를 추가하고, `BlogReactServiceImpl`이 각각 `ObjectOutputStream`/`ObjectInputStream`으로 구현.
- `BlogReactDao.setBlogs(List<BlogResponseDTO>)`(참조복사) — 역직렬화로 복원한 리스트를 dao의 내부 상태로 통째로 교체하는 setter.
- 새 **`FileController`**가 `service.saveToFile()`/`loadToFile()`을 감싸고, `BlogBeanFactory`에 `"file.inspire"`로 등록됨(`BlogBeanFactory.java:47`).
- `BlogFrontController.file(endPoint, action)`(`BlogFrontController.java:71`)이 `action` 문자열(`"save"`/그 외)로 save/load를 분기.
- `BlogReactView`는 **시작 시 자동 로드**, **종료 시 저장 여부 확인**으로 앱 생명주기에 영속성을 엮는다.

**예시** (`BlogReactView.java:28`) — 앱 시작 시 파일에서 데이터 로딩
```java
boolean isLoad = front.file("file.inspire", "load");
System.out.println( isLoad ? "데이터 로딩완료!!" : "데이터 로딩 실패");
```

**예시** (`BlogReactView.java:92`) — 종료 시 y/n으로 저장 여부 확인
```java
if( yesOrNo.equalsIgnoreCase("y")) {
    String endPoint = "file.inspire";
    System.out.println(front.file(endPoint, "save") ? "데이터 저장 완료!!" : "데이터 저장 실패");
}
```

**Edge Case**
- 앱을 처음 실행하면 `blogs.txt`가 없어 `loadToFile()`이 `FileNotFoundException`으로 `false`를 반환 → "데이터 로딩 실패"가 출력되지만, `BlogReactDao` 생성자가 만든 기본 mock 5건은 그대로 남아있어 앱 사용에는 지장이 없다(로드 실패 시 폴백이 자연스럽게 되는 구조).
- `blogs.txt`는 실행 위치(작업 디렉터리) 기준 상대경로(`./blogs.txt`)라 IDE에서 실행하는지, `gradlew run`으로 실행하는지에 따라 실제 생성 위치가 달라질 수 있음.

---

## 5. CRUD 완성: update / delete (`BlogReactDao.java`)

**개념정리**
- 8/20까지 `update`/`delete`는 `BlogReactServiceImpl`에서 `UnsupportedOperationException`을 던지는 스텁이었다 — 오늘 `BlogReactDao`에 실구현을 채우고 `BlogReactServiceImpl`이 그대로 위임하도록 완성.
- `delete(blogId)`: `List.removeIf(Predicate)`로 조건에 맞는 원소를 제거, 실제 제거 여부(`boolean`)를 받아 1/0으로 변환.
- `update(request)`: `stream().filter(...).findAny()`로 대상을 찾고, `Optional.map(...)`으로 존재할 때만 필드를 변경 후 1을 반환, 없으면 `orElse(0)`.
- `save(request)`(insert)도 오늘 완성됨: 기존 blogId들을 `stream().map(getBlogId).sorted(reverseOrder()).findFirst().orElse(0) + 1`로 다음 id를 생성한 뒤 `BlogRequestDTO.toEntity(request)`로 변환해 추가.
- 이 변경에 맞춰 **`BlogRequestDTO`의 필드명이 `id` → `blogId`로 변경**됨(`BlogRequestDTO.java:18`) — `UpdateController`가 `.blogId(blogId)`로 빌더를 호출하기 때문.

**예시** (`BlogReactDao.java:73-77`) — stream으로 다음 id 생성
```java
int blogId = blogs.stream()
                  .map( BlogResponseDTO::getBlogId )
                  .sorted( Comparator.reverseOrder() )
                  .findFirst()
                  .orElse(0) + 1 ;
```

**예시** (`BlogReactDao.java:90`) — delete
```java
boolean isFlag = blogs.removeIf(blog -> blog.getBlogId() == blogId );
return (isFlag) ? 1 : 0 ;
```

**Edge Case**
- `update()`의 `Optional.map(blog -> { ...; return 1; })`처럼 map 내부에서 원본 객체(`blog`)의 setter를 직접 호출해 **부수효과(side effect)** 로 상태를 바꾸는 방식은 스트림의 "순수 함수" 관례에서는 벗어나지만, 실무에서도 흔히 쓰이는 실용적 패턴이다.
- `delete`/`update` 모두 대상이 없으면 각각 `0`을 반환할 뿐 예외를 던지지 않음 — `read(blogId)`(8/20에 완성)는 반대로 `orElseThrow()`로 `RuntimeException`을 던지는 것과 대조적. 컨트롤러/뷰 단에서 "없음"을 성공/실패 흐름으로 처리하느냐, 예외로 처리하느냐가 API마다 다르게 설계된 셈.

---

## 6. `ResponseEntity<T>` 응답 래퍼 패턴 (`ResponseEntity.java`, `ListController.java`, `BlogReactView.java`)

**개념정리**
- 지금까지 컨트롤러는 `List<BlogResponseDTO>` 같은 데이터를 그대로 반환했다. 오늘 처음으로 Spring의 `ResponseEntity`를 흉내낸 **커스텀 제네릭 래퍼**(`code`, `message`, `data`)를 도입해, HTTP 응답처럼 상태 코드/메시지와 실제 데이터를 함께 감싸는 패턴을 배움.
- `ListController.list()`만 우선 이 패턴으로 전환되어 `ResponseEntity<List<BlogResponseDTO>>`를 반환(`ListController.java:21`) — 나머지 컨트롤러(`read`/`search`/`insert`/`update`/`delete`)는 아직 이전 방식 그대로라 **일관성이 아직 완성되지 않은 과도기 상태**.
- 호출부(`BlogReactView.list()`)는 `response.getCode() == 200`을 확인한 뒤에만 `response.getData()`를 렌더링 — "성공/실패를 코드로 판단하고 나서 데이터를 꺼낸다"는 REST API 클라이언트 코드의 전형적 패턴을 미리 연습하는 것.

**예시** (`ListController.java:21`)
```java
return new ResponseEntity<List<BlogResponseDTO>>(200, "ok", service.list()) ;
```

**예시** (`BlogReactView.java:108-112`)
```java
if( response.getCode() == 200) {
    response.getData().stream()
        .forEach(System.out::println);
}
```

**Edge Case**
- `ResponseEntity<T>`는 Lombok 없이 생성자/getter/setter를 직접 손으로 작성한 순수 POJO — 지금까지 DTO들이 `@Builder`/`@Getter`/`@Setter`(Lombok)로 자동 생성되던 것과 대조적. Spring의 실제 `org.springframework.http.ResponseEntity`와는 이름과 개념만 유사할 뿐 실제 구현이나 정적 팩토리 메서드(`ResponseEntity.ok(...)` 등)는 없음.
- `list()`만 래핑되고 나머지 메서드는 아직 안 바뀌었기 때문에, 이 프레임워크를 계속 확장한다면 다음 강의에서 나머지 컨트롤러도 `ResponseEntity<T>`로 통일될 가능성이 높다 — 지금 시점 코드만 보면 반환 타입 일관성이 없는 상태임을 유의.

---

## 참고: 반영 시 정리한 이슈

- `backend.lecture0821` 패키지는 이전 lecture0813~lecture0820과 동일한 컨벤션(zero-padded 폴더명, `App.java`류 루트 드라이버 + `features/**` 서브패키지)을 따랐다. 오늘 코드와 무관하게 논리적으로 동일한 파일(변수/문자열/배열/연산자/OOP/enum/싱글턴-팩토리/제네릭/Collections/람다-Stream/예외처리 관련 파일들)은 `lecture0820`에서 패키지 선언만 재작성해 그대로 가져왔다.
- **`BlogResponseDTO` 2-인자 생성자 이슈가 오늘도 반복**됐다: 강사 배포 원본의 `BlogResponseDTO`는 (Serializable을 구현하도록 바뀌었을 뿐) 여전히 명시적 `(int status, String message)` 생성자가 없고, `OperatorDemo.register(...)`가 `new BlogResponseDTO(201, "OK")`를 호출한다. `lecture0819`/`lecture0820`과 동일하게 해당 생성자를 직접 추가해 반영했다(`BlogResponseDTO.java:28`).
- `BlogRequestDTO`의 필드가 `id` → `blogId`로 이름이 바뀐 것은 강사 원본 소스 자체의 변경 사항이며, `UpdateController`/`BlogReactDao.update()`가 이 필드명에 의존하므로 원본 그대로 반영했다. `BlogRequestDTO.toEntity()`는 `id`/`blogId` 어느 쪽도 `BlogResponseDTO`로 옮기지 않는 점(제목/내용/이메일만 복사)도 원본 그대로다.
- `app/src/main/java/IOSstream.java`(사용자 개인 실습 파일, `backend` 패키지 바깥의 default package)는 오늘 다룬 I/O 스트림 개념을 스스로 연습 중인 별도 파일로, 이번 반영 범위에는 포함하지 않았다.
