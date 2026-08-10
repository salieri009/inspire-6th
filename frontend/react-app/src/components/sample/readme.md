# components/sample

컴포넌트/Props 개념을 처음 익힐 때 쓰는 아주 단순한 예제 컴포넌트가 들어가는 곳입니다.

- `Book.jsx`: 지금은 카테고리 값이 고정된 정적 컴포넌트입니다. 파일 하단 주석에 다음 단계(props 로 값 받기, `children` 으로 내부를 통째로 받는 컴포넌트 합성)로 발전시키는 방법을 정리해 두었습니다.

여기 있는 컴포넌트는 실제 라우트에 연결되어 있지 않고, 개념을 설명하기 위한 예제입니다. 실제로 화면에서 쓰는 카드형 UI 는 `features/blog/components/BlogCard.jsx` 처럼 각 feature 안에 있습니다.
