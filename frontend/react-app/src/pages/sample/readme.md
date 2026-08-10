# pages/sample

여러 강의 주제를 실습해보는 예제 페이지 모음입니다. 다른 `pages/*` 폴더와 달리 주제가 하나로 묶이지 않아 `sample` 이라는 이름으로 모아두었습니다.

- `BlogReadPage.jsx`: `features/blog` 의 댓글 실습 샘플. `GET /posts/:id?_embed=comments` 로 글+댓글을 한 번에 불러오고, 댓글 작성(`POST /comments`)/수정(`PATCH /comments/:id`)/삭제(`DELETE /comments/:id`)를 모두 이 페이지에서 처리합니다. 실제 댓글 UI 는 `features/blog/list/Blogcommentlist.jsx` + `features/blog/item/BlogcommnetItem.jsx` 가 담당합니다. `App.jsx` 에는 `SampleBlogReadPage` 라는 이름으로 `/samples/blog/:postId` 에 연결되어 있습니다.
- `CommentPage.jsx`: `useEffect` 안에서 async 함수를 정의/호출하는 기본 데이터 조회 패턴 예제 (`GET /comment.json`, `public/comment.json` 목업 파일을 읽습니다).
- `LibraryPage.jsx`: `filter`/`map` 으로 배열 데이터를 화면에 그리는 예제. 파일 하단 주석에 `key` 를 index 로 쓰면 안 되는 이유, 비동기 데이터의 초기값 처리 방법이 정리되어 있습니다.
- `Textinput.jsx`: `export` 문이 없어 실제로는 아무 데서도 쓸 수 없는 **미완성/미사용** 파일입니다. 완성된 대체품은 `components/styled/TextInput.jsx` 이며, 진행 중이던 작업을 잃지 않기 위해 지우지 않고 참고용으로 남겨두었습니다.
