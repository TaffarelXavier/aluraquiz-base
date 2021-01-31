import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import {
  IQuestion,
  IThemeColors,
  QuizState,
  IQuestionInput
} from '../../../declarations'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import GitHubCorner from '../../components/GitHubCorner'
import LoadingScreen from '../../components/LoadingScreen'
import BackgroundImage from '../../components/QuizBackground'
import QuizContainer from '../../components/QuizContainer'
import QuestionWidget from '../../components/QuestionWidget'
// import { Widget } from '../../components/Widget'
import { ThemeProvider } from 'styled-components'

interface Props {
  dbExterno: {
    bg: string
    title: string
    description: string
    questions: IQuestion[]
    external: string[]
    theme: {
      colors: IThemeColors
      borderRadius: string
    }
  }
}

const QuizDaGaleraPage: NextPage<Props> = ({ dbExterno }) => {
  const totalQuestions = dbExterno.questions.length
  const [screenState, setScreenState] = useState<QuizState>('LOADING')
  const [results, setResults] = useState<boolean[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question: IQuestion = dbExterno.questions[questionIndex]

  const addResult = (result: boolean) => {
    setResults([...results, result])
  }

  useEffect(() => {
    window.setTimeout(() => {
      setScreenState('LOADED')
    }, 500)
  }, [])

  const handleSubmitQuiz = (ev: React.SyntheticEvent) => {
    ev.preventDefault()
    const nextQuestion = questionIndex + 1
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setScreenState('RESULT')
    }
  }

  const reset = () => {
    setScreenState('LOADING')
    setResults([])
    setCurrentQuestion(0)
    setTimeout(() => {
      setScreenState('LOADED')
    }, 500)
  }

  return (
    <>
      <Head>
        <title>Aluraquizzes - Seu quiz favorito</title>
      </Head>
      <ThemeProvider theme={dbExterno.theme}>
        <BackgroundImage backgroundImage={dbExterno.bg}>
          <QuizContainer>
            {screenState == 'LOADED' && (
              <QuestionWidget
                question={question}
                questionIndex={questionIndex}
                totalQuestions={totalQuestions}
                onSubmit={handleSubmitQuiz}
                addResult={addResult}
              />
            )}

            {screenState == 'LOADING' && (
              <LoadingScreen title="Título">Carregando...</LoadingScreen>
            )}

            {screenState == 'RESULT' && (
              <>
                <LoadingScreen title="Desafio Concluído">
                  <p>
                    Você acertou &nbsp;
                    {results.reduce((sumActual, resultActual) => {
                      const isAcertou = resultActual == true
                      return isAcertou ? +sumActual + 1 : sumActual
                    }, 0)}
                  </p>
                  <ul>
                    {(results || []).map((result, index) => {
                      return (
                        <li key={index}>
                          {`#${index + 1} Resultado`}:{' '}
                          {result ? 'acertou' : 'errou'}.
                        </li>
                      )
                    })}
                    <Button
                      type="button"
                      name="jogar-novamente"
                      onClick={reset}
                    >
                      Jogar novamente
                    </Button>
                  </ul>
                </LoadingScreen>
              </>
            )}
            <Footer />
          </QuizContainer>
          <GitHubCorner projectUrl="https://github.com/TaffarelXavier/aluraquiz-base" />
        </BackgroundImage>
      </ThemeProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  if (query.id && query.githubUser) {

    const projectName: string = query.id.toString()
    const githubUser: string = query.githubUser.toString()

    try {
      const dbExterno = await fetch(
        `https://${projectName}.${githubUser}.vercel.app/api/db`
      )
        .then(respostaDoServer => {
          if (respostaDoServer.ok) {
            return respostaDoServer.json()
          }
          throw new Error('Falha ao pegar os dados')
        })
        .then(respostaConvertidaEmObjeto => respostaConvertidaEmObjeto)

      return {
        props: {
          dbExterno
        }
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  return {
    props: {}
  }
}

export default QuizDaGaleraPage