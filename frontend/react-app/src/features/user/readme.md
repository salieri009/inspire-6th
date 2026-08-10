# features/user

로그인/회원가입 기능입니다.

- `Signinpage.jsx`: 로그인 폼. 성공하면 서버가 내려준 `accessToken` 을 `localStorage` 에 저장하고 홈으로 이동합니다.
- `Signuppage.jsx`: 회원가입 폼.
- `api/userApi.js`: `signin`/`signup` — `/user/signin`, `/user/signup` 요청. 이 폴더의 모든 인증 요청이 거치는 지점입니다.

로그인 상태는 별도의 전역 상태 관리 없이 `localStorage.getItem('accessToken')` 존재 여부로만 간단히 판단합니다(`features/blog/BlogIndexpage.jsx` 에서 사용 예시를 볼 수 있습니다). 토큰 만료 처리, 자동 갱신 같은 실제 인증 로직은 아직 없고 `src/api/axios.js` 에 인터셉터 자리만 주석으로 마련해 두었습니다.
