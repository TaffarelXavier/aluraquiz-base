import { NextPage } from 'next'
import React, { FormEvent } from 'react'
import styled from 'styled-components'
import { IQuestionInput } from '../../../declarations'
import Button from '../Button'
import {
  QuizWidgetContent,
  QuizWidgetHeader,
  QuizWidgetTopic,
  Widget
} from '../Widget'
import Link from 'next/link'
import Divider from '../Divider'
import Router from 'next/router'
const SVG = styled.svg`
  /* vertical-align: middle; */
`

const QuestionWidget: NextPage<IQuestionInput> = ({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult
}) => {
  const [selectedAlternative, setSelectedAlternative] = React.useState<number>(
    -1
  )

  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false)
  const questionId = `question__${questionIndex}`
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined

  const nextQuestion = (ev: FormEvent) => {
    setIsQuestionSubmited(true)
    addResult({ questionIndex, result: false, indexAnswerUser: -1 })
    onSubmit(ev)
    setIsQuestionSubmited(false)
    setSelectedAlternative(-1)
  }

  const reset = () => {
    Router.reload()
  }

  return (
    <>
      <Widget>
        <QuizWidgetHeader>
          <Link href="/">
            <SVG
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
                fill="white"
                fillOpacity="0.87"
              />
            </SVG>
          </Link>

          <h3 style={{ fontSize: '1.3rem', lineHeight: '130%' }}>{`Pergunta ${
            questionIndex + 1
          } de ${totalQuestions}`}</h3>
        </QuizWidgetHeader>
        <img
          src={question.image}
          alt="imagem"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover'
          }}
        />
        <QuizWidgetContent>
          <form
            onSubmit={ev => {
              ev.preventDefault()
              setIsQuestionSubmited(true)
              setTimeout(() => {
                addResult({
                  questionIndex,
                  result: isCorrect,
                  indexAnswerUser: selectedAlternative
                })
                onSubmit(ev)
                setIsQuestionSubmited(false)
                setSelectedAlternative(-1)
              }, 1 * 3000)
            }}
          >
            <p style={{ fontSize: '1.3rem', lineHeight: '130%' }}>
              {question.title}
            </p>
            {(question.alternatives || []).map(
              (alternative, alternativeIndex) => {
                const alternativeId = `alternative__${alternativeIndex}`
                const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
                const isSelected = selectedAlternative === alternativeIndex

                return (
                  <QuizWidgetTopic
                    as="label"
                    key={alternativeId}
                    htmlFor={alternativeId}
                    data-selected={isSelected}
                    data-status={isQuestionSubmited && alternativeStatus}
                  >
                    <input
                      style={{ display: 'none' }}
                      id={alternativeId}
                      name={questionId}
                      onChange={() => setSelectedAlternative(alternativeIndex)}
                      type="radio"
                    />
                    {alternative}
                  </QuizWidgetTopic>
                )
              }
            )}
            <Divider />
            <Button
              type="submit"
              name="teste"
              disabled={!hasAlternativeSelected}
            >
              CONFIRMAR
            </Button>
            <Divider />
            <Button
              type="button"
              name="passar"
              style={{ background: '#ffc107' }}
              onClick={nextQuestion}
            >
              PRÓXIMA QUESTÃO
            </Button>
            <Divider />
            {/* <Link href="/"> */}
            <Button type="button" onClick={reset} name="iniciar-novamente">
              INICIAR NOVAMENTE
            </Button>
            {/* </Link> */}
            {isQuestionSubmited && (
              <>
                <Divider />
                <QuizWidgetTopic
                  as="div"
                  data-selected={true}
                  data-status={isCorrect ? 'SUCCESS' : 'ERROR'}
                >
                  {!isCorrect ? 'Você errou' : 'Você acertou'}
                </QuizWidgetTopic>
              </>
            )}
          </form>
        </QuizWidgetContent>
      </Widget>
    </>
  )
}

export default QuestionWidget
