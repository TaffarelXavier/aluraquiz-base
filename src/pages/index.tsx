import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { Widget } from '../components/Widget'
import BackgroundImage from '../components/QuizBackground'
import GitHubCorner from '../components/GitHubCorner'
import Footer from '../components/Footer'
import db from '../db.json'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`
//metastags.io
const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Quizzes - Seu quiz favorito</title>
      </Head>
      <BackgroundImage backgroundImage={db.bg}>
        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>The title 1</h1>
            </Widget.Header>
            <Widget.Content>
              <p>Lorem ipsum dolor sit amet.</p>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Header>
              <h1>The title 2</h1>
            </Widget.Header>
            <Widget.Content>
              <p>Lorem ipsum dolor sit amet.</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/TaffarelXavier" />
      </BackgroundImage>
    </>
  )
}

export default Home
