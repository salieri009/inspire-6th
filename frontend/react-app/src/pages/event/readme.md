# pages/event

폼 입력, 이벤트 처리, 라우팅 파라미터를 다루는 예제 페이지가 들어가는 곳입니다.

- `EventPage.jsx`: `value`+`onChange` 로 입력값을 state 와 동기화하는 controlled component 패턴, `preventDefault` 로 form 기본 제출을 막는 방법, `POST /signup` 요청 예제. 페이지 하단 주석에 쿠키/세션 vs 토큰(JWT), Access/Refresh 토큰 개념도 정리되어 있습니다.
- `SuccessPage.jsx`, `ErrorPage.jsx`: `EventPage` 의 가입 성공/실패 후 이동하는 결과 화면. `ErrorPage` 는 `App.jsx` 의 `path="*"` (정의되지 않은 모든 경로)에도 쓰입니다.
- `ViewPage.jsx`: `useParams`(경로 파라미터)와 `useSearchParams`(쿼리 스트링)를 함께 읽는 예제.
