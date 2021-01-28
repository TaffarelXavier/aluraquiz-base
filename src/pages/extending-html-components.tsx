import { NextPage } from 'next'
import React from 'react'

interface NewProps {
  variante?: 'primary' | 'secondary'
  size?: 'default' | 'small' | 'large'
}

type Props = NewProps & Omit<React.ComponentProps<'button'>, keyof NewProps>

const Button: NextPage<Props> = ({ size = 'default', ...buttonProps }) => {
  let padding = 0
  if (size === 'default') {
    padding = 10
  }
  if (size === 'small') {
    padding = 20
  }
  if (size === 'large') {
    padding = 30
  }
  return (
    <button {...buttonProps} style={{ padding: padding }}>
      <pre>{JSON.stringify(K1, null, 2)}</pre>
    </button>
  )
}

const App: NextPage = () => {
  return (
    <div>
      <Button />
    </div>
  )
}
export default App
