# pages/reactive

`useState` 로 상태를 관리하는 기본기를 보여주는 페이지입니다.

- `CapacityPage.jsx`: 입장/퇴장 버튼으로 인원 수(`cnt`)를 증감시키는 예제. 인원이 꽉 찼는지/비었는지를 별도의 state 로 또 만들지 않고, `cnt` 하나만 두고 렌더링할 때마다 `cnt >= MAX_CAPACITY` 처럼 파생시켜 계산합니다(state 중복을 피해 single source of truth 를 지키기 위함). 파일 하단 주석에 `useState`/`useEffect`/렌더링 생명주기/파생 상태에 대한 정리가 있습니다.
