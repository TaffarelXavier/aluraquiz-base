import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

const InputBase = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: 0;
  margin-bottom: 25px;
`;


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string,
    name: string
}


const Input: NextPage<Props> = ({ placeholder, ...props }) => {
    return (
        <InputBase
            placeholder={placeholder}

            {...props}
        />
    );
}


export default Input;