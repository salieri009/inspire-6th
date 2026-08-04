import MaterialButton from '../../components/materials/materialButton';

const ButtonPage = () => {
	return (
		<div style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
			<h1>Button Page</h1>
			<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
				<MaterialButton title="Primary Button" variant="contained" color="primary" />
				<MaterialButton title="Secondary Button" variant="outlined" color="secondary" />
				<MaterialButton title="Success Button" variant="contained" color="success" />
			</div>
		</div>
	);
};

// 파일의 이름과 함수의 이름은 동일하게 하는 것이 좋다.

export default ButtonPage;
