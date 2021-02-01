import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
// import { Widget } from '../../components/Widget'
import { ThemeProvider } from 'styled-components'
import {
  IQuestion,
  IThemeColors,
  QuizState,
  ResultType,
  IQuestionKeys
} from '../../../declarations'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import GitHubCorner from '../../components/GitHubCorner'
import LoadingScreen from '../../components/LoadingScreen'
import QuestionWidget from '../../components/QuestionWidget'
import BackgroundImage from '../../components/QuizBackground'
import QuizContainer from '../../components/QuizContainer'
import ResultQuiz from '../../components/ResultQuiz'

interface Props {
  dbExterno: {
    bg: string
    title: string
    description: string
    questions: IQuestionKeys[]
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
  const [results, setResults] = useState<ResultType[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question = dbExterno.questions[questionIndex]
  const questions = dbExterno.questions

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

  const addResult = (result: ResultType) => {
    setResults([...results, result])
  }

  const questionsCorrects: number = results.reduce(
    (sumActual, resultActual) => {
      const isAcertou = resultActual.result === true
      return isAcertou ? +sumActual + 1 : sumActual
    },
    0
  )

  return (
    <>
      <Head>
        <title>Aluraquizzes - Seu quiz favorito</title>
      </Head>
      <ThemeProvider theme={dbExterno.theme}>
        <BackgroundImage backgroundImage={dbExterno.bg}>
          <QuizContainer>
            {screenState === 'LOADED' && (
              <QuestionWidget
                question={question}
                questionIndex={questionIndex}
                totalQuestions={totalQuestions}
                onSubmit={handleSubmitQuiz}
                addResult={addResult}
              />
            )}

            {screenState === 'LOADING' && (
              <LoadingScreen title="Título">Carregando...</LoadingScreen>
            )}

            {screenState === 'RESULT' && (
              <>
                <ResultQuiz
                  questions={questions}
                  questionsCorrects={questionsCorrects}
                  reset={reset}
                  results={results}
                />
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
