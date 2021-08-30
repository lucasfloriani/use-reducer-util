# use-reducer-util

It's a util that removes the boilerplate needed to create the reducer function of the hook useReducer

## How to install

```txt
yarn add use-reducer-util
npm install use-reducer-util
```

## How to use

```ts
import { useReducer } from 'react'
import createReducer from 'use-reducer-util'

type InitialStateProps = {
  total: number
}

type ReducerActionProps =
  | { type: 'INCREASE' }
  | { type: 'DECREASE' }

// Our library to create the reducer function without the need of the switch case boilerplate
const reducer = createReducer<InitialStateProps, ReducerActionProps>({
  INCREASE: (state) => ({ ...state, total: state.total + 1 }),
  DECREASE: (state) => ({ ...state, total: state.total - 1 }),
})

const initialState: InitialStateProps = { total: 0 }

const useCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const increase = useCallback(() => dispatch({ type: 'INCREASE' }), [dispatch])
  const decrease = useCallback(() => dispatch({ type: 'DECREASE' }), [dispatch])

  return {
    state,
    actions: { increase, decrease }
  }
}
```
