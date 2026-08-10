# components/material

Material UI(`@mui/material`)로 만든 공용 컴포넌트가 들어가는 곳입니다.

styled-components 로 직접 CSS 를 짜는 `components/styled` 와 달리, 여기는 이미 완성된 디자인 시스템을 가져다 씁니다. `@emotion/react`, `@emotion/styled` 는 MUI 가 내부적으로 스타일을 만드는 데 쓰는 필수 의존성이라 같이 설치되어 있습니다.

- `MaterialButton.jsx`: MUI 의 `Button` 을 감싸서 `title`/`variant`/`color`/`onClick` 만 필요한 형태로 노출하고, 나머지 props(`disabled`, `size` 등)는 `...restProps` 로 그대로 흘려보냅니다. `pages/reactive/CapacityPage.jsx`, `pages/material/ButtonPage.jsx` 에서 사용합니다.

같은 버튼이라도 `components/styled/Button.jsx`(직접 스타일링)와 `components/material/MaterialButton.jsx`(디자인 시스템 사용)를 비교해볼 수 있도록 두 방식 모두 프로젝트에 남겨두었습니다.
