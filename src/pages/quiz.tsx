import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { QuizState, ResultType } from '../../declarations'
import Button from '../components/Button'
import Footer from '../components/Footer'
import GitHubCorner from '../components/GitHubCorner'
import LoadingScreen from '../components/LoadingScreen'
import QuestionWidget from '../components/QuestionWidget'
import BackgroundImage from '../components/QuizBackground'
import QuizContainer from '../components/QuizContainer'
import db from '../db.json'
import { NextPage } from 'next'
import Divider from '../components/Divider'
import QuizLogo from '../components/QuizLogo'
import WrittenNumber from '../../utils/written-number'

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

  const reset = () => {
    setScreenState('LOADING')
    setResults([])
    setCurrentQuestion(0)
    setTimeout(() => {
      setScreenState('LOADED')
    }, 500)
  }

  const questionsCorrects: number = results.reduce(
    (sumActual, resultActual) => {
      const isAcertou = resultActual.result == true
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
            <LoadingScreen title={'Typescript Quiz'}>
              Carregando...
            </LoadingScreen>
          )}

          {screenState == 'RESULT' && (
            <>
              <LoadingScreen title="Desafio Concluído - Resultado">
                <p style={{ fontSize: '1.2rem' }}>
                  Você acertou &nbsp;
                  {WrittenNumber(questionsCorrects, { lang: 'pt' })}
                  {questionsCorrects <= 1 && ' questão.'}
                  {questionsCorrects > 1 && ' questões.'}
                </p>
                {(questions || []).map((question, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        border: '1px solid #ccc',
                        borderRadius: db.theme.borderRadius,
                        marginBottom: 5,
                        padding: 10
                      }}
                    >
                      Questão #{index + 1} <br />
                      <br />
                      <strong>Sua Resposta:</strong>{' '}
                      {results[index] && (
                        <span style={{ color: db.theme.colors.secondary }}>
                          {
                            question.alternatives[
                              results[index].indexAnswerUser
                            ]
                          }
                        </span>
                      )}
                      <br />
                      <br />
                      <strong>Resposta correta:</strong>{' '}
                      <span style={{ color: db.theme.colors.secondary}}>
                        {question.alternatives[question.answer]}
                      </span>{' '}
                      <br />
                      <br />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Resultado{' '}
                        {results[index].result ? (
                          <img src="/img/right.png" alt="" />
                        ) : (
                          <img src="/img/wrong.png" alt="" />
                        )}
                      </div>
                    </div>
                  )
                })}
                <Divider />
                <Button type="button" name="jogar-novamente" onClick={reset}>
                  Jogar novamente
                </Button>
              </LoadingScreen>
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
