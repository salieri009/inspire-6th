import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { signup } from './api/userApi';

const SignupPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        setSubmitting(true);
        try {
            await signup({ username, email, password });
            navigate('/signin');
        } catch (requestError) {
            setError('회원가입에 실패했습니다. 입력값을 확인해주세요.');
            console.error(requestError);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-4" style={{ maxWidth: 420 }}>
            <Link to="/" className="d-inline-block mb-3">← 홈으로</Link>
            <h1 className="mb-4 h3">회원가입</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="이름을 입력하세요"
                        required
                    />
                </Form.Group>

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

                <Form.Group className="mb-3">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        value={passwordConfirm}
                        onChange={(event) => setPasswordConfirm(event.target.value)}
                        placeholder="비밀번호를 다시 입력하세요"
                        required
                    />
                </Form.Group>

                {error && <Alert variant="danger">{error}</Alert>}

                <Button type="submit" variant="primary" className="w-100" disabled={submitting}>
                    {submitting ? '가입 중...' : '회원가입'}
                </Button>
            </Form>

            <div className="mt-3 text-center">
                이미 계정이 있으신가요? <Link to="/signin">로그인</Link>
            </div>
        </Container>
    );
};

export default SignupPage;
