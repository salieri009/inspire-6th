import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

// typsecript 는 난이도가 있고, 객체지향적인 접근 법을 해야한다
// type -> module -> src main.tsx -> App.tsx -> index.css -> vite.config.ts
// 1. 타입스크립트는 자바스크립트의 상위 집합으로, 정적 타입을 제공하여 코드의 안정성과 가독성을 향상시킵니다.
// 2. 모듈 시스템을 사용하여 코드를 구성하고 재사용성을 높일 수 있습니다.
// 3. src/main.tsx는 애플리케이션의 진입점으로, ReactDOM을 사용하여 App 컴포넌트를 렌더링합니다.
//  main.tsx에서 App.tsx를 import하여 사용하며, index.css를 통해 전역 스타일을 적용합니다. 
// server 기동은 npm run dev 
// npm start 는 react-scripts start 로 CRA에서 사용되는 명령어이고,
//  vite에서는 npm run dev를 사용합니다.
// npm start -> 3000 번대에서 시작함

// tsconfig .json 은 타입스크립트 컴파일러 옵션을 설정하는 파일입니다. 
// 여기서 strict 모드를 활성화하면 타입 검사를 강화하여 코드의 안정성을 높일 수 있다
// 또한, paths 옵션을 사용하여 모듈 경로를 설정할 수 있으며,
// baseUrl 옵션을 통해 상대 경로를 설정할 수 있습니다.

// pakcage -> node 에 괂나 정보 

// tsx -> js -> vite -> browser 
// tsx 는 타입스크립트와 JSX를 결합한 파일 확장자 -> 실행하기 위해서는 compiler가 필요함
//
