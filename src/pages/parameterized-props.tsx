/* eslint-disable comma-spacing */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'

interface Props<T> {
  items: T[]
  children: (item: T) => React.ReactNode
}

const List = <T,>({ items, children }: Props<T>) => {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i} className="item">
          {children(item)}
        </li>
      ))}
    </ul>
  )
}

const App = () => {
  return (
    <div>
      <List items={['1', '2', '5', '6']}>
        {item => {
          return (
            <div>
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </div>
          )
        }}
      </List>
    </div>
  )
}

export default App
