import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { getPost, deletePost } from './api/blogApi';

const BlogReadPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;
        setLoading(true);
        setError('');

        const fetchPost = async () => {
            try {
                const data = await getPost(postId);
                if (!ignore) setPost(data);
            } catch (requestError) {
                if (!ignore) setError('게시글을 불러오지 못했습니다.');
                console.error(requestError);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchPost();
        return () => {
            ignore = true;
        };
    }, [postId]);

    const handleDelete = async () => {
        if (!window.confirm('이 글을 삭제하시겠습니까?')) return;

        try {
            await deletePost(postId);
            navigate('/blog');
        } catch (requestError) {
            setError('삭제하지 못했습니다.');
            console.error(requestError);
        }
    };

    return (
        <Container className="py-4" style={{ maxWidth: 720 }}>
            <Button variant="link" className="ps-0 mb-3" onClick={() => navigate('/blog')}>
                ← 목록으로
            </Button>

            {loading && <Spinner animation="border" size="sm" />}
            {!loading && error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && post && (
                <>
                    <h1 className="mb-1 h3">{post.title}</h1>
                    <p className="text-muted mb-4">
                        {post.author} · {post.createdAt}
                    </p>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>

                    <div className="mt-4">
                        <Button
                            variant="outline-secondary"
                            className="me-2"
                            onClick={() => navigate(`/blog/${postId}/edit`)}
                        >
                            수정
                        </Button>
                        <Button variant="outline-danger" onClick={handleDelete}>
                            삭제
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default BlogReadPage;
