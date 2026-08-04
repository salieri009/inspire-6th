import Button from '@mui/material/Button';
// 요로코롬 npm 으로 설치된 button 을 가져온다

const MaterialButton = ({ title, variant = 'contained', color = 'primary', onClick }) => {
    return (
        <Button variant={variant} color={color} onClick={onClick}>
            {title}
        </Button>
    );
};

export default MaterialButton;

// npm install @mui/material @emotion/react @emotion/styled
// material ui 를 사용하기 위해서는 위의 명령어를 사용하여 설치해야한다
// 이는 완성된ㄷ 디자

// ctrl space bar로 자동완성도 가능함

// title = '글 작성하기' 이런식으로 props 를 전달할 수 있다
// onClick 이벤트를 사용하여 버튼 클릭 시 동작을 정의할 수 있다
// saveHandler 라는 함수를 만들어서, 버튼 클릭 시 해당 함수가 실행되도록 할 수 있다
// onClick( ) => saveHandler() ) 이런식으로 작성하면 된다
// argument 로는 event 를 전달할 수 있다
