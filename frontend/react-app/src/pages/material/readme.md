# pages/material

`components/material`, `components/styled` 로 만든 버튼들을 한 화면에 모아 눌러볼 수 있는 확인용 페이지입니다.

- `ButtonPage.jsx`: `MaterialButton`(MUI 기반)과 `components/styled/Button`(styled-components 기반)을 나란히 배치해 두 방식을 비교할 수 있습니다. 이벤트 핸들러를 만들어 `onClick` 에 "함수 자체"를 넘기는 방법과, 인자가 필요할 때 화살표 함수로 감싸는 방법을 함께 보여줍니다.

버튼 자체의 상태/로직은 이 페이지(부모)가 갖고, 버튼 컴포넌트(자식)는 화면 표시와 클릭 알림만 담당하는 구조입니다.
