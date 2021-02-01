import { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { QuizState, ResultType } from '../../declarations'
import Footer from '../components/Footer'
import GitHubCorner from '../components/GitHubCorner'
import LoadingScreen from '../components/LoadingScreen'
import QuestionWidget from '../components/QuestionWidget'
import BackgroundImage from '../components/QuizBackground'
import QuizContainer from '../components/QuizContainer'
import QuizLogo from '../components/QuizLogo'
import ResultQuiz from '../components/ResultQuiz'
import db from '../db.json'

const QuizPage: NextPage = () => {
  const totalQuestions = db.questions.length
  const [screenState, setScreenState] = useState<QuizState>('LOADING')
  const [results, setResults] = useState<ResultType[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex]
  const questions = db.questions

  const addResult = (result: ResultType) => {
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

  const reset = (): void => {
    setScreenState('LOADING')
    setResults([])
    setCurrentQuestion(0)
    setTimeout(() => {
      setScreenState('LOADED')
    }, 500)
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
      <BackgroundImage backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo className="" />
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
            <LoadingScreen title={'Typescript Quiz'}>
              Carregando...
            </LoadingScreen>
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
    </>
  )
}

export default QuizPage
