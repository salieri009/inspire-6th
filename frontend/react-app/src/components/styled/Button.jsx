import styled, { css } from 'styled-components';

// npm install styled-components
//
// styled-components 는 CSS-in-JS 라이브러리다.
// css 를 별도 파일이 아니라 JS 안에서 컴포넌트에 붙여서 작성한다.
//
// 주의 1: 패키지 이름은 'styled-components' (복수형) 이다.
//         'styled-component' (단수형) 는 Zeplin 플러그인으로 완전히 다른 패키지다.
// 주의 2: styled 를 import 하지 않으면 당연히 못 쓴다. import 를 잊지 말 것.

// 백틱(``) 안에 일반 css 를 그대로 쓰면 된다. 이건 tagged template literal 문법이다.
// 결과물은 고유한 class 이름을 가진 진짜 컴포넌트라서
// 다른 컴포넌트의 css 와 이름이 충돌하지 않는다. (= scoped style)
//
// 그리고 StyledButton 은 아래 Button 보다 "먼저" 선언되어야 한다.
// const 는 hoisting 이 되지 않기 때문에(TDZ) 순서가 뒤바뀌면 에러가 난다.
const StyledButton = styled.button`
    padding: 0.6rem 1.2rem;
    border: 1px solid #2563eb;
    border-radius: 8px;
    background: #2563eb;
    color: #ffffff;
    font-size: 0.95rem;
    cursor: pointer;
    transition: opacity 0.15s ease;

    /* &  는 자기 자신을 가리킨다 (sass 와 같은 방식) */
    &:hover {
        opacity: 0.85;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* props 를 받아서 스타일을 분기할 수 있다.
       이게 일반 css 파일 대비 가장 큰 장점이다. */
    ${(props) =>
        props.$variant === 'outline' &&
        css`
            background: transparent;
            color: #2563eb;
        `}
`;

// styled-components v6 에서는 DOM 으로 내려보내지 않을 props 앞에 $ 를 붙인다.
// ($ 가 없으면 <button variant="..."> 처럼 실제 DOM 속성으로 전달되어
//  "React does not recognize the prop" 경고가 뜬다. 이걸 transient props 라고 한다.)
const Button = ({ title, variant = 'solid', ...restProps }) => {
    return (
        <StyledButton $variant={variant} {...restProps}>
            {title}
        </StyledButton>
    );
};

export default Button;

// 스타일을 적용하는 방법 비교
// 1) index.css 같은 전역 css     -> 어디서나 적용되지만 이름 충돌 위험이 있다
// 2) *.module.css                -> 파일 단위로 class 이름이 자동 격리된다
// 3) inline style (style={{}})   -> 간단하지만 hover / media query 를 쓸 수 없다
// 4) styled-components           -> JS 안에서 props 기반 분기까지 가능하다
// 5) MUI 같은 컴포넌트 라이브러리 -> 이미 만들어진 디자인을 가져다 쓴다
