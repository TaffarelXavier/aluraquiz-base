/**
 *
 */
export interface IFormState {
  name: { value: string }
}

/**
 * Type to quiz page
 */
export type QuizState = 'LOADING' | 'LOADED' | 'FAIL' | 'RESULT' | undefined

/**
 * Interface to quiz page question
 */
export interface IQuestion {
  question: {
    image: string
    title: string
    description: string
    answer: number
    alternatives: string[]
  }
}

export type ResultType = {
  questionIndex: number
  result: boolean
  indexAnswerUser: number
}

export interface IQuestionInput extends IQuestion {
  totalQuestions: number
  questionIndex: number
  onSubmit(e: React.SyntheticEvent): void
  /**
   * Add result to questions array
   * @param value boolean
   */
  addResult(value: ResultType): void
}

/**
 *
 */
export interface IThemeColors {
  primary: string
  secondary: string
  mainBg: string
  contrastText: string
  wrong: string
  success: string
}
