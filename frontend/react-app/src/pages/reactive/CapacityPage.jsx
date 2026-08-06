import { useState } from 'react';
import Button from '../../components/material/MaterialButton';
import BackHome from '../../components/common/BackHome';

const CapacityPage = () => {
    // state 가 바뀔 때마다 이 함수 전체가 다시 호출된다는 걸 눈으로 확인하는 용도.
    // 개발 모드에서는 StrictMode 때문에 두 번씩 찍히는 게 정상이다. (빌드본에서는 1회)
    console.log("CapacityPage rendered");

    // useState 를 사용하여 state 를 관리한다
    // useState 는 배열을 반환한다
    // cnt 는 현재 state 를 나타내고, setCnt 는 state 를 변경하는 함수이다
    // useState 의 초기값은 0 이다 -> 그렇기에 내부 값을 0 으로 들어간다
    // 즉 cnt = 0 이고, setCnt 는 cnt 를 변경하는 함수이다
    // 처음에 시작될때 setCnt 에 저장한다
    // -> 향후 다이어 그램을 정리
    const [cnt, setCnt] = useState(0);
    // 최대 수용 인원은 화면에서 바로 보이는 규칙으로 두고,
    // 버튼 비활성화 조건도 그 값에서 직접 계산한다.
    const MAX_CAPACITY = 5;
    const isEnterDisabled = cnt >= MAX_CAPACITY;
    const isExitDisabled = cnt <= 0;

    const handleEnter = () => {
        if (isEnterDisabled) {
            return;
        }

        setCnt((prev) => prev + 1);
    };

    const handleExit = () => {
        if (isExitDisabled) {
            return;
        }

        setCnt((prev) => Math.max(0, prev - 1));
    };

    //===============================================================================
    // state 를 관리하는 방법은 useState 를 사용한다
    // 입장인원
    // 입장 퇴장
    // 입장버튼을 클릭하면 인원이 증가하고, 퇴장버튼을 클릭하면 인원이 감소한다
    // 인원이 꽉 차거나, 0이 되면 버튼을 비활성화 시킨다
    //===============================================================================
    return (
        <section style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
            <BackHome />
            <h1>Capacity Page</h1>
            <p>입장인원 : {cnt}</p>
            <p>최대 수용 인원 : {MAX_CAPACITY}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button title="입장" variant="contained" color="primary" onClick={handleEnter} disabled={isEnterDisabled} />
                <Button title="퇴장" variant="contained" color="secondary" onClick={handleExit} disabled={isExitDisabled} />
            </div>
        </section>
    );

}

export default CapacityPage;

// react 에서 state 를 관리하는 방법은 useState 를 사용한다
// useState 는 state 를 관리하는 hook 이다 -> 일단 개념 그 자체는 상태를 저장하는 것을 말한다
// state 를 이해하기 위해서는 state 의 개념을 이해해야한다
// lifecycle 을 이해하기 위해서는 react 의 렌더링 과정을 이해해야한다
// - 생명주기 , 상태 에대 한 개념을 이해해야한다
// react component 의 변경 가능한 데이터

// -> useState 를 사용하여 state 를 관리한다 -> Lifecycle 을 이해하기 위해서는 react 의 렌더링 과정을 이해해야한다 -> 이것은 Hook 이라는 것을 이해해야한다
// use 로 시작하는 hook 은 react 의 기능을 사용할 수 있는 함수이다 -> export 되어 있다. {} 중괄호를 활용해서 해야한다
// solution-> hook state 를 사용하여 state 를 관리한다
// mount ->

// side effect -> useEffect 를 사용하여 side effect 를 관리한다
// 렌더링 이후에 추가 작업이 필요한 경우 활용한다 (데이터 fetch, 구독, 타이머 등)
// side effect 는 여러 개가 있을 수 있고, 관심사별로 useEffect 를 나눠 쓰는 편이 좋다.

// mount, unmount, update -> react 의 생명주기
// 의존성 배열 (dependency array) 에 넣은 값이 바뀔 때마다 useEffect 가 다시 실행된다.
//   useEffect(fn)         -> 매 렌더링마다 실행
//   useEffect(fn, [])     -> mount 시 1회만 실행
//   useEffect(fn, [a])    -> a 가 바뀔 때만 실행
// 주의: useEffect 안에서 setState 를 하면 그 자체가 다시 렌더링을 유발한다.
//       의존성 배열을 잘못 주면 무한 루프가 되니 조심할 것.
// return 으로 정리(cleanup) 함수를 주면 unmount 시 / 다음 effect 실행 전에 호출된다.

// props drilling -> 부모에서 자식, 그 자식으로 props 를 계속 내려보내는 것.
// 깊어지면 Context API 나 상태관리 라이브러리로 푸는 게 낫다.

// pure 함수  -> 같은 입력이면 항상 같은 출력, 외부 상태를 건드리지 않는다.
// impure 함수 -> 외부 상태를 바꾸거나 외부 상태에 결과가 좌우된다.
// react 컴포넌트는 렌더링 과정에서 pure 해야 한다. (그래서 부수효과는 useEffect 로 뺀다)
// StrictMode 가 개발 모드에서 컴포넌트를 두 번 호출하는 이유가 바로
// "pure 하지 않은 코드"를 조기에 잡아내기 위해서다.

//===============================================================================
// 잘못된 예시 - 파생 상태(derived state)를 굳이 state 로 또 만드는 경우
//===============================================================================
// const [empty, setEmpty] = useState(true);
// const [full, setFull]   = useState(false);
//
// empty / full 은 결국 cnt 만 보면 알 수 있는 값이다.
// 이렇게 state 를 중복으로 만들면 cnt 와 empty/full 이 서로 어긋나는 순간이 생기고
// (= single source of truth 위반) 동기화 코드를 계속 덧붙이게 된다.
//
// 그래서 위 컴포넌트에서는 state 를 cnt 하나만 두고
//   const isEnterDisabled = cnt >= MAX_CAPACITY;
//   const isExitDisabled  = cnt <= 0;
// 처럼 렌더링할 때마다 계산해서 쓴다. 이게 파생 상태를 다루는 기본 원칙이다.
//
// 또 하나: setState 는 비동기로 처리(batching)되므로
//   setCnt(cnt + 1); setCnt(cnt + 1);  -> 1만 증가한다
//   setCnt(p => p + 1); setCnt(p => p + 1); -> 2 증가한다
// 이전 값을 기준으로 계산할 때는 반드시 updater 함수 형태를 쓸 것.
