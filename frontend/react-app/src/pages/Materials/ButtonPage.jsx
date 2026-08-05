import MaterialButton from '../../components/materials/materialButton';

const ButtonPage = () => {

    const saveGameHandler = () => {
        console.log('게임 저장');
    };

    const loadGameHandler = () => {
        console.log('게임 불러오기');
    }

    // 이렇게 button page 안에 event handler 를 만들어서, button 에 props 로 전달한다.
    // 상태와 로직은 부모(page)가 갖고, 자식(button)은 화면 표시만 담당한다.
    // 자식은 "무슨 일이 일어났는지"만 알리고, 실제 처리는 부모가 한다.

	return (
		<div style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
			<h1>Button Page</h1>
			<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
				{/* 함수 "자체"를 넘긴다. saveGameHandler() 처럼 괄호를 붙이면
				    렌더링 시점에 바로 실행되어 버리니 주의. */}
				<MaterialButton
					title="게임 저장"
					variant="contained"
					color="primary"
					onClick={saveGameHandler}
				/>
				<MaterialButton
					title="게임 불러오기"
					variant="outlined"
					color="secondary"
					onClick={loadGameHandler}
				/>
				{/* 인자를 넘겨야 할 때는 화살표 함수로 감싼다. */}
				<MaterialButton
					title="슬롯 3 저장"
					variant="contained"
					color="success"
					onClick={() => console.log('슬롯 3 저장')}
				/>
			</div>
		</div>
	);
};

// 파일의 이름과 함수의 이름은 동일하게 하는 것이 좋다.

export default ButtonPage;
