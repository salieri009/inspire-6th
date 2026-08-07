import styled from 'styled-components';
import BlogcommentItem from '../item/BlogcommnetItem';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 16px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

// comments 는 댓글 객체 배열이고, list 는 그 목록을, item 은 목록 안의 한 건을 그린다.
// onDelete 는 item 까지 그대로 내려보내는 삭제 핸들러다. (list 자신은 어떻게 지우는지 모른다)
const Blogcommentlist = ({ comments, onDelete }) => {
    return (
        <Wrapper>
            {comments.map((comment) => (
                <BlogcommentItem key={comment.id} comment={comment} onDelete={onDelete} />
            ))}
        </Wrapper>
    );
};

export default Blogcommentlist;