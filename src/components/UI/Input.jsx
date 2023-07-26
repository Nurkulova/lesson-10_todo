import React from 'react';
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 8px;
  border: 2px solid #39d5ab;
  border-radius: 4px;
  color:#cd3392;
  margin:10px;
  font-weight:600;
`;

const Input  = ({ value, onChange }) => {
  return <StyledInput value={value} onChange={onChange} />;
};

export default Input;


 