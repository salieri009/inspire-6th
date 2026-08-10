import styled from 'styled-components';
import { useState } from 'react';
import Button from '../../../components/styled/Button';
import TextInput from '../../../components/styled/TextInput';

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
// onDelete : (id) => void                 -- 목록(Blogcommentlist)에서 넘겨받는 삭제 핸들러
// onUpdate : (id, nextComment) => void     -- 목록에서 넘겨받는 수정 핸들러
//
// 이 프로젝트는 로그인 상태를 관리하지 않는 샘플이라(BlogReadPage 도 이름을 그때그때
// 입력받는다), zip 원본에 있던 "작성자 본인만 수정 가능" 이메일 검사는 넣지 않았다.
// 편집 중에는 읽기용 CommentText 대신 TextInput 을 보여주고, 서버 응답(PATCH)이
// 성공했을 때만 isEdit 을 끈다 -> 실패하면 입력값이 그대로 남아 다시 시도할 수 있다.
const BlogcommentItem = ({ comment, onDelete, onUpdate }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [draft, setDraft] = useState(comment.comment);

    const handleEditToggle = async () => {
        if (!isEdit) {
            setIsEdit(true);
            return;
        }

        if (!draft.trim() || draft === comment.comment) {
            setIsEdit(false);
            setDraft(comment.comment);
            return;
        }

        await onUpdate?.(comment.id, draft);
        setIsEdit(false);
    };

    const handleCancel = () => {
        setDraft(comment.comment);
        setIsEdit(false);
    };

    return (
        <Wrapper>
            <div style={{ flex: 1 }}>
                <Writer>{comment.writer}</Writer>
                {isEdit ? (
                    <TextInput
                        height={16}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                    />
                ) : (
                    <CommentText>{comment.comment}</CommentText>
                )}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                {isEdit && (
                    <Button variant="outline" title="취소" onClick={handleCancel} />
                )}
                <Button
                    variant="outline"
                    title={isEdit ? '완료' : '수정'}
                    onClick={handleEditToggle}
                />
                <Button variant="outline" title="삭제" onClick={() => onDelete?.(comment.id)} />
            </div>
        </Wrapper>
    );
};

export default BlogcommentItem;
