import React from 'react';
import styled from 'styled-components';
import { NextPage } from 'next';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  width: 100%;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: .3s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: .5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string
    type: 'submit' | 'reset' | 'button';
}

const Input: NextPage<Props> = ({ type, ...props }) => {
    return (
        <Button
            type={type}
            {...props}
        />
    );
}


export default Input;