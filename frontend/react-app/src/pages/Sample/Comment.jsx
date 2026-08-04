
import { useEffect, useState } from 'react';
import { api } from '../../api/axios';

const Comment = () => {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

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
	}, []);

	if (loading) {
		return <p>댓글을 불러오는 중입니다...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<section style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
			<h2>Comment List</h2>
			<ul style={{ paddingLeft: '1.25rem' }}>
				{comments.map((comment, index) => (
					<li key={`${comment.writer}-${index}`}>
						<strong>{comment.writer}</strong>: {comment.comment}
					</li>
				))}
			</ul>
		</section>
	);
};

export default Comment;


// 기본 패턴