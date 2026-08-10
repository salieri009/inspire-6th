# components/styled

`styled-components` 로 직접 스타일을 짠 공용 UI 컴포넌트가 들어가는 곳입니다.

```
npm install styled-components
```

- `Button.jsx`: `variant` prop 으로 solid/outline 스타일을 분기하는 버튼. DOM 으로 내려가면 안 되는 props(`variant`)는 `$variant` 처럼 `$` 를 붙인 transient prop 으로 넘깁니다.
- `TextInput.jsx`: `height`/`value`/`onChange` 를 받는 textarea. `Button.jsx` 와 동일한 패턴(`...restProps` 로 나머지 props 전달)을 따릅니다.

두 컴포넌트 모두 `features/blog` 의 댓글 작성/수정 UI(`item/BlogcommnetItem.jsx`, `pages/sample/BlogReadPage.jsx`)에서 실제로 사용합니다. `components/material` 이 완성된 디자인 시스템을 가져다 쓰는 방식이라면, 이 폴더는 CSS 를 직접 컴포넌트 단위로 캡슐화하는 방식을 보여줍니다.
