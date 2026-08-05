// library 를 import 하는걸 잊지말자
import axios from 'axios';

//===============================================================================
// 개발단계와 배포단계에서 서로 다른 서버를 바라보게 한다
//===============================================================================
// NODE_ENV 는 react-scripts 가 자동으로 넣어준다. 직접 설정하지 않는다.
//   npm start -> 'development'
//   npm run build -> 'production'
//   npm test -> 'test'
//
// 반면 REACT_APP_ 으로 시작하는 변수는 프로젝트 루트의 .env 파일에서 읽는다.
// (루트 = package.json 이 있는 폴더. src/ 안에 두면 읽히지 않는다.)
//
// 중요: 이 값들은 빌드 시점에 문자열로 "치환"된다. 런타임에 바뀌지 않는다.
//       그래서 빌드 결과물을 열어보면 값이 평문으로 보인다.
//       API 키 같은 비밀값은 절대 넣으면 안 된다.
const endPoint =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BACKEND_URL
        : process.env.REACT_APP_API_URL;

export const api = axios.create({
    baseURL: endPoint, // .env 에서 가져온 환경 변수 사용
    timeout: 5000, // 응답이 없을 때 무한정 기다리지 않도록 한다
});

// 인스턴스를 만들어 두면 baseURL, 헤더, 타임아웃 설정을 한 곳에서 관리할 수 있다.
// 각 컴포넌트에서 axios 를 직접 쓰면 이 설정이 사방에 흩어진다.

//===============================================================================
// interceptor - 모든 요청/응답을 거쳐가는 공통 처리 지점
//===============================================================================
// 토큰 자동 첨부, 공통 에러 처리, 로딩 표시 등에 쓴다.
//
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
//
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // 토큰 만료 -> refresh 시도하거나 로그인 화면으로 보낸다
//         }
//         return Promise.reject(error);
//     }
// );

//===============================================================================
// export 방식
//===============================================================================
// named export  : export const api  -> import { api } from '...'  (중괄호 필요)
// default export: export default api -> import api from '...'     (이름 자유)
// 한 파일에서 둘 다 제공할 수도 있다. 아래처럼 default 도 같이 열어둔다.
//
// fetch 대신 axios 를 쓰는 이유:
//   - 응답을 자동으로 JSON 파싱해준다 (fetch 는 res.json() 을 또 호출해야 함)
//   - 4xx/5xx 를 예외로 던져준다 (fetch 는 네트워크 오류가 아니면 reject 하지 않는다)
//   - baseURL, interceptor, timeout 같은 기능을 기본 제공한다
export default api;
