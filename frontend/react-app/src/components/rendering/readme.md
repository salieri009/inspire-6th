# components/rendering

React 의 조건부 렌더링(conditional rendering) 방식을 보여주는 예제 컴포넌트가 들어가는 곳입니다. `pages/rendering/RenderingPage.jsx` 에서 조합해서 사용합니다.

- `Greeting.jsx`: `props.flag` 값에 따라 `UserGreeting`/`GuestGreeting` 둘 중 하나를 렌더링(삼항 연산자 방식)
- `UserGreeting.jsx`, `GuestGreeting.jsx`: `Greeting` 이 조건에 따라 갈라 보여주는 실제 화면
- `Guest.jsx`: if/삼항연산자/`&&`/early return 네 가지 조건부 렌더링 패턴을 한 파일에 모아 정리한 예제. 다만 현재 어떤 페이지에서도 import 되어 있지 않은 **참고용/미사용** 컴포넌트입니다 — 지우지 않고 학습 자료로 남겨두었습니다.

로그인 상태(`flag`)는 `RenderingPage.jsx` 가 `useState` 로 직접 들고 있고, 토글 버튼도 그 페이지에 인라인으로 구현되어 있습니다. (강의 zip 에는 이 토글을 `LoginButton`/`LogoutButton` 컴포넌트로 따로 뺀 버전도 있지만, 동일한 동작을 이미 인라인으로 구현하고 있어 별도로 가져오지 않았습니다.)
