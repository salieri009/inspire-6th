// ===== Conditional Rendering(조건부 렌더링) 개념 정리 =====
// React에서는 일반 JS의 if문, 삼항 연산자(?:), && 연산자를 그대로 사용해서
// "어떤 조건일 때 어떤 UI를 보여줄지"를 결정한다. 별도의 v-if, ng-if 같은
// 템플릿 문법이 없고, JSX 안에 JS 표현식을 그대로 끼워넣는 방식이다.
//
// 1) if / else (컴포넌트 함수 내부, return 이전에 사용)
//    - 여러 줄의 로직이 필요하거나 완전히 다른 컴포넌트를 반환할 때 적합
// 2) 삼항 연산자 condition ? A : B (JSX 안에서 바로 사용 가능)
//    - Greeting.jsx 가 쓰는 방식: props.flag ? <UserGreeting /> : <GuestGreeting />
// 3) && 연산자 condition && <A />
//    - "조건이 참일 때만 보여주고, 거짓이면 아예 렌더링하지 않는다"는
//      경우에 적합 (false/null/undefined는 화면에 아무것도 그리지 않음)
// 4) early return (조건이 안 맞으면 null 반환)
//    - 컴포넌트 자체를 아예 렌더링하지 않고 싶을 때 사용


// 함수를 매개변수로 받는 예시
// 다른 곳에서 가져온 함수라기보다, 부모 컴포넌트에서 props로 전달받은 함수다.
// onClick={() => onLogOut(false)} 처럼 호출하면,
// logOutButton이 받은 onLogOut 함수가 실행되고 false를 전달한다.
const logOutButton = ({ onLogOut = () => {} }) => {
    return (
        <button onClick={() => onLogOut(false)}>Log Out</button>
    );
}


const Guest = ({ isLoggedIn = false, showNotice = true }) => {
    // 4) early return 예시: 로그인 상태면 이 컴포넌트는 아무것도 그리지 않는다.
    if (isLoggedIn) {
        return null;
    }

    return (
        <div>
            {/* 2) 삼항 연산자: 로그인 여부에 따라 다른 문구를 보여준다. */}
            <h1>{isLoggedIn ? 'Welcome back!' : 'Please sign up.'}</h1>

            {/* 3) && 연산자: showNotice가 true일 때만 안내 문구를 추가로 렌더링한다. */}
            {showNotice && <p>게스트로 둘러보는 중입니다. 로그인하면 더 많은 기능을 사용할 수 있어요.</p>}
        </div>
    );
}

export default Guest;
