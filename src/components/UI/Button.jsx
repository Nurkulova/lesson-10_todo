import React from 'react';
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px;
  background-color: #e41595;
  border: none;
  border-radius: 4px;
  color:#ffff;
  font-weight:600;
  margin:10px;
`;
const Button = ({ onClick,children}) => {
  return (
    <StyledButton onClick={onClick}>{children}</StyledButton>
  )
};
export default Button;

