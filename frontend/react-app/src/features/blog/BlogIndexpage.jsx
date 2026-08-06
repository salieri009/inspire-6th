import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { getPosts } from './api/blogApi';
import BlogCard from './components/BlogCard';

const BlogIndexPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;

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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0 h3">블로그</h1>
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
