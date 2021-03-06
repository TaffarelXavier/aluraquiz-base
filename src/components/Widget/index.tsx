/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components'

export const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: #1c1818;
  border-radius: 4px;
  overflow: hidden;
  h1,
  h2,
  h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`

export const QuizWidgetContent = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`

export const QuizWidgetHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  font-weight: 900;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  * {
    margin: 0;
  }
`

export const QuizWidgetTopic = styled.a`
  &[data-selected='true'] {
    background-color: ${({ theme }) => theme.colors.primary};

    &[data-status='SUCCESS'] {
      background-color: ${({ theme }) => theme.colors.success};
    }
    &[data-status='ERROR'] {
      background-color: ${({ theme }) => theme.colors.wrong};
    }
  }
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: 0.3s;
  display: block;
  font-size: 1.1rem;
  &:hover,
  &:focus {
    opacity: 0.5;
  }
`
