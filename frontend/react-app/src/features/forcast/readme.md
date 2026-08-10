# features/forcast

OpenWeatherMap API 로 날씨를 조회하는 기능입니다. (폴더명은 원래 "forecast" 의 오타이지만, 라우트/폴더명이 이미 `forcast` 로 굳어 있어 그대로 둡니다.)

- `pages/WeatherPage.jsx`: 도시 이름을 골라 조회하거나(`fetchByCity`), 처음 들어오면 브라우저 위치로 자동 조회합니다(`locate`). 응답 원본 JSON 을 그대로 화면에 찍어 보여주는 디버그용 페이지입니다.

실제 API 호출/로딩/에러 상태는 이 페이지가 직접 들고 있지 않고, `src/hooks/useOpenWeather.js` 를 가져다 씁니다. `features/openapi/page/MapWeatherPage.jsx` 도 같은 훅을 쓰는데, 두 페이지 모두 "geolocation → OpenWeatherMap 조회" 로직이 완전히 같아서 훅으로 뺐기 때문입니다. 이 페이지는 그 데이터를 어떻게 보여줄지(도시 선택 UI, JSON 그대로 출력)만 담당합니다.

`features/openapi` 와의 차이는: 여기는 순수하게 날씨 데이터만 다루고, `features/openapi` 는 여기에 카카오맵까지 얹어서 지도 위에 위치를 보여줍니다.

강의 zip 의 같은 위치(`features/forcast/page`, `list`, `item`)에는 여러 날짜의 예보를 목록으로 보여주는 구조가 있었지만, zip 안의 해당 파일들이 모두 빈 파일(0바이트)이어서 실제로 참고할 구현이 없었습니다. 여러 날짜 예보 UI 는 아직 이 프로젝트에 없는 기능입니다.
