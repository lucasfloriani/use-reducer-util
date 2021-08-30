interface ActionsFormat<T> {
  type: T
}

type ActionExtraction<Payload, Type> = Extract<Payload, { type: Type }>

type ActionsMapper<State, ActionsPayload extends ActionsFormat<string>> = {
  [key in ActionsPayload['type']]: (
    state: State,
    action: ActionExtraction<ActionsPayload, key>
  ) => void
}

const createReducer = <State, ActionsPayload extends ActionsFormat<string>>(
  actionMapper: ActionsMapper<State, ActionsPayload>
) => (state: State, action: ActionsPayload) => {
  const actionFunc = actionMapper?.[action.type as ActionsPayload['type']]
  actionFunc?.(state, action as ActionExtraction<ActionsPayload, typeof action.type>)
}

export default createReducer
