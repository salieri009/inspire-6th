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
                const created = await createPost({
                    ...values,
                    createdAt: new Date().toISOString().slice(0, 10),
                });
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

/*
form 으로 감싸서 들어가는 방법도 잇음
value = {formData.title} onChange={handleChange}  // formData state 를 만들어서 on change 로 setFormData({...formData, title: e.target.value}) 이런식으로 처리
on change = {e => setFormData({...formData, title: e.target.value})} 이런식으로 처리
onChange 는 input, textarea, select 등에서만 발생한다. (div, span 등에서는 발생하지 않음)
e.target ()
객체의  const name value 값을 가져올수도 있음 */
// 
// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//     }));
// }
// 기존 데이터를 유지하면서 target data 를 가져오는거임
// submit 버튼이 눌렸을때 handler 를 타게 하는 방법도 가능함
// const signupHandler = (e) => {
//     console.log('signupHandler', e);
// }
// preventDefault 는 submit 버튼이 눌렸을때 페이지가 새로고침되는걸 막아주는거임
// 이건 event bubbling 을 막아주는거임
// event bubbling 은 이벤트가 발생했을때 부모 요소까지 전파되는거임
// const data = name form.

// axios 를 활용해서 /user/signup 로 post 요청을 보내서 회원가입을 처리하는거임

// 데이터 저장
// 성공하면 sigin inpage 로 이동
// 가입 실패시 에러메메시지
// //

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError('');
// }
// navigate 는 사용자를 보내는 거임 
// const handleSubmit = async (values) => {
//     setSubmitting(true);
//     setError('');
//     try {
//         if (isEdit) {
//             await updatePost(postId, values);
//             navigate(`/blog/${postId}`);
//         } else {
//             const created = await createPost(values);
//             navigate(`/blog/${created.id}`);
//         }
//     } catch (requestError) {
//         setError('저장하지 못했습니다.');
//         console.error(requestError);
//     }

// json server 를 활용해서 /blog/posts 로 post 요청을 보내서 게시글을 저장하는거임

// await api.post('/blog/posts', values)
// .then 
// .catch
// 데이터는 통신을 하고 반환을 다시 해줌
// hook 의 규칙 
// hook 은 리엑트 최상위에서 호출되어야하고
// hook 은 리엑트 함수 컴포넌트에서만 호출되어야함
// useEffect 는 리엑트 함수 컴포넌트에서만 호출되어야함
// query string 은 URL 에서 ? 뒤에 오는 key=value 형태의 문자열을 말함
// 이것도 rotuer-dom 에서 useSearchParams() 훅을 사용해서 읽을수 있음 

// jdbc 
// framework
//- my bat
// jpa - hibernate -> 알아서 하는거
//orm = object relational mapping
// sql 을 객체지향적으로 다루는거임
