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

        <title>Aluraquizzes - Seu quiz favorito</title>
        <meta name="title" content="Aluraquizzes - Seu quiz favorito" />
        <meta name="description" content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)" />


        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aluraquizzes.vercel.app/c" />
        <meta property="og:title" content="Aluraquizzes - Seu quiz favorito" />
        <meta property="og:description" content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)" />
        <meta property="og:image" content="https://aluraquizzes.vercel.app/img/logo-alura.png" />


        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aluraquizzes.vercel.app/c" />
        <meta property="twitter:title" content="Aluraquizzes - Seu quiz favorito" />
        <meta property="twitter:description" content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)" />
        <meta property="twitter:image" content="https://aluraquizzes.vercel.app/img/logo-alura.png" />
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
        <GitHubCorner projectUrl="https://github.com/TaffarelXavier/aluraquiz-base" />
      </BackgroundImage>
    </>
  )
}

export default Home
