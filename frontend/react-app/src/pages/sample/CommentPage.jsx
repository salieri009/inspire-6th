
import { useEffect, useState } from 'react';
import { api } from '../../api/axios';
import BackHome from '../../components/common/BackHome';

const Comment = () => {

    //console.log('Comment component rendered');
    // let comments = []; 
    // comment.appends(데이터 ) 이런식으로 데이터를 추가할 수 있다
    // -> list 를 가져와서 데이터를 handling 할 수 있다는 이야기

	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// useEffect 의 첫 인자에는 async 를 직접 붙일 수 없다.
	// async 함수는 Promise 를 반환하는데, useEffect 는 반환값을 cleanup 함수로 취급하기 때문이다.
	// 그래서 안에서 async 함수를 따로 정의하고 호출하는 패턴을 쓴다.
	useEffect(() => {
		const loadComments = async () => {
			try {
				const response = await api.get('/comment.json');
				setComments(response.data);
			} catch (requestError) {
				setError('댓글을 불러오지 못했습니다.');
				console.error(requestError);
			} finally {
				setLoading(false);
			}
		};

		loadComments();
		// 의존성 배열이 빈 배열([]) 이므로 mount 시 딱 한 번만 실행된다.
		// 배열 자체를 생략하면 매 렌더링마다 실행되어
		// setState -> 리렌더링 -> 다시 요청 의 무한 루프가 된다.
	}, []);

	if (loading) {
		return <p>댓글을 불러오는 중입니다...</p>;
	}
    // eror 가 발생하면, error 를 보여주도록 한다
	if (error) {
		return <p>{error}</p>;
	}

    
	return (
		<section style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
			<BackHome />
			<h2>Comment List</h2>
			<ul style={{ paddingLeft: '1.25rem' }}>
				{/* key 는 index 가 아니라 데이터 고유의 id 를 쓴다.
				    index 를 쓰면 목록에 삽입/삭제가 일어날 때
				    React 가 항목을 잘못 짝지어 엉뚱한 DOM 을 재사용한다. */}
				{comments.map((comment) => (
					<li key={comment.id}>
						<strong>{comment.writer}</strong>: {comment.comment}
					</li>
				))}
			</ul>
		</section>
	);
};

export default Comment;


// 기본 패턴
// 이걸 이해하기 위해선 reactive state 라는 상태 관리 개념을 이해해야한다