# features/openapi

카카오맵(Kakao Maps JavaScript SDK) 위에 내 위치와 현재 날씨를 함께 보여주는 기능입니다.

- `page/MapWeatherPage.jsx`: 진입점. `src/hooks/useOpenWeather.js` 의 `locate()` 로 위치+날씨를 함께 가져오고, 지도 마커에 쓸 좌표(`position`)만 이 페이지가 별도 상태로 들고 있습니다. (좌표는 날씨 데이터가 아니라 지도 UI 상태이기 때문에 훅 안에 넣지 않았습니다.)
- `ui/KakaoMap.jsx`: 카카오맵 SDK 스크립트를 로드하고 지도를 그립니다. `lat`/`lng`/`markerTitle` 이 바뀌면 지도 중심과 마커 위치를 갱신합니다. 스크립트를 여러 번 요청하지 않도록 모듈 스코프의 `kakaoLoadPromise` 로 로딩 결과를 캐싱합니다(같은 페이지에서 컴포넌트가 여러 번 마운트/언마운트되어도 SDK 는 한 번만 붙습니다).
- `ui/WeatherBox.jsx`: 날씨 데이터를 카드 형태로 보여줌 (도시명/아이콘/온도/체감온도/습도/풍속)
- `ui/WeatherButton.jsx`: "현재 위치 새로고침" 버튼. `loading` 상태일 때 비활성화됩니다.
- `weather.css`: 위 컴포넌트들이 공유하는 스타일

필요한 환경변수 (`.env.development.local`, `.env.example` 참고):
- `REACT_APP_OPENWEATHER_API_KEY`: 날씨 조회용 (openweathermap.org)
- `REACT_APP_KAKAO_MAP_KEY`: 지도 표시용 (developers.kakao.com). 카카오 개발자 콘솔의 플랫폼 설정에 사용 중인 도메인을 등록해야 지도가 뜹니다.

`features/forcast` 와의 차이는 위 "features/forcast/readme.md" 를 참고하세요 — 두 기능 모두 날씨 조회 로직 자체는 같은 `useOpenWeather` 훅을 공유합니다.
