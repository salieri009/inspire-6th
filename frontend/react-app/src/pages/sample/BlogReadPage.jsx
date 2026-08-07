import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api/axios';
import BackHome from '../../components/common/BackHome';
import Button from '../../components/styled/Button';
import TextInput from '../../components/styled/TextInput';
import Blogcommentlist from '../../features/blog/list/Blogcommentlist';


// moveUrl 하고 navigate 의 차이가 머임?
// -> 이름만 다를 뿐 둘 다 useNavigate() 가 돌려주는 같은 함수다.

// component 안에 있는 작성된 blog 들을 가져올 수 있어야한다
// -> json-server(db.json) 의 /posts/:id 를 호출해서 단건을 읽어온다.
// -> 댓글까지 같이 필요하니 ?_embed=comments 를 붙여서 1:N 관계를 한 번에 가져온다.
//    (댓글 쪽 db.json 데이터에는 postId 필드가 있어야 json-server 가 짝을 맞춰준다)
// 실행 전에 목업 서버가 떠 있어야 한다: npm run server (4000 포트)
const BlogReadPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 댓글 목록은 post 와 별도의 state 로 관리한다.
    // (댓글 작성/삭제는 post 전체를 다시 불러오지 않고 이 배열만 갱신하기 위해서)
    const [comments, setComments] = useState([]);
    const [writer, setWriter] = useState('');
    const [commentText, setCommentText] = useState('');

    // useEffect 는 mount 될 때, postId 가 바뀔 때마다 실행된다. (postId 는 useParams() 로 읽은 URL 파라미터)
    useEffect(() => {
        // postId 가 바뀔 때마다 (다른 글로 이동했을 때) 다시 불러와야 한다.
        let ignore = false;
        setLoading(true);
        setError('');

        const loadPost = async () => {
            try {
                const response = await api.get(`/posts/${postId}?_embed=comments`);
                if (!ignore) {
                    setPost(response.data);
                    setComments(response.data.comments || []);
                }
            } catch (requestError) {
                if (!ignore) setError('글을 불러오지 못했습니다.');
                console.error(requestError);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        loadPost();
        return () => {
            ignore = true;
        };
    }, [postId]);

    // 댓글 작성: POST /comments 로 { postId, writer, comment } 를 보내고,
    // 성공하면(201) 서버가 돌려준 객체를 comments 배열 뒤에 그대로 붙인다.
    // -> 다시 목록 전체를 불러오지 않아도 화면에 바로 반영된다.
    const commentHandler = async () => {
        if (!writer.trim() || !commentText.trim()) return;

        try {
            const response = await api.post('/comments', {
                postId: Number(postId),
                writer,
                comment: commentText,
            });
            setComments((prev) => [...prev, response.data]);
            setCommentText('');
        } catch (requestError) {
            setError('댓글을 등록하지 못했습니다.');
            console.error(requestError);
        }
    };

    // 댓글 삭제: DELETE /comments/:id 후, 삭제된 id 만 걸러내서 re-render 한다.
    const commentDeleteHandler = async (id) => {
        try {
            await api.delete(`/comments/${id}`);
            setComments((prev) => prev.filter((c) => c.id !== id));
        } catch (requestError) {
            setError('댓글을 삭제하지 못했습니다.');
            console.error(requestError);
        }
    };

    if (loading) {
        return <p>글을 불러오는 중입니다...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
            <BackHome />
            <h1>Blog Read Page</h1>
            <p>Post ID: {postId}</p>
            {post ? (
                <>
                    <h2>{post.title}</h2>
                    <p style={{ color: '#666' }}>
                        {post.author} · {post.createdAt}
                    </p>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>

                    <h3>댓글 {comments.length}개</h3>
                    <Blogcommentlist comments={comments} onDelete={commentDeleteHandler} />

                    {/* 댓글 입력 : 로그인 사용자 개념이 없는 샘플이라 이름을 직접 입력받는다. */}
                    <div style={{ display: 'grid', gap: '0.5rem', maxWidth: 480 }}>
                        <input
                            type="text"
                            value={writer}
                            onChange={(e) => setWriter(e.target.value)}
                            placeholder="이름을 입력하세요"
                        />
                        <TextInput
                            height={80}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="댓글을 입력하세요"
                        />
                        <Button title="댓글 작성" onClick={commentHandler} />
                    </div>
                </>
            ) : (
                <>
                    <p>해당 글을 찾을 수 없습니다.</p>
                    <Button
                        variant="primary"
                        title="블로그 목록으로 이동"
                        onClick={() => navigate('/blog')}
                    />
                </>
            )}
        </section>
    );
};

export default BlogReadPage;

// useMemo -> 렌더링마다 다시 계산하지 않도록 값 자체를 기억해두는 훅. 성능 개선용.
// 의존성 배열이 빈 배열일 경우 컴포넌트 마운트 시에만 호출된다.
