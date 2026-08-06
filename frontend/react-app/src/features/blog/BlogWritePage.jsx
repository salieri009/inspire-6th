import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { getPost, createPost, updatePost } from './api/blogApi';
import BlogForm from './components/BlogForm';

const BlogWritePage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(postId);

    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(isEdit);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isEdit) return;

        let ignore = false;

        const fetchPost = async () => {
            try {
                const data = await getPost(postId);
                if (!ignore) setInitialValues(data);
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
    }, [isEdit, postId]);

    const handleSubmit = async (values) => {
        setSubmitting(true);
        setError('');
        try {
            if (isEdit) {
                await updatePost(postId, values);
                navigate(`/blog/${postId}`);
            } else {
                const created = await createPost(values);
                navigate(`/blog/${created.id}`);
            }
        } catch (requestError) {
            setError('저장하지 못했습니다.');
            console.error(requestError);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(isEdit ? `/blog/${postId}` : '/blog');
    };

    return (
        <Container className="py-4" style={{ maxWidth: 720 }}>
            <h1 className="mb-4 h3">{isEdit ? '글 수정' : '새 글쓰기'}</h1>

            {loading && <Spinner animation="border" size="sm" />}
            {!loading && isEdit && !initialValues && error && <Alert variant="danger">{error}</Alert>}

            {!loading && (!isEdit || initialValues) && (
                <BlogForm
                    initialValues={initialValues}
                    submitting={submitting}
                    error={error}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    submitLabel={isEdit ? '수정 완료' : '등록'}
                />
            )}
        </Container>
    );
};

export default BlogWritePage;
