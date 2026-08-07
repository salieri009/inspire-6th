import styled from 'styled-components';
import Button from '../../../components/styled/Button';

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 16px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    border: 1px solid grey;
    border-radius: 8px;
    background: white;
`;

const CommentText = styled.p`
    margin: 0;
    font-size: 16px;
    white-space: pre-wrap;
`;

const Writer = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
    margin-right: 8px;
`;

// comment : { id, postId, writer, comment }
// onDelete : (id) => void  -- 목록(Blogcommentlist)에서 넘겨받는 삭제 핸들러
const BlogcommentItem = ({ comment, onDelete }) => {
    return (
        <Wrapper>
            <div>
                <Writer>{comment.writer}</Writer>
                <CommentText>{comment.comment}</CommentText>
            </div>
            <Button variant="outline" title="삭제" onClick={() => onDelete?.(comment.id)} />
        </Wrapper>
    );
};

export default BlogcommentItem;
