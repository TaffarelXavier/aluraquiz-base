import { NextPage } from 'next'
import React from 'react'

interface CommonProps {
  children?: React.ReactNode
}

type TruncateProps =
  | { truncate?: false; showExpanded: undefined }
  | { truncate: true; showExpanded?: boolean }

type Props = CommonProps & TruncateProps

const Text: NextPage<Props> = ({ truncate, showExpanded }) => {
  return (
    <>
      <pre>{JSON.stringify(truncate, null, 2)}</pre>
      <pre>{JSON.stringify(showExpanded, null, 2)}</pre>
    </>
  )
}

const App: NextPage = () => {
  return (
    <div>
      <Text truncate={true} showExpanded={true} />
    </div>
  )
}
export default App
