import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { getPosts } from './api/blogApi';
import BlogCard from './components/BlogCard';

const BlogIndexPage = () => {
    // useNavigate 훅을 사용하여 navigate 함수를 가져온다. 이 함수는 페이지 이동을 위해 사용된다.
    // 그 아래에것들은 useState 훅을 사용하여 상태를 관리한다. posts는 게시글 목록, loading은 로딩 상태, error는 에러 메시지를 저장한다.

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const user = localStorage.getItem('accessToken');

    useEffect(() => { 
        let ignore = false;
        // useEffect 훅은 컴포넌트가 렌더링될 때 특정 작업을 수행하도록 설정하는 데 사용된다. 여기서는 게시글 목록을 가져오는 API 호출을 수행한다.
        //fetchposts 라는 const 를 써보자
        // async 함수고 try catch finally 구조를 사용하여 API 호출을 수행하고, 성공하면 posts 상태를 업데이트하고, 실패하면 error 상태를 업데이트한다. 마지막으로 loading 상태를 false로 설정한다.


        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                if (!ignore) setPosts(data);
            } catch (requestError) {
                if (!ignore) setError('게시글을 불러오지 못했습니다.');
                console.error(requestError);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchPosts();
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <Container className="py-4" style={{ maxWidth: 720 }}>
            <Link to="/" className="d-inline-block mb-3">← 홈으로</Link>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0 h3">블로그</h1>
                <h2 className="mb-0 h6 text-muted">{user ? '로그인 상태' : '로그아웃 상태'}</h2>
                <Button variant="primary" onClick={() => navigate('/blog/write')}>
                    새 글쓰기
                </Button>
            </div>

            {loading && <Spinner animation="border" size="sm" />}
            {!loading && error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && posts.length === 0 && (
                <p className="text-muted">아직 작성된 글이 없습니다.</p>
            )}
            {!loading && !error && posts.map((post) => (
                <BlogCard key={post.id} post={post} onClick={() => navigate(`/blog/${post.id}`)} />
            ))}
        </Container>
    );
};



export default BlogIndexPage;
