import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { signin } from './api/userApi';

const SigninPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const data = await signin({ email, password });
            if (data?.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
            }
            navigate('/');
        } catch (requestError) {
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            console.error(requestError);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-4" style={{ maxWidth: 420 }}>
            <Link to="/" className="d-inline-block mb-3">← 홈으로</Link>
            <h1 className="mb-4 h3">로그인</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="이메일을 입력하세요"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        required
                    />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                <Button type="submit" variant="primary" className="w-100" disabled={submitting}>
                    {submitting ? '로그인 중...' : '로그인'}
                </Button>
            </Form>

            <div className="mt-3 text-center">
                아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
            </div>
        </Container>
    );
};

export default SigninPage;


// Q)
//     - axios 통신(get(blogs) , params X)
//     - 데이터를 reactive state 관리(setXXXX) 
//     - 렌더링시점에 데이터 바인딩이 X, effect  필요함!!


// const fetchPosts = async () => {
//     try {
//         const data = await getPosts();
//         setPosts(data);
//     } catch (requestError) {
//         setError('게시글을 불러오지 못했습니다.');
//         console.error(requestError);
//     } finally {
//         setLoading(false);


//     }
// };

// const loadData = async () => {
//     await api.get('/blogs')
//         .then((response) => {
