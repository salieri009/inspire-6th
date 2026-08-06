import Button from '@mui/material/Button';
// 요로코롬 npm 으로 설치된 button 을 가져온다

const MaterialButton = ({ title, variant = 'contained', color = 'primary', onClick, ...restProps }) => {
    return (
        <Button variant={variant} color={color} onClick={onClick} {...restProps}>
            {title}
        </Button>
    );
};

export default MaterialButton;

// npm install @mui/material @emotion/react @emotion/styled
// material ui 를 사용하기 위해서는 위의 명령어를 사용하여 설치해야한다.
// MUI 는 이미 완성된 디자인 시스템을 가져다 쓰는 방식이라 직접 css 를 짜지 않아도 된다.
// @emotion/* 은 MUI 내부에서 스타일을 만드는 데 쓰는 필수 의존성이다.

// ctrl + space bar 로 자동완성도 가능함

// title = '글 작성하기' 이런식으로 props 를 전달할 수 있다.

//===============================================================================
// onClick 에 함수를 넘기는 방법 - 가장 많이 실수하는 부분
//===============================================================================
// onClick={saveHandler}        -> O 함수 "자체"를 넘긴다. 클릭할 때 실행된다.
// onClick={() => saveHandler()} -> O 인자를 넘겨야 할 때 이렇게 감싼다.
// onClick={saveHandler()}      -> X 렌더링 시점에 즉시 실행되고 그 반환값이 등록된다.
//
// 인자를 넘기고 싶으면 반드시 화살표 함수로 감싼다.
//   onClick={() => saveHandler(item.id)}
//
// 핸들러의 첫 번째 인자로는 event 객체가 전달된다.
//   const saveHandler = (event) => { ... }
// 이건 브라우저의 순수 이벤트가 아니라 React 의 SyntheticEvent 다.
// 브라우저마다 다른 동작을 React 가 감싸서 통일해 준 것이다.

//===============================================================================
// restProps (...나머지 props) 를 열어두는 이유
//===============================================================================
// 위에서 { title, variant, color, onClick, ...restProps } 로 받은 뒤
// <Button {...restProps}> 로 그대로 흘려보낸다.
// 이렇게 하면 disabled, size, fullWidth 같은 MUI 의 나머지 props 를
// 이 파일을 매번 고치지 않고도 그대로 쓸 수 있다.
// (CapacityPage 에서 disabled 를 넘길 수 있는 이유가 바로 이것)
