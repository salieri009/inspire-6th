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
// onDelete/onUpdate 는 item 까지 그대로 내려보내는 핸들러다.
// (list 자신은 어떻게 지우고 고치는지 모른다 -- 실제 API 호출은 BlogReadPage 가 담당)
const Blogcommentlist = ({ comments, onDelete, onUpdate }) => {
    return (
        <Wrapper>
            {comments.map((comment) => (
                <BlogcommentItem
                    key={comment.id}
                    comment={comment}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </Wrapper>
    );
};

export default Blogcommentlist;