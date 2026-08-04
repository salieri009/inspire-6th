import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ButtonPage from './pages/Materials/ButtonPage';
import Comment from './pages/Sample/Comment';
import CapacityPage from './reactive/CapacityPage';


// script module 을 외부에서 가져온다
// css 도 module 로 인식해서 가져온다
// global style 은 index.css 에서 정의하고, component 별로 style 을 정의할 때는 module.css 를 사용한다

function App() {
  return <ButtonPage />;
}

// query Selector를 사용하여 root 요소를 가져오고 ReactDOM.createRoot를 사용하여 React 앱을 렌더링합니다.
// React 18에서는 ReactDOM.render 대신 ReactDOM.createRoot를 사용하여 앱을 렌더링합니다.
// virtual dom 을 만들어서 rendering 해서 실제 dom에 반영하는 방식으로 동작합니다.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Comment />
    
  </React.StrictMode>
);

// tag 형식의 component 를 만들어내는것
// jsx 문법으로 작성된 코드를 브라우저가 이해할 수 있는 js 코드로 변환하는 과정이 필요하다
// app 라는 것이 component 이고, component 는 tag 형식으로 만들어진다
// front 도 사실 하나의 server 라고 생각해야함

// vite 기반이냐 cli 기반이냐 다루다 

// frontend -> backend 로 요청을 보내는 방식은 fetch api 를 사용하거나 axios 를 사용할 수 있다
// cors 문제를 해결하기 위해서는 backend 에서 cors 설정을 해주거나, frontend 에서 proxy 설정을 해주어야 한다
// frontend 에서 backend 로 요청을 보내는 방식은 fetch api 를 사용하거나 axios 를 사용할 수 있다
// 서버 기동은 npm start 를 사용하여 frontend 를 기동하고, backend 는 npm run dev 를 사용하여 기동한다
// 최소한 하나의 tag 가 기동되고 있어야한다

// props 는 전달하는게 data 를 전달하는 것이 가능하지만
// function 을 전달하는 것도 가능하다
//data 는 one way data 방식으로 가는걸 권장

// page -> component -> element 혹은 event 등으로