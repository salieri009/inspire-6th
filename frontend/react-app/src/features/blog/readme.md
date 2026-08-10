# features/blog

블로그 글(`posts`)과 댓글(`comments`) CRUD 를 다루는 기능입니다. json-server(`db.json`)의 `posts`/`comments` 컬렉션을 기준으로 동작합니다.

이 폴더에는 서로 다른 두 갈래의 화면이 섞여 있습니다.

**1) 글(posts) 목록/조회/작성 — react-bootstrap**
- `BlogIndexpage.jsx`: `GET /posts` 로 목록 조회, `BlogCard` 로 렌더링
- `BlogReadPage.jsx`: `GET /posts/:id` 로 단건 조회, 수정/삭제 버튼 제공 (댓글은 다루지 않습니다)
- `BlogWritePage.jsx`: 글 작성/수정
- `api/blogApi.js`: `getPosts`/`getPost`/`createPost`/`updatePost`/`deletePost` — 이 폴더의 모든 post 요청이 거치는 지점
- `components/BlogCard.jsx`, `components/BlogForm.jsx`: 목록 카드, 작성/수정 폼

**2) 댓글 실습 샘플 — styled-components**
- `item/BlogcommnetItem.jsx` + `list/Blogcommentlist.jsx`: 댓글 한 건 / 목록. 실제 사용처는 `pages/sample/BlogReadPage.jsx` 입니다.
  - 데이터 흐름: `pages/sample/BlogReadPage.jsx` 가 `GET /posts/:id?_embed=comments` 로 글+댓글을 한 번에 불러온 뒤, `onDelete`/`onUpdate` 핸들러를 `Blogcommentlist` → `BlogcommnetItem` 까지 그대로 내려보냅니다. 실제 API 호출(`POST /comments`, `PATCH /comments/:id`, `DELETE /comments/:id`)은 전부 `BlogReadPage` 가 담당하고, 하위 컴포넌트는 "무슨 id 에 뭘 했는지"만 위로 알립니다.
  - 댓글 수정은 `BlogcommnetItem` 안에서 `isEdit` 상태로 인라인 편집 폼을 켜고 끄는 방식입니다. 로그인 상태를 관리하는 프로젝트가 아니라서(작성자 이름도 매번 직접 입력) 별도의 "본인 댓글만 수정 가능" 제한은 없습니다.
- `item/Blogitem.jsx` + `list/Bloglist.jsx`: `BlogcommnetItem`/`Blogcommentlist` 와 이름이 비슷하지만 별개의 컴포넌트로, 글 목록을 그리기 위한 것입니다. 다만 현재 어디서도 import 되지 않는 **미사용** 컴포넌트입니다(실제 목록은 `BlogCard` 를 씁니다). 참고용으로 남겨두었습니다.
- `util/`: 비어 있습니다.

강의 zip 에는 게시글에 `category` 필드로 필터링하는 UI(`useMemo` 로 파생 상태 최적화)도 있었지만, 이 프로젝트의 `db.json` `posts` 스키마에는 `category` 필드 자체가 없어 가져오지 않았습니다.
