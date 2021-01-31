import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react'
import { IFormState } from '../../declarations'
import Button from '../components/Button'
import Footer from '../components/Footer'
import GitHubCorner from '../components/GitHubCorner'
import Input from '../components/Input'
import BackgroundImage from '../components/QuizBackground'
import QuizContainer from '../components/QuizContainer'
import { Widget, QuizWidgetTopic } from '../components/Widget'
import db from '../db.json'
import LoadingScreen from '../components/LoadingScreen'
import Link from 'next/link'
import QuizLogo from '../components/QuizLogo'

const Home: React.FC = () => {
  const [name, setName] = useState<IFormState>()

  const onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const target = e.target as typeof e.target & IFormState

    const name = target.name.value
    if (name && name.trim().length > 0) {
      Router.push(`/quiz?name=${name}`)
    } else {
      alert('Digite seu nome, por favor.')
    }
  }

  return (
    <>
      <Head>
        <title>Aluraquizzes - Seu quiz favorito</title>
        <meta name="title" content="Aluraquizzes - Seu quiz favorito" />
        <meta
          name="description"
          content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aluraquizzes.vercel.app/c" />
        <meta property="og:title" content="Aluraquizzes - Seu quiz favorito" />
        <meta
          property="og:description"
          content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)"
        />
        <meta
          property="og:image"
          content="https://aluraquizzes.vercel.app/img/logo-alura.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://aluraquizzes.vercel.app/c"
        />
        <meta
          property="twitter:title"
          content="Aluraquizzes - Seu quiz favorito"
        />
        <meta
          property="twitter:description"
          content="Um projeto criado com amor durante a imersão React V2 (Com Typescript)"
        />
        <meta
          property="twitter:image"
          content="https://aluraquizzes.vercel.app/img/logo-alura.png"
        />
      </Head>
      <BackgroundImage backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo className="" />
          <LoadingScreen title={db.title}>
            <p>{db.description}</p>
            <form onSubmit={onSubmit}>
              <Input
                onChange={({ target }) => {
                  setName({ name: { value: target.value.toString() } })
                }}
                name="name"
                placeholder="Digite seu nome"
                autoFocus
              />

              <Button
                type="submit"
                name="teste"
                disabled={name?.name.value.length == 0}
              >
                Jogar{' '}
                {Boolean(name?.name.value.trim().length)
                  ? `[${name?.name.value}]`
                  : ''}
              </Button>
            </form>
          </LoadingScreen>
          <LoadingScreen title="Quizzes da galera">
            <ul>
              {db.external.map(externalLink => {
                const [projectName, gitHubUser] = externalLink
                  .replace(/\/|https\:|\.vercel\.app/g, '')
                  .split('.')
                return (
                  <li key={externalLink}>
                    <Link href={`quiz/${projectName}?githubUser=${gitHubUser}`}>
                      <QuizWidgetTopic>{projectName}</QuizWidgetTopic>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </LoadingScreen>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/TaffarelXavier/aluraquiz-base" />
      </BackgroundImage>
    </>
  )
}

export default Home
