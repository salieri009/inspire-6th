import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// bootstrap css 는 앱 전체에서 한 번만 import 한다.
// 컴포넌트마다 import 하면 같은 css 가 중복으로 번들에 들어간다.
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// script module 을 외부에서 가져온다
// css 도 module 로 인식해서 가져온다
// global style 은 index.css 에서 정의하고, component 별로 style 을 정의할 때는 module.css 를 사용한다

// 학습용 예제 화면들은 App.jsx 의 react-router-dom 라우트로 각각 분리되어 있다.
// "/" 로 들어오면 모든 페이지로 이동할 수 있는 홈(HomePage)이 보인다.

// document.getElementById 로 root 요소를 가져오고 ReactDOM.createRoot 로 React 앱을 렌더링한다.
// React 18 부터는 ReactDOM.render 대신 createRoot 를 사용한다. (동시성 기능을 쓰기 위해)
// virtual dom 을 만들어 이전 결과와 비교(diffing)한 뒤, 바뀐 부분만 실제 dom 에 반영한다.
//
// 예전에는 root 를 두 개 만들어서(#root, #router-root) 같은 root.render() 를 두 번 호출했다.
// 두 번째 render() 가 첫 번째 결과를 완전히 덮어써 버렸고,
// #router-root 엘리먼트는 public/index.html 에 아예 없어서 createRoot(null) 로 즉시 크래시났다.
// 이제는 root 하나에 App 하나만 렌더링한다.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode 는 개발 모드 전용 검사 도구다. 실제 화면에는 아무것도 그리지 않는다.
  // 순수하지 않은(impure) 컴포넌트를 찾아내려고 렌더링과 effect 를 일부러 두 번 실행한다.
  // 그래서 console.log 가 두 번 찍히는 건 정상이며, 프로덕션 빌드에서는 한 번만 실행된다.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//===============================================================================
// React 기본 개념 정리
//===============================================================================
// component  : tag 형식으로 쓰는 UI 조각. 대문자로 시작해야 React 가 컴포넌트로 인식한다.
//              소문자로 시작하면 <div> 같은 일반 HTML 태그로 취급한다.
// JSX        : JS 안에서 HTML 처럼 쓰는 문법. 브라우저는 이걸 모르므로
//              babel 이 React.createElement 호출로 변환한다.
//              그래서 빌드 과정이 반드시 필요하다.
// 구조       : page -> component -> element / event
// front 도 사실 하나의 server 라고 생각해야 한다 (dev server 가 떠서 정적 파일을 서빙한다)

//===============================================================================
// props
//===============================================================================
// props 로는 데이터뿐 아니라 함수도 전달할 수 있다. (자식 -> 부모로 알리는 통로가 된다)
// 데이터는 부모에서 자식으로 흐르는 one-way data flow 를 지킨다.
// props 는 읽기 전용이다. 자식이 props 를 직접 수정하면 안 된다.
// 값을 바꿔야 하면 부모의 state 를 바꾸는 함수를 props 로 내려받아 호출한다.

//===============================================================================
// 빌드 도구 / 실행
//===============================================================================
// CRA(react-scripts) vs Vite
//   - 이 프로젝트는 CRA 기반이다. (webpack 사용, 설정이 감춰져 있어 시작이 쉽다)
//   - Vite 는 esbuild 기반으로 dev 서버 기동과 HMR 이 훨씬 빠르다. 신규 프로젝트는 보통 Vite 를 쓴다.
//   - CRA 는 현재 유지보수가 사실상 중단된 상태라, 새로 시작한다면 Vite 를 권장한다.
// 실행: npm start (frontend), 백엔드는 별도로 기동한다.
// JSX 의 return 은 반드시 하나의 최상위 요소로 감싸야 한다.
//   여러 개를 나란히 두려면 <> </> (Fragment) 로 감싼다.

//===============================================================================
// 백엔드 통신 / CORS
//===============================================================================
// fetch API 또는 axios 를 사용한다. (이 프로젝트는 src/api/axios.js 에 인스턴스를 만들어 둠)
// CORS 는 브라우저가 "다른 출처(origin)로의 요청"을 막는 보안 정책이다.
//   출처 = protocol + host + port 세 가지가 모두 같아야 같은 출처다.
//   localhost:3000 -> localhost:8080 도 포트가 달라 다른 출처다.
// 해결 방법:
//   1) 백엔드에서 Access-Control-Allow-Origin 헤더를 내려준다 (근본적인 해결)
//   2) 개발 중에는 package.json 의 "proxy" 설정으로 우회한다 (개발 전용)
// CORS 는 서버가 아니라 브라우저가 막는 것이다. Postman 으로는 잘 되는 이유가 이것이다.
