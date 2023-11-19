import styled, { css } from 'styled-components'

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    color: #BF4F74;
    margin: 0 1em;
    padding: 0.25em 1em;

    ${props => { return props.$test && css`
        background: #BF4F74;
        color: white;
        `
    }}
`;

export default Button;