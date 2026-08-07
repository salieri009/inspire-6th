import styled from 'styled-components';

// npm install styled-components
//
// Button.jsx 와 같은 방식: 실제 DOM 에 안 내려가야 하는 props 는 $ 를 붙인다.
// (여기서는 height 하나뿐이라 $height 로만 처리한다.)
const StyledTextArea = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    padding: 16px;
    font-size: 16px;
    line-height: 20px;
    font-family: inherit;
    border: 1px solid grey;
    border-radius: 8px;
    resize: vertical;

    ${(props) =>
        props.$height &&
        `
        height: ${props.$height}px;
    `}

    &:focus {
        outline: none;
        border-color: #6366f1;
    }

    &:disabled {
        background: #f3f4f6;
        cursor: not-allowed;
    }
`;

// height, value, onChange 는 그대로 두고, 나머지(placeholder, disabled 등)는
// ...restProps 로 받아서 그대로 textarea 에 전달한다. (Button.jsx 와 동일한 패턴)
const TextInput = ({ height, value, onChange, ...restProps }) => {
    return (
        <StyledTextArea
            $height={height}
            value={value}
            onChange={onChange}
            {...restProps}
        />
    );
};

export default TextInput;
