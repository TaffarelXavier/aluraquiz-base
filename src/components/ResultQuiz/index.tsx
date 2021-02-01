import { NextPage } from 'next'
import React from 'react'
import { IQuestionKeys, ResultType } from '../../../declarations'
import WrittenNumber from '../../../utils/written-number'
import db from '../../db.json'
import Button from '../Button'
import Divider from '../Divider'
import LoadingScreen from '../LoadingScreen'

interface Props {
  questionsCorrects: number
  questions: IQuestionKeys[]
  results: ResultType[]
  reset: () => void
}

const ResultPage: NextPage<Props> = ({
  questionsCorrects,
  questions,
  results,
  reset
}) => {
  return (
    <>
      <LoadingScreen title="Desafio Concluído - Resultado">
        <p style={{ fontSize: '1.2rem' }}>
          Você acertou &nbsp;
          {WrittenNumber(questionsCorrects, { lang: 'pt' })}
          {questionsCorrects <= 1 && ' questão.'}
          {questionsCorrects > 1 && ' questões.'}
        </p>
        {(questions || []).map((question: IQuestionKeys, index) => {
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
                  {question.alternatives[results[index].indexAnswerUser]}
                </span>
              )}
              <br />
              <br />
              <strong>Resposta correta:</strong>{' '}
              <span style={{ color: db.theme.colors.secondary }}>
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
  )
}
export default ResultPage
