import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const BlogForm = ({ initialValues, submitting, error, onSubmit, onCancel, submitLabel }) => {
    const [title, setTitle] = useState(initialValues?.title ?? '');
    const [author, setAuthor] = useState(initialValues?.author ?? '');
    const [content, setContent] = useState(initialValues?.content ?? '');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ title, author, content });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>제목</Form.Label>
                <Form.Control
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="제목을 입력하세요"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>작성자</Form.Label>
                <Form.Control
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    placeholder="이름을 입력하세요"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>내용</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder="내용을 입력하세요"
                    required
                />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" variant="primary" className="me-2" disabled={submitting}>
                {submitting ? '저장 중...' : submitLabel}
            </Button>
            <Button type="button" variant="outline-secondary" onClick={onCancel} disabled={submitting}>
                취소
            </Button>
        </Form>
    );
};

export default BlogForm;
