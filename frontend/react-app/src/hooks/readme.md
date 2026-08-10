# hooks

여러 화면에서 공통으로 필요한 로직을 커스텀 훅으로 뽑아두는 폴더입니다.

이 프로젝트에서 첫 번째로 추가된 커스텀 훅이 `useOpenWeather.js` 입니다. `features/forcast/pages/WeatherPage.jsx` 와 `features/openapi/page/MapWeatherPage.jsx` 가 둘 다 "geolocation 으로 좌표를 얻고 → OpenWeatherMap 에 axios 로 요청하고 → loading/error 상태를 관리"하는 로직을 각자 구현하고 있어서, 이 부분만 훅으로 분리했습니다.

- `weather`, `loading`, `error`: 날씨 데이터와 요청 상태
- `fetchByCoords(lat, lon)` / `fetchByCity(city)`: 좌표 또는 도시명으로 날씨를 조회
- `locate({ fallback, onPosition })`: 브라우저 위치 정보로 조회하되, 실패 시 `fallback` 좌표로 대신 조회. 지도 마커처럼 좌표 자체가 필요한 화면은 `onPosition` 콜백으로 좌표를 받는다

두 페이지는 이 훅에서 데이터만 받아 쓰고, 지도 마커 위치처럼 화면에 종속적인 상태는 각자 컴포넌트 안에 그대로 둡니다. 앞으로 두 화면 이상에서 똑같이 반복되는 로직이 생기면(예: 카카오맵 스크립트 로딩, 폼 검증) 이 폴더에 훅으로 추가하는 것을 권장합니다.
