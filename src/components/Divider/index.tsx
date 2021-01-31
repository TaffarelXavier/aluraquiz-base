import { NextPage } from 'next'
import React from 'react'
import styled from 'styled-components'

const Divider = styled.hr`
  border: 0;
  height: 0;
  border-top: 0.0001pt solid #ccc;
`

interface Props {}

const QuizDivider: NextPage<Props> = () => {
  return (
    <>
      <Divider />
    </>
  )
}
export default QuizDivider
