import styled from 'styled-components';
import Blogitem from '../item/Blogitem';

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

const Bloglist = ({ ary, onItemClick }) => {
    return (
        <Wrapper>
            {ary.map((blog) => (
                <Blogitem key={blog.id} blog={blog} onClick={() => onItemClick?.(blog)} />
            ))}
        </Wrapper>
    );
};

export default Bloglist;
